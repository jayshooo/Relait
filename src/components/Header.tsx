import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextSize, FontWeight } from "../constants/styles";
import { HeaderInterface } from "./types/Header";

export const Header: React.FC<HeaderInterface> = memo(({ onPress, title, renderRight }) => {

	const navigation = useNavigation();

	const onPressButton = () => {
		if (!onPress) {
			navigation.goBack();
			return;
		}
		onPress();
	};

	return (
		<View
			style={ {
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				paddingTop: 15,
				paddingBottom: 24,
			} }>
			<TouchableOpacity
				style={ {
					position: "absolute",
					top: 12,
					left: 24,
				} }
				activeOpacity={ 0.7 }
				onPress={ onPressButton }>
				<Image
					source={ require("../resources/icons/ArrowLeft.png") } />
			</TouchableOpacity>
			{ title && (
				<Text
					style={ {
						fontSize: TextSize.h3,
						fontWeight: FontWeight.normal,
					} }>{ title }</Text>
			) }
			{ renderRight && (
				<View
					style={ {
						position: "absolute",
						top: 12,
						right: 24,
					} }>
					{ renderRight }
				</View>
			) }

		</View>
	);
});
