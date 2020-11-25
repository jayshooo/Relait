import React, { FC, useState, useCallback, useEffect, memo } from "react";
import { View, Text, Dimensions, Animated, TouchableOpacity, FlatList } from "react-native";
import { Color, TextSize } from "../constants/styles";
import SlidingUpPanel from "rn-sliding-up-panel";
import { ITouchupBar, IBottomSlideBar, IFixedBottomBar } from "./types/BottomSlideBar";
import { isIphoneX } from "../utils/Helpers";
import { ListComponent } from "./ListComponent";
import { IListItem } from "./types/ListComponent";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

let panel: SlidingUpPanel | null = null;

const ListItem = memo<IListItem>(({ item, onPressTouchBar, onPressPlace, isFixed = false }) => {
	if (!item) {return null;}
	return (
		<ListComponent
			key={ item.address }
			onPressPlace={ () => {
				onPressPlace(item);
				if (!onPressTouchBar) {return;}
				onPressTouchBar();
			} }
			cafeName={ item.cafeName }
			leaveAt={ item.leaveAt }
			thumbnailUrl={ item.thumbnailUrl }
			havePlug={ item.havePlug }
			isFixed={ isFixed } />
	);
});

const TouchupBar: FC<ITouchupBar> = ({ showText = true, onPress, isFixed = false }) => {

	const paddingBottom = showText && isIphoneX ? 50 : 34;

	return (
		<TouchableOpacity
			activeOpacity={ 1 }
			style={ {
				backgroundColor: Color.white,
				paddingTop: 8,
				paddingBottom,
				justifyContent: "flex-start",
				alignItems: "center",
				borderTopLeftRadius: 16,
				borderTopRightRadius: 16,
			} }
			onPress={ () => {
				if (!onPress) {return;}
				onPress();
			} }>
			{ !isFixed && (
				<View
					style={ {
						width: 36,
						height: 5,
						backgroundColor: Color.black,
						opacity: 0.2,
						borderRadius: 2.5,
					} } />
			) }
			{ showText && (
				<Text
					style={ {
						marginTop: 8,
						color: Color.darkTwo,
						fontSize: TextSize.h4,
					} }>전체보기</Text>
			) }
		</TouchableOpacity>
	);
};

export const BottomSlideBar: FC<IBottomSlideBar> = ({ bottomHeight, setShowHeader, onPressPlace, seats }) => {

	const [ isExpand, setIsExpand ] = useState(false);
	const _bottomHeight = isIphoneX ? bottomHeight + 34 : bottomHeight;
	const [ animatedValue, setAnimatedValue ] = useState(new Animated.Value(0));
	const [ allowDrag, setAllowDrag ] = useState(true);

	useEffect(() => {
		setAnimatedValue(new Animated.Value(_bottomHeight));
	}, [ _bottomHeight ]);

	useEffect(() => {
		setShowHeader(!isExpand);
	}, [ isExpand, setShowHeader ]);

	const onPressTouchBar = useCallback(() => {
		isExpand ? panel?.hide() : panel?.show();
	}, [ isExpand ]);

	const draggableRange = {
		top: height - 44,
		bottom: _bottomHeight,
	};

	const _onAnimatedValueChange = useCallback(({ value }: { value: number; }) => {

		const { top, bottom } = draggableRange;

		if (value === bottom) {
			setIsExpand(false);
		}

		if (value === top) {
			setIsExpand(true);
		}

	}, [ draggableRange ]);

	animatedValue.addListener(_onAnimatedValueChange);

	return (
		<SlidingUpPanel
			ref={ (_panel: SlidingUpPanel) => {
				if (!_panel) {return;}
				panel = _panel;
			} }
			allowDragging={ allowDrag }
			animatedValue={ animatedValue }
			friction={ 0.5 }
			backdropOpacity={ 0 }
			snappingPoints={ [ height - 44, _bottomHeight ] }
			draggableRange={ {
				top: height - 44,
				bottom: _bottomHeight,
			} }>
			<View
				style={ {
					flex: 1,
				} }>
				<TouchupBar
					showText={ !isExpand }
					onPress={ onPressTouchBar } />
				<FlatList
					keyExtractor={ (item) => {
						return item.id.toString();
					} }
					onTouchStart={ () => {
						setAllowDrag(false);
					} }
					onTouchEnd={ () => {
						setAllowDrag(true);
					} }
					onTouchCancel={ () => {
						setAllowDrag(true);
					} }
					style={ {
						backgroundColor: Color.white,
						paddingHorizontal: 24,
					} }
					contentContainerStyle={ {
						paddingBottom: _bottomHeight,
					} }
					data={ seats }
					renderItem={ ({ item }) => {
						return (
							<ListItem
								item={ item }
								onPressTouchBar={ onPressTouchBar }
								onPressPlace={ onPressPlace }
							/>
						);
					} } />
			</View>
		</SlidingUpPanel>
	);
};

export const FixedBottomBar = memo<IFixedBottomBar>(({ onPressPlace, seats, setHeight }) => {

	const navigation = useNavigation();
	const bottom = isIphoneX ? 58 : 24;
	const goPlaceDetail = useCallback(() => {
		navigation.navigate("PlaceDetailScreen");
	}, [ navigation ]);

	return (
		<View
			onLayout={ ({ nativeEvent }) => {
				if (!nativeEvent || !setHeight) {return;}
				const { layout: { height }  } = nativeEvent;
				setHeight(height);
			} }
			style={ {
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
			} }>
			<TouchupBar
				showText={ false }
				isFixed={ true } />
			<FlatList
				keyExtractor={ (item) => {
					return item.id.toString();
				} }
				style={ {
					backgroundColor: Color.white,
					paddingHorizontal: 24,
				} }
				contentContainerStyle={ {
					paddingBottom: bottom,
				} }
				data={ seats }
				renderItem={ ({ item }) => {
					return (
						<ListItem
							item={ item }
							isFixed={ true }
							onPressPlace={ (seat) => {
								onPressPlace(seat);
								goPlaceDetail();
							} }
						/>
					);
				} } />
		</View>
	);
});
