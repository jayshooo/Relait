import React, { memo, useCallback } from "react";
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import { Header } from "../../components/Header";
import { Color } from "../../constants/styles";
import { useSelectedSeat } from "../../utils/hooks/useSelectedSeat";

const HeaderRight = memo(() => {
	const onPress = useCallback(() => {
		console.log("더보기!");
	}, []);

	return (
		<TouchableOpacity
			onPress={ onPress }>
			<Image
				source={ require("../../resources/icons/More.png") } />
		</TouchableOpacity>
	);
});

export const PlaceDetailScreen = memo(() => {

	const { selectedSeat } = useSelectedSeat();


	return (
		<SafeAreaView
			style={ {
				flex: 1,
				backgroundColor: Color.white,
			} }>
			<ScrollView
				style={ {
					flex: 1,
				} }>
				<Header
					title={ "자리 올리기" }
					renderRight={ <HeaderRight /> } />
			</ScrollView>
		</SafeAreaView>
	);
});
