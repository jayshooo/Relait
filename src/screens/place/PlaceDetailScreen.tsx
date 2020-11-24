import React, { memo, useCallback } from "react";
import moment from "moment";
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, Image, ActionSheetIOS } from "react-native";
import { Header } from "../../components/Header";
import { Color, FontWeight, TextSize } from "../../constants/styles";
import { useSelectedSeat } from "../../utils/hooks/useSelectedSeat";
import { PlugView } from "../../components/ListComponent";
import { ISection } from "../types/PlaceDetailScreen";

const HeaderRight = memo(() => {
	const onPress = useCallback(() => {
		ActionSheetIOS.showActionSheetWithOptions(
			{
				options: [ "취소", "수정하기", "게시글 삭제하기" ],
				destructiveButtonIndex: 2,
				cancelButtonIndex: 0,
			},
			buttonIndex => {
				if (buttonIndex === 0) {
					// cancel action
				} else if (buttonIndex === 1) {
					// TODO. 수정하기 로직 추가해야함
					console.log(buttonIndex, "수정하기");
				} else if (buttonIndex === 2) {
					// TODO. 삭제하기 로직 추가해야함
					console.log(buttonIndex, "삭제하기");
				}
			}
		);
	}, []);

	return (
		<TouchableOpacity
			onPress={ onPress }>
			<Image
				source={ require("../../resources/icons/More.png") } />
		</TouchableOpacity>
	);
});

const Section = memo<ISection>(({ title, description }) => {
	return (
		<View
			style={ {
				marginBottom: 24,
			} }>
			<Text
				style={ {
					fontSize: TextSize.h4,
					fontWeight: FontWeight.medium,
					color: Color.darkTwo,
				} }>{ title }</Text>
			<Text
				style={ {
					marginTop: 4,
					fontSize: TextSize.h5,
					color: Color.darkGray,
				} }>{ description }</Text>
		</View>
	);
});

export const PlaceDetailScreen = memo(() => {

	const { selectedSeat } = useSelectedSeat();

	if (!selectedSeat) {return null;}

	const { leaveAt, cafeName, address, thumbnailUrl, descriptionSeat, descriptionGiver } = selectedSeat;
	const _leavTime = moment.utc(leaveAt).format("HH:mm");
	const source = thumbnailUrl ? {
		uri: thumbnailUrl,
	} : require("../../resources/images/Sample.png");

	return (
		<SafeAreaView
			style={ {
				flex: 1,
				backgroundColor: Color.white,
			} }>
			<Header
				title={ "자리 올리기" }
				renderRight={ <HeaderRight /> } />
			<ScrollView
				style={ {
					flex: 1,
				} }>
				<View
					style={ { marginTop: 20, paddingHorizontal: 24 } }>
					<Text
						style={ {
							fontSize: TextSize.h1,
							color:Color.darkTwo,
							fontWeight: FontWeight.bold,
						} }>{ cafeName }</Text>
					<View
						style={ { marginTop: 24 } }>
						<Text
							style={ {
								fontSize: TextSize.h4,
								color:Color.darkGray,
							} }>{ address }</Text>
					</View>
					<View
						style={ {
							marginTop: 16,
							flexDirection: "row",
							alignItems: "center",
						} }>
						<Text
							style={ {
								fontSize: TextSize.h2,
								color: Color.darkTwo,
								fontWeight: FontWeight.bold,
							} }>{ _leavTime } ~ </Text>
						<Text
							style={ {
								fontSize: TextSize.h2,
								color: Color.darkTwo,
							} }>이용가능</Text>
					</View>
					<View
						style={ {
							marginTop: 4,
						} }>
						<PlugView
							hasPlug={ false }
							fontSize={ TextSize.h4 }
							fontWeight={ FontWeight.bold }
							iconSize={
								{
									width: 24,
									height: 24,
								}
							}/>
					</View>
				</View>
				<View
					style={ { marginVertical: 40 } }>
					<Image
						resizeMode={ "cover" }
						style={ {
							height: 278,
						} }
						source={ source } />
				</View>
				<View
					style={ {
						paddingHorizontal: 24,
					} }>
					<Section
						title={ "운영 시간" }
						// TODO. API 수정되면 수정해야함
						description={ "API 수정이 필요해요 ㅎㅎ" } />
					{ descriptionSeat && (
						<Section
							title={ "자리 설명" }
							description={ descriptionSeat } />
					) }
					{ descriptionGiver && (
						<Section
							title={ "식별 안내" }
							description={ descriptionGiver } />
					) }
				</View>
			</ScrollView>
		</SafeAreaView>
	);
});
