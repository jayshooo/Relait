import React, { useEffect } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Image
} from "react-native";
import SplashScreenHelper from "react-native-splash-screen";
import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from "react-native-restart";
import NetInfo from "@react-native-community/netinfo";

import { useDispatch } from "react-redux";
import { showAlert } from "../store/actions/ui/action";
import { Color } from "../constants/styles";
import { ASYNC_STORAGE_LOGIN_KEY } from "../constants/constants";
import { ISplashScreenProps } from "./types/SplashScreen";
import { setMyInfo, doLogin } from "../store/actions/myinfo/action";
import KakaoLogins from "@react-native-seoul/kakao-login";

const SplashScreen = ({ navigation }: ISplashScreenProps) => {

	const dispatch = useDispatch();

	useEffect(() => {

		setTimeout(() => {
			SplashScreenHelper.hide();
		}, 2000);

		const getHasLoginToken = async (): Promise<boolean> => {
			// for test
			// await AsyncStorage.removeItem(ASYNC_STORAGE_LOGIN_KEY);
			try {
				const result = await AsyncStorage.getItem(ASYNC_STORAGE_LOGIN_KEY);
				return !!result;
			}
			catch (e) {
				throw new Error(e);
			}
		};

		const checkNetInfo = async () => {

			try {
				const netInfoResult = await NetInfo.fetch();

				const { isConnected } = netInfoResult;

				if (isConnected) {
					const hasLoginToken = await getHasLoginToken();
					if (!hasLoginToken) {
						// 로그인 토큰이 없으면 로그인 화면으로 이동
						navigation.replace("LoginScreen");
					}
					else {
						// 로그인 토큰이 존재하면 프로필 정보 요청 후 로그인 요청
						const getProfileResult = await KakaoLogins.getProfile();
						dispatch(setMyInfo(getProfileResult));
						dispatch(doLogin(getProfileResult.id));
						navigation.replace("MainScreen");
					}
				}
				else {
					dispatch(showAlert({
						title: "네트워크 오류",
						content: "네트워크 연결상태 확인좀;;",
						buttons: [
							{
								text: "닫기",
								style: "default",
							},
							{
								text: "다시시도",
								onPress: () => {
									RNRestart.Restart();
								},
							}
						],
						cancelable: false,
					}));
				}
			}
			catch (e) {
				throw new Error(e);
			}
		};

		checkNetInfo();

	}, [ dispatch, navigation ]);

	return (
		<SafeAreaView
			style={ styles.view }>
			<Image
				source={ require("../resources/icons/Logo.png") }
				resizeMode={ "contain" } />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	view: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Color.purplishBlue,
	},
});


export default SplashScreen;
