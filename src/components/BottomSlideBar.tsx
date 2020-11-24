import React, { FC, useState, useCallback, useEffect } from "react";
import { View, Text, Dimensions, Animated, ListRenderItem } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { Color, TextSize } from "../constants/styles";
import SlidingUpPanel from "rn-sliding-up-panel";
import { ITouchupBar, IBottomSlideBar } from "./types/BottomSlideBar";
import { isIphoneX } from "../utils/Helpers";
import { ListComponent } from "./ListComponent";
import { ISeat } from "../store/reducers/seats/types";

const { height } = Dimensions.get("window");

let panel: SlidingUpPanel | null = null;

const TouchupBar: FC<ITouchupBar> = ({ showText = true, onPress }) => {

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
			<View
				style={ {
					width: 36,
					height: 5,
					backgroundColor: Color.black,
					opacity: 0.2,
					borderRadius: 2.5,
				} } />
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

export const BottomSlideBar: FC<IBottomSlideBar> = ({ bottomHeight, setShowHeader, onPressPlace, seats, isFiltered }) => {

	const [ isExpand, setIsExpand ] = useState(false);
	const _bottomHeight = isIphoneX ? bottomHeight + 34 : bottomHeight;
	const [ animatedValue, setAnimatedValue ] = useState(new Animated.Value(0));
	const [ allowDrag, setAllowDrag ] = useState(true);
	// const { seats } = useSeats();

	useEffect(() => {
		setAnimatedValue(new Animated.Value(_bottomHeight));
	}, [ _bottomHeight ]);

	useEffect(() => {
		setShowHeader(!isExpand);
	}, [ isExpand ]);

	const onPressTouchBar = useCallback(() => {
		isExpand ? panel?.hide() : panel?.show();
	}, [ isExpand ]);

	const draggableRange = { top: height - 44, bottom: _bottomHeight };

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

	const _renderItem: ListRenderItem<ISeat> = ({ item }) => {
		if (!item) {return null;}
		return (
			<ListComponent
				key={ item.address }
				onPressPlace={ () => {
					onPressTouchBar();
					onPressPlace(item);
				} }
				cafeName={ item.cafeName }
				leaveAt={ item.leaveAt }
				thumbnailUrl={ item.thumbnailUrl }
				havePlug={ item.havePlug } />
		);
	};

	const showText = !isExpand && !isFiltered;

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
			draggableRange={ { top: height - 44, bottom: _bottomHeight } }>
			<View
				style={ { flex: 1 } }>
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
					// seats를 내려받고, 선택인지 아닌지 플래그 받아야함 플래그에 따라 UI 변경됨
					data={ seats }
					renderItem={ _renderItem } />
			</View>
		</SlidingUpPanel>
	);
};
