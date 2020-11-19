import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Color, TextSize, FontWeight } from '../../constants/styles';
import { InputBoxInterface } from './types/InputBox';

export const InputBox: React.FC<InputBoxInterface> = ({ label, isBold, containerStyle, placeholder = '', inputStyle, multiline = false }) => {
    return (
        <View
            style={ [ {
                flex: 1,
            }, containerStyle ] }>
            { label && (
                <Text
                    style={ {
                        fontSize: TextSize.h5,
                        color: Color.darkTwo,
                        fontWeight: !!isBold ? FontWeight.bold : FontWeight.normal,
                        marginBottom: 4,
                    } }>{ label }</Text>
            ) }
            <TextInput
                style={ [ {
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: Color.powderBlue,
                    paddingHorizontal: 16,
                    paddingTop: 14,
                    paddingBottom: 14,
                }, inputStyle ] }
                placeholder={ placeholder }
                multiline={ multiline } />
        </View>
    );
};