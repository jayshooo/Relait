import React, { FC, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color, TextSize } from '../constants/styles';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { ITouchupBar, IBottmoSlideBar } from './types/BottomSlideBar';
import { isIphoneX } from '../utils/Helpers';

const { height } = Dimensions.get('window');

let panel: SlidingUpPanel | null = null;

const TouchupBar: FC<ITouchupBar> = ({ showText = true, onPress }) => {

    return (
        <TouchableOpacity
            style={ {
                paddingTop: 8,
                paddingBottom: 34,
                justifyContent: 'flex-start',
                alignItems: 'center',
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

export const BottomSlideBar: FC<IBottmoSlideBar> = ({ bottomHeight, setShowHeader }) => {

    const [ isExpand, setIsExpand ] = useState(false);
    const _bottomHeight = isIphoneX ? bottomHeight + 34 : bottomHeight;

    return (
        <SlidingUpPanel
            ref={ _panel => {
                if (!_panel) return;
                panel = _panel;
            } }
            friction={ 0.5 }
            backdropOpacity={ 0 }
            onDragStart={ (e) => {
                const isStartFromBottom = e === _bottomHeight;
                setShowHeader(!isStartFromBottom);
            } }
            onBottomReached={ () => {
                setIsExpand(false);
            } }
            snappingPoints={ [ height - 44, _bottomHeight ] }
            draggableRange={ { top: height - 44, bottom: _bottomHeight } }>
            <View
                style={ {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: Color.white,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                } }>
                <TouchupBar
                    showText={ !isExpand }
                    onPress={ () => {
                        isExpand ? panel?.hide() : panel?.show();
                        setIsExpand(prevExpand => {
                            setShowHeader(prevExpand);
                            return !prevExpand;
                        });
                    } } />
                { isExpand && (
                    <Text>자리 리스트</Text>
                ) }
            </View>
        </SlidingUpPanel>
    );
};
