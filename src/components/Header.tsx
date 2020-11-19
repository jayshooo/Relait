import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextSize, FontWeight } from '../constants/styles';
import { HeaderInterface } from './types/Header';

export const Header: React.FC<HeaderInterface> = ({ onPress, title }) => {
    return (
        <View
            style={ {
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 15,
                paddingBottom: 24,
                position: "relative",
            } }>
            <TouchableOpacity
                style={ {
                    position: 'absolute',
                    top: 12,
                    left: 24,
                } }
                activeOpacity={ .7 }
                onPress={ () => {
                    if (!onPress) return;
                    onPress();
                } }>
                <Image
                    source={ require('../resources/icons/ArrowLeft.png') }></Image>
            </TouchableOpacity>
            { title && <Text
                style={ {
                    fontSize: TextSize.h3,
                    fontWeight: FontWeight.normal
                } }>{ title }</Text> }
        </View>
    );
};