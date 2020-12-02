import React, { useRef, useEffect } from "react";
import { IMapMarker, IMapContainer } from "./types/Maps";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useSeats } from "../utils/hooks/useSeats";
import { moveCamera } from "../utils/Helpers";
import { useSelectedSeat } from "../utils/hooks/useSelectedSeat";
import { Image } from "react-native";
import { useDispatch } from "react-redux";
import { setMapRef } from "../store/actions/ui/action";


export const MapMarker = ({ id, lat, lng, onPressMarker, isMyLocation = false }: IMapMarker) => {

	const { selectedSeat } = useSelectedSeat();
	const hasSelectedSeat = !!selectedSeat;

	let source = require("../resources/icons/Marker.png");

	if (isMyLocation) {
		source = require("../resources/icons/MyLocationMarker.png");
	}

	const isSelected = hasSelectedSeat && selectedSeat!.id === id;

	if (hasSelectedSeat) {
		source = isSelected ? require("../resources/icons/Marker.png") : require("../resources/icons/FilledMarker.png");
	}

	return (
		<Marker
			zIndex={ isSelected ? 10 : 1 }
			coordinate={ {
				latitude: lat,
				longitude: lng,
			} }
			onStartShouldSetResponderCapture={ () => true }
			onPress={ () => {
				if (!onPressMarker) {return;}
				onPressMarker();
			} }
			tracksViewChanges={ true }>
			<Image
				source={ source } />
		</Marker>
	);
};

export const MapContainer: React.FC<IMapContainer> = ({ myCoordination, onPressPlace, mapStyle, onPressMap }) => {

	const { latitude, longitude } = myCoordination;
	const { seats } = useSeats();
	const dispatch = useDispatch();
	const mapRef = useRef<MapView | null>(null);

	useEffect(() => {
	    if (!mapRef) {return;}
		dispatch(setMapRef(mapRef));
	}, [ mapRef, dispatch ]);

	useEffect(() => {

		if (!mapRef || !myCoordination) {return;}

		moveCamera({
			mapRef,
			lat: latitude,
			lng: longitude,
		});

	}, [ myCoordination, latitude, longitude ]);

	return (
		<MapView
			ref={ mapRef }
			provider={ PROVIDER_GOOGLE }
			style={ mapStyle }
			onPress={ (e) => {
				const target = e.target as any;
				const isMap = target.viewConfig.uiViewClassName === "AIRGoogleMap";
				if (!onPressMap || !isMap) {return;}
				onPressMap();
			} }>
			<MapMarker
				lat={ latitude }
				lng={ longitude }
				isMyLocation={ true } />
			{ seats && seats.map(seat => {
				return (
					<MapMarker
						key={ seat.id }
						id={ seat.id }
						lat={ seat.lat }
						lng={ seat.lng }
						onPressMarker={ () => {
							onPressPlace(seat);
						} }
					/>
				);
			}) }
		</MapView>
	);
};
