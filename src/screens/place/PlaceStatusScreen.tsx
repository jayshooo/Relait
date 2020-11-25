import React, { memo, useCallback } from "react";
import moment from "moment";
import { SafeAreaView, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { Color, FontWeight, TextSize } from "../../constants/styles";
import { useMySeat } from "../../utils/hooks/useMySeat";
import CommonButton from "../../components/CommonButton";
import { useNavigation } from "@react-navigation/native";

export const PlaceStatusScreen = memo(() => {

	const { mySeat } = useMySeat();
	const navigation = useNavigation();

	const goToPlaceDetailScreen = useCallback(() => {
		navigation.navigate("PlaceDetailScreen", {
			seat: mySeat,
		});

	}, [ navigation, mySeat ]);

	if (!mySeat) {return null;}

	const { cafeName, leaveAt, address } = mySeat;
	const leave = moment.utc(leaveAt).format("HH:mm");

	return (
		<SafeAreaView
			style={ {
				flex: 1,
				backgroundColor: Color.white,
			} }>
			<Header
				title={ "예약현황" } />
			<View
				style={ {
					flex: 1,
					marginTop: 20,
					paddingHorizontal: 24,
				} }>
				<Text
					style={ {
						fontSize: TextSize.h1,
						color:Color.darkTwo,
						fontWeight: FontWeight.bold,
					} }>{ cafeName }</Text>
				<View
					style={ {
						marginTop: 24,
					} }>
					<Text
						style={ {
							fontWeight: FontWeight.bold,
							color: Color.deepOrange,
							fontSize: TextSize.h3,
						} }>{ leave }<Text
							style={ {
								fontWeight: FontWeight.normal,
								color: Color.darkTwo,
								fontSize: TextSize.h3,
							} }>까지 작업예정이지?{ "\n" }아직 그 자리를 예약한 테이커는 없어</Text></Text>
				</View>
				<View
					style={ {
						marginTop: 24,
					} }>
					<Text
						style={ {
							fontSize: TextSize.h4,
							color:Color.darkGray,
						} }>{ address }</Text>
				</View>
				<CommonButton
					isAbsolute={ false }
					buttonTitle={ "자세히 보기" }
					buttonColor={ Color.grayLighter }
					textColor={ Color.darkTwo }
					hasShadow={ false }
					onPressCallback={ goToPlaceDetailScreen }
					additioinalStyle={ {
						marginTop: 32,
					} } />
			</View>
		</SafeAreaView>
	);
});
