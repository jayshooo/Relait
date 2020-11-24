import React, { FC } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { TextSize, Color, FontWeight } from "../constants/styles";
import { IPlugView, IListComponent } from "./types/ListComponent";
import moment from "moment";

export const PlugView: FC<IPlugView> = ({ hasPlug = false, fontSize = TextSize.h5, fontWeight = FontWeight.normal, iconSize = { width: 16, height: 16 } }) => {

	const source = hasPlug ? require("../resources/icons/Plug.png") : require("../resources/icons/NoPlug.png");
	const text = hasPlug ? "있음" : "없음";
	const color = hasPlug ? Color.deepOrange : Color.grayTwo;

	return (
		<View
			style={ { flexDirection: "row" } }>
			<Image
				width={ iconSize.width }
				height={ iconSize.height }
				source={ source } />
			<Text
				style={ {
					marginLeft: 4,
					fontSize,
					color,
					fontWeight,
				} }>콘센트 { text }</Text>
		</View>
	);

};

export const ListComponent: FC<IListComponent> = ({ cafeName, leaveAt, thumbnailUrl, havePlug, onPressPlace, isFixed }) => {

	const source = thumbnailUrl ? {
		uri: thumbnailUrl,
	} : require("../resources/images/Sample.png");

	const _leavTime = moment.utc(leaveAt).format("HH:mm");

	return (
		<TouchableOpacity
			style={ {
				marginBottom: 24,
				alignSelf: "stretch",
				flexDirection: "row",
				justifyContent: "space-between",
			} }
			onPress={ onPressPlace }>
			{ isFixed && (
				<Image
					source={ require("../resources/icons/Marker.png") }
					resizeMode={ "cover" }
					style={ {
						width: 24,
						height: 24,
						marginRight: 32,
						alignSelf: "center" } } />
			) }
			<View
				style={ { justifyContent: "space-between", flex: 1 } }>
				<Text
					style={ {
						fontSize: TextSize.h5,
						color: Color.darkTwo,
					} }>{ cafeName }</Text>
				<View
					style={ {
						flexDirection: "row",
						alignItems: "center",
					} }>
					<Text
						style={ {
							flexShrink: 1,
							fontSize: TextSize.h3,
							fontWeight: FontWeight.bold,
						} }
						numberOfLines={ 1 }
						ellipsizeMode={ "tail" }>{ _leavTime } ~</Text>
					<Text
						style={ {
							marginTop: 2,
							marginLeft: 4,
							fontSize: TextSize.h3,
						} }>이용가능</Text>
				</View>
				<PlugView
					hasPlug={ !!havePlug } />
			</View>
			<Image
				resizeMode={ "cover" }
				style={ {
					width: 103,
					height: 76,
					borderRadius: 4,
				} }
				source={ source } />
		</TouchableOpacity>
	);
};
