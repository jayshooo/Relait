import React from "react";
import { View, Image, TouchableHighlight, Text, StyleProp, ViewStyle } from "react-native";
import { TextSize, FontWeight } from "../constants/styles";
import { ICommonButton } from "./types/CommonButton";

const CommonButton = ({ onLayout, icon, buttonTitle, onPressCallback, buttonColor, textColor, fontWeight = FontWeight.normal, hasShadow = true, additioinalStyle = null }: ICommonButton) => {

	const hasIcon = !!icon;
	const shadowStyle: StyleProp<ViewStyle> = {
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowOpacity: 1,
		elevation: 4,
		shadowRadius: 12,
		shadowOffset: { width: 1, height: 18 },
	};

	const defaultStyle: StyleProp<ViewStyle> = {
		position: "absolute",
		left: 24,
		right: 24,
		bottom: 40,
		backgroundColor: buttonColor,
		paddingVertical: 16,
		borderRadius: 8,
	};

	const buttonStyle: StyleProp<ViewStyle> = hasShadow ? {
		...defaultStyle,
		...shadowStyle,
	} : defaultStyle;

	return (
		<TouchableHighlight
			onLayout={ ({ nativeEvent }) => {
				if (!onLayout || !nativeEvent) {return;}
				const { layout } = nativeEvent;
				onLayout(layout);
			} }
			style={ [ buttonStyle, additioinalStyle ] }
			underlayColor={ buttonColor }
			activeOpacity={ 0.8 }
			onPress={ () => {
				if (!onPressCallback) {return;}
				onPressCallback();
			} }>
			<View
				style={ {
					flex: 1,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				} }>
				{ hasIcon && (
					<Image
						style={ {
							position: "absolute",
							left: 16,
						} }
						source={ icon! } />
				) }
				<Text
					style={ {
						alignSelf: "center",
						fontSize: TextSize.h4,
						fontWeight,
						color: textColor,
					} }>{ buttonTitle }</Text>
			</View>
		</TouchableHighlight>
	);
};

export default CommonButton;
