import React, { useState, useEffect } from "react";
import { requestNotifications, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Modal, View, Text, SafeAreaView, Image } from "react-native";
import { IRequestPermissionModal } from "./types/RequestPermissionModal";
import CommonButton from "../components/CommonButton";
import { Color, TextSize, FontWeight } from "../constants/styles";
import { useDispatch } from "react-redux";
import { showAlert } from "../store/actions/ui/action";

const permissionItems = [
	{
		title: "알림",
		icon: require("../resources/icons/Noti.png"),
		purpose: "자리 예약 확인, 취소 알림 등",
	},
	{
		title: "위치",
		icon: require("../resources/icons/MarkerBlack.png"),
		purpose: "내 주변 이용 가능한 카페 정보 표시",
	}
];

const RequestPermissionModal: React.FC<IRequestPermissionModal> = ({ visible, onRequestClose }) => {

	const [ permissions, setPermissions ] = useState({
		notification: false,
		location: false,
	});
	const dispatch = useDispatch();

	useEffect(() => {
		if (permissions.notification && permissions.location) {
			onRequestClose();
		}
	}, [ permissions.notification, permissions.location, onRequestClose ]);

	const requestLocation = () => {
		request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
			if (result === RESULTS.GRANTED) {
				setPermissions(prevPermissions => ({
					...prevPermissions,
					location: true,
				}));
				onRequestClose();
			}
			else {
				dispatch(showAlert({
					title: "권한설정 필요",
					content: "환경설정에서 Relait의 위치정보 접근을 허용해주세요.",
					buttons: [
						{
							text: "확인",
							style: "default",
						}
					],
					cancelable: false,
				}));
			}
		}).catch(e => {
			throw new Error(e);
		});
	};

	const requestNotificationPermission = () => {
		requestNotifications([ "alert", "sound" ]).then(({ status }) => {
			if (status === RESULTS.GRANTED) {
				setPermissions(prevPermissions => ({
					...prevPermissions,
					notification: true,
				}));
				requestLocation();
			}
			else {
				dispatch(showAlert({
					title: "권한설정 필요",
					content: "환경설정에서 Relait의 알림을 허용해주세요.",
					buttons: [
						{
							text: "확인",
							style: "default",
						}
					],
					cancelable: false,
				}));
			}
		}).catch(e => {
			throw new Error(e);
		});
	};

	return (
		<Modal
			visible={ visible }
			animationType={ "fade" }>
			<SafeAreaView
				style={ {
					flex: 1,
				} }>
				<View
					style={ { paddingHorizontal: 26, flex: 1, justifyContent: "flex-start" } }>
					<View
						style={ {
							marginTop: 76,
						} }>
						<Text
							style={ {
								fontSize: TextSize.h1,
							} }>우리 이젠,</Text>
						<Text
							style={ {
								fontSize: TextSize.h1,
								fontWeight: FontWeight.bold,
							} }>더이상 자리찾아{ "\n" }헤매지 말자.</Text>
					</View>
					<View
						style={ {
							borderWidth: 0.5,
							marginVertical: 40,
							borderColor: Color.gray,
						} } />
					{ permissionItems.map((item, index) => {
						const isLast = index === permissionItems.length - 1;
						return (
							<View
								key={ item.title }
								style={ {
									flexDirection: "row",
									marginBottom: isLast ? 0 : 16,
								} }>
								<Image
									source={ item.icon } />
								<View
									style={ {
										marginLeft: 12,
									} }>
									<Text
										style={ {
											marginBottom: 4,
										} }>{ item.title }</Text>
									<Text>{ item.purpose }</Text>
								</View>
							</View>
						);
					}) }
					<Text
						style={ {
							marginTop: 40,
							fontSize: TextSize.h5,
							color: Color.darkGray,
						} }>릴레잇 서비스를 잘 이용하기 위해{ "\n" }필요한 접근 권한을 꼭 확인해줘.</Text>
				</View>
			</SafeAreaView>
			<CommonButton
				hasShadow={ true }
				buttonTitle={ "확인" }
				onPressCallback={ () => {
					requestNotificationPermission();
				} }
				textColor={ Color.white }
				fontWeight={ FontWeight.bold }
				buttonColor={ Color.purplishBlue } />
		</Modal>
	);
};

export default RequestPermissionModal;
