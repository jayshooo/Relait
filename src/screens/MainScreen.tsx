import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { checkNotifications, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";

import RequestPermissionModal from "../modals/RequestPermissionModal";
import { TextSize, Color, FontWeight } from "../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomSlideBar, FixedBottomBar } from "../components/BottomSlideBar";
import { WriteButton } from "../components/WriteButton";
import { Button } from "../components/forms/Button";
import { StatusBarHeight, moveCamera, TabBarHeight } from "../utils/Helpers";
import { MapContainer } from "../components/Maps";
import { IHeaderView } from "./types/MainScreen";
import { getReverseGeocoding } from "../helpers/Geocoding";
import { ILocation } from "../helpers/types";
import { useDispatch, useSelector } from "react-redux";
import { getMySeat, getSeats, setSelectedSeat } from "../store/actions/seats/action";
import { RootState } from "../store/reducers";
import { setAuthorizationHeader } from "../constants/api";
import { ISeat } from "../store/reducers/seats/types";
import { useNavigation } from "@react-navigation/native";
import { useSelectedSeat } from "../utils/hooks/useSelectedSeat";
import { useSeats } from "../utils/hooks/useSeats";
import useAsyncEffect from "use-async-effect";
import { useRole } from "../utils/hooks/useRole";
import { useMap } from "../utils/hooks/useMap";

const bottomHeight = 53;
const { height, width } = Dimensions.get("window");

const MakeSpotPanel = ({ seat, onPress }: { seat: null | ISeat; onPress: () => void; }) => {

	const hasSeat = !!seat;
	const spotName = hasSeat ? seat!.cafeName : "어디서 작업 중이야?";
	const backgroundColor = hasSeat ? Color.purplishBlue : Color.gray;
	const color = hasSeat ? Color.white : Color.grayTwo;
	const label = "장소 선택하기";

	return (
		<View
			style={ {
				position: "absolute",
				bottom: 0,
				left: 0,
				width,
				padding: 24,
				borderTopLeftRadius: 16,
				borderTopRightRadius: 8,
				backgroundColor: Color.white,
			} }>
			<View
				style={ {
					flex: 1,
					borderWidth: 1,
					borderRadius: 16,
					borderColor: Color.gray,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingVertical: 12,
					paddingHorizontal: 16,
				} }>
				<Text
					style={ {
						marginTop: 2,
						fontSize: TextSize.h4,
						fontWeight: FontWeight.bold,
						color: hasSeat ? Color.darkTwo : Color.gray,
					} }>{ spotName }</Text>
				<Image
					style={ {
						width: 32,
						height: 32,
					} }
					source={ require("../resources/icons/SearchIcon.png") } />
			</View>
			<Button
				onPress={ onPress }
				label={ label }
				backgroundColor={ backgroundColor }
				color={ color } />
		</View>
	);
};

const HeaderView = ({ goBack, makeSpot, currentAddress, goToReservationScreen, findMyLocation }: IHeaderView) => {

	if (makeSpot) {
		return (
			<View
				onStartShouldSetResponder={ () => {
					return true;
				} }
				style={ {
					position: "absolute",
					left: 24,
					top: 44 + StatusBarHeight,
					zIndex: 1,
				} }>
				<TouchableOpacity
					activeOpacity={ 0.7 }
					onPress={ goBack }>
					<Image
						source={ require("../resources/icons/BackBtn.png") } />
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View
			style={ {
				paddingTop: 38 + StatusBarHeight,
				paddingBottom: 24,
				paddingHorizontal: 24,
			} }>
			<View
				style={ {
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "flex-end",
				} }>
				<Text
					style={ {
						fontSize: TextSize.h5,
						color: Color.grayTwo,
					} }>현재 위치</Text>
				<TouchableOpacity
					onPress={ goToReservationScreen }>
					<Image
						source={ require("../resources/icons/BookingIcon.png") } />
				</TouchableOpacity>
			</View>
			<View
				style={ {
					marginTop: 4,
					flexDirection: "row",
					alignItems: "center",
				} }>
				<Text
					style={ {
						fontSize: TextSize.h2,
						fontWeight: FontWeight.bold,
						flexShrink: 1,
					} }>{ currentAddress }</Text>
				<TouchableOpacity
					style={ {
						marginLeft: 8,
						borderWidth: 1,
						borderRadius: 50,
						borderColor: Color.grayTwo,
						padding: 4,
					} }
					onPress={ findMyLocation }>
					<Image
						source={ require("../resources/icons/Location.png") } />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const MainScreen = () => {

	const [ hasPermission, setHasPermission ] = useState(true);
	const [ showRequestPermissionModal, setShowRequestPermissionModal ] = useState(false);
	const [ showHeader, setShowHeader ] = useState(true);
	const [ fixedBottomBarHeight, setFixedBottomBarHeight ] = useState(0);
	const [ filteredSeats, setFilteredSeats ] = useState<ISeat[] | null>(null);
	const [ myCoordination, setMyCoordination ] = useState<any>(null);
	const [ makeSpot, setMakeSpot ] = useState(false);
	const [ currentAddress, setCurrentAddress ] = useState("");
	const { selectedSeat } = useSelectedSeat();
	const { map } = useMap();
	const { seats } = useSeats();
	const { token } = useSelector((state: RootState) => state.myInfo);
	const { isTaker, isGiver } = useRole();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {

		setShowRequestPermissionModal(!hasPermission);

	}, [ hasPermission ]);

	const hasLocationPermission = async () => {

		try {
			const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

			if (result !== RESULTS.GRANTED) {
				return false;
			}

			return true;
		}
		catch (e) {
			throw new Error(e);
		}

	};

	const hasNotificationPermission = async () => {

		try {
			const result = await checkNotifications();
			const { status } = result;

			if (status !== RESULTS.GRANTED) {
				return false;
			}
			return true;
		}
		catch (e) {
			throw new Error(e);
		}

	};

	const checkPermissions = useCallback(async () => {
		if (!await hasLocationPermission() || !await hasNotificationPermission()) {
			setHasPermission(false);
		}
	}, []);

	const _getReverseGeocoding = async (coords: ILocation) => {
		const address = await getReverseGeocoding(coords);
		setCurrentAddress(address);
	};


	useEffect(() => {

		if (!myCoordination) {return;}

		const { latitude, longitude } = myCoordination;

		_getReverseGeocoding({
			lat: latitude,
			lng: longitude,
		});

	}, [ myCoordination ]);

	useAsyncEffect(async () => {
		if (!token) {return;}
		try {
			setAuthorizationHeader(token!);
			await dispatch(getSeats());
			await dispatch(getMySeat());
		}
		catch (e) {
			throw new Error(e);
		}
	}, [ token, dispatch ]);

	useEffect(() => {
		if (!selectedSeat || !map) {return;}

		const { lat, lng } = selectedSeat;

		moveCamera({
			mapRef: map,
			lat,
			lng,
		});

	}, [ map, selectedSeat ]);

	const findMyLocation = useCallback(() => {
		Geolocation.getCurrentPosition(info => {
			const { coords } = info;
			setMyCoordination(coords);
			dispatch(setSelectedSeat(null));
			setFilteredSeats(null);
		}, error => {
			if (!error || Object.keys(error).length === 0) {return;}
			// TODO. 에러핸들링코드 추가
		}, {
			enableHighAccuracy: false,
			timeout: 5000,
			maximumAge: 1000,
		});
	}, [ dispatch ]);


	useEffect(() => {

		checkPermissions();
		findMyLocation();

	}, [ checkPermissions, findMyLocation ]);

	const onPressWriteButton = () => {
		setMakeSpot(true);
		setShowHeader(true);
	};

	const onPressPlace = useCallback((seat: ISeat) => {
		if (!seats) {return;}
		dispatch(setSelectedSeat(seat));
		const filtered = seats.filter(s => s.id === seat.id);
		setFilteredSeats(filtered);
		setShowHeader(true);
	}, [ seats, dispatch ]);

	const navigateToMakeSpotScreen = useCallback(() => {
		if (!selectedSeat) {return;}
		navigation.navigate("PlaceRegistScreen", {
			selectedSeat,
		});
	}, [ navigation, selectedSeat ]);

	const goBack = useCallback(() => {
		dispatch(setSelectedSeat(null));
		setFilteredSeats(null);
		setMakeSpot(false);
	}, [ dispatch ]);

	const goToReservationScreen = () => {
		navigation.navigate("PlaceStatusScreen");
	};

	const isFiltered = !!filteredSeats;

	const bottomView = () => {

		if (isFiltered) {
			return (
				<FixedBottomBar
					setHeight={ (height) => {
						setFixedBottomBarHeight(height);
					} }
					onPressPlace={ (seat: ISeat) => {
						onPressPlace(seat);
					} }
					seats={ filteredSeats }/>
			);
		}

		return (
			<BottomSlideBar
				onPressPlace={ (seat: ISeat) => {
					onPressPlace(seat);
				} }
				seats={ seats }
				isFiltered={ isFiltered }
				bottomHeight={ bottomHeight }
				setShowHeader={ setShowHeader } />
		);

	};

	const makeSpotBottomView = () => {

		return (
			<MakeSpotPanel
				seat={ selectedSeat }
				onPress={ navigateToMakeSpotScreen }/>
		);

	};

	const showWriteButton = !makeSpot && !isTaker && !isGiver;

	const baseBottomPosition = 24;
	const writeButtonBottomPosition = isFiltered ? fixedBottomBarHeight + baseBottomPosition : bottomHeight + TabBarHeight + baseBottomPosition;
	const mapStyle = isFiltered && !makeSpot ? {
		height: height - writeButtonBottomPosition,
	} : {
		flex: 1,
	};

	return (
		<View
			style={ {
				flex: 1,
				backgroundColor: Color.white,
			} }>
			<View
				style={ {
					flex: 1,
				} }>
				{ showHeader && (
					<HeaderView
						goBack={ goBack }
						makeSpot={ makeSpot }
						currentAddress={ currentAddress }
						goToReservationScreen={ goToReservationScreen }
						findMyLocation={ findMyLocation } />
				) }
				{ myCoordination && (
					<MapContainer
						onPressPlace={ (seat: ISeat) => {
							onPressPlace(seat);
						} }
						myCoordination={ myCoordination }
						mapStyle={ mapStyle } />
				) }
				{ showWriteButton && (
					<WriteButton
						bottomHeight={ writeButtonBottomPosition }
						onPressWriteButton={ onPressWriteButton } />
				) }
				<RequestPermissionModal
					visible={ showRequestPermissionModal }
					onRequestClose={ () => {
						setHasPermission(true);
					} } />
			</View>
			{ makeSpot ? makeSpotBottomView() : bottomView() }
		</View>
	);
};

export default MainScreen;
