import React, { memo, useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Color, FontWeight, TextSize } from "../constants/styles";
import { useSelectedSeat } from "../utils/hooks/useSelectedSeat";
import { useMySeat } from "../utils/hooks/useMySeat";
import { IFixedButton } from "./types/FixedButton";
import { isIphoneX } from "../utils/Helpers";
import { useDispatch } from "react-redux";
import { hideAlert, showAlert } from "../store/actions/ui/action";

export const FixedButton = memo<IFixedButton>(({ setBottomButtonHeight }) => {

	const { selectedSeat } = useSelectedSeat();
	const { mySeat } = useMySeat();
	const dispatch = useDispatch();
	const [ isMyReservation, setIsMyReservation ] = useState(false);

	useEffect(() => {

		if (!selectedSeat || !mySeat) {return;}
		const available = selectedSeat.id === mySeat.id;

		setIsMyReservation(available);

	}, [ mySeat, selectedSeat ]);

	const buttonColor = !isMyReservation ? Color.purplishBlue : Color.darkTwo;
	const label = isMyReservation ? "예약 취소하기" : "자리 예약하기";

	const hideAlertMessage = useCallback(() => {
		dispatch(hideAlert());
	}, [ dispatch ]);

	const onPressButton = useCallback(() => {
		dispatch(showAlert({
			title: "권한설정 필요",
			content: "환경설정에서 Relait의 위치정보 접근을 허용해주세요.",
			buttons: [
				{
					text: "취소",
					style: "default",
					onPress: hideAlertMessage,
				},
				{
					text: "확인",
					style: "default",
					onPress: hideAlertMessage,
				}
			],
			cancelable: false,
		}));
	}, [ dispatch, hideAlertMessage ]);

	return (
		<TouchableOpacity
			onLayout={ ({ nativeEvent }) => {
				if (!nativeEvent || !setBottomButtonHeight) {return;}
				const { layout: { height } } = nativeEvent;
				setBottomButtonHeight(height);

			} }
			style={ {
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: buttonColor,
				paddingTop: 16,
				paddingBottom: isIphoneX ? 16 + 34 : 16,
			} }
			onPress={ onPressButton }>
			<Text
				style={ {
					color: Color.white,
					fontSize: TextSize.h4,
					fontWeight: FontWeight.medium,
				} }>{ label }</Text>
		</TouchableOpacity>
	);
});
