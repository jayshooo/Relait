import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ButtonInterface } from './types/Button';
import { Color, TextSize, FontWeight } from '../../constants/styles';

export const Button: React.FC<ButtonInterface> = ({ onPress, backgroundColor, color, label }) => {
    return (
        <TouchableOpacity
            onPress={ onPress }
            activeOpacity={ .7 }
            style={ {
                marginTop: 16,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 12,
                paddingVertical: 16,
                borderRadius: 16,
                backgroundColor: backgroundColor ? backgroundColor : Color.purplishBlue,
                marginBottom: 8,
            } }>
            <Text
                style={ {
                    marginTop: 2,
                    fontSize: TextSize.h4,
                    fontWeight: FontWeight.bold,
                    color: color ? color : Color.white,
                } }>{ label }</Text>
        </TouchableOpacity>
    );
};