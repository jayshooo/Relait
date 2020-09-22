import React, { FC, useState, useCallback, useEffect } from 'react';
import { View, Text, Dimensions, Animated, ListRenderItem } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Color, TextSize } from '../constants/styles';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { ITouchupBar, IBottomSlideBar } from './types/BottomSlideBar';
import { isIphoneX } from '../utils/Helpers';
import { ListComponent } from './ListComponent';
import { useSeats } from '../utils/Hooks';
import { ISeat } from '../store/reducers/seats/types';

const { height } = Dimensions.get('window');

let panel: SlidingUpPanel | null = null;

const TouchupBar: FC<ITouchupBar> = ({ showText = true, onPress }) => {

    return (
        <TouchableOpacity
            activeOpacity={ 1 }
            style={ {
                backgroundColor: Color.white,
                paddingTop: 8,
                paddingBottom: 34,
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
            } }
            onPress={ () => {
                if (!onPress) return;
                onPress();
            } }>
            <View
                style={ {
                    width: 36,
                    height: 5,
                    backgroundColor: Color.black,
                    opacity: .2,
                    borderRadius: 2.5,
                } }></View>
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

export const BottomSlideBar: FC<IBottomSlideBar> = ({ bottomHeight, setShowHeader }) => {

    const [ isExpand, setIsExpand ] = useState(false);
    const _bottomHeight = isIphoneX ? bottomHeight + 34 : bottomHeight;
    const [ animatedValue, setAnimatedValue ] = useState(new Animated.Value(0));
    const [ allowDrag, setAllowDrag ] = useState(true);
    const seats = useSeats();

    useEffect(() => {
        setAnimatedValue(new Animated.Value(_bottomHeight));
    }, [ _bottomHeight ]);

    useEffect(() => {
        setShowHeader(!isExpand);
    }, [ isExpand ]);

    const onPress = useCallback(() => {
        isExpand ? panel?.hide() : panel?.show();
    }, [ isExpand, panel ]);

    const draggableRange = { top: height - 44, bottom: _bottomHeight };

    const _onAnimatedValueChange = useCallback(({ value }: { value: number; }) => {

        const { top, bottom } = draggableRange;

        if (value === bottom) {
            setIsExpand(false);
        }

        if (value === top) {
            setIsExpand(true);
        }

    }, []);

    animatedValue.addListener(_onAnimatedValueChange);

    const _renderItem: ListRenderItem<ISeat> = ({ item }) => {
        if (!item) return null;
        return (
            <ListComponent
                key={ item.address }
                cafeName={ item.cafeName }
                leaveAt={ item.leaveAt }
                thumbnailUrl={ item.thumbnailUrl }
                havePlug={ item.havePlug } />
        );
    };

    // TODO. 정보들 렌더해줘야함
    // TODO. 아이템 눌렀을 때 해당 마커로 카메라 이동하도록 수정해야함

    return (
        <SlidingUpPanel
            ref={ (_panel: SlidingUpPanel) => {
                if (!_panel) return;
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
                    onPress={ onPress } />
                <FlatList
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
                    renderItem={ _renderItem }>
                </FlatList>
            </View>
        </SlidingUpPanel>
    );
};
