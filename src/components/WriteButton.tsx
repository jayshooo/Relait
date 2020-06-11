import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, View } from 'react-native';
import { Color } from '../constants/styles';
import { IWriteButton } from './types/WriteButton';
import { TabBarHeight } from '../utils/Helpers';

export const WriteButton: FC<IWriteButton> = ({ bottomHeight, onPressWriteButton }) => {

    return (
        <View
            style={ {
                position: 'absolute',
                backgroundColor: Color.purplishBlue,
                borderRadius: 50,
                right: 24,
                bottom: bottomHeight + 24 + TabBarHeight,
            } }>
            <TouchableOpacity
                style={ {
                    padding: 16,
                } }
                onPress={ onPressWriteButton }>
                <Image source={ require('../resources/icons/WriteIcon.png') } />
            </TouchableOpacity>
        </View>
    );
};