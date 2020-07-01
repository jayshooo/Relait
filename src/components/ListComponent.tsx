import React, { FC } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { TextSize, Color, FontWeight } from '../constants/styles';
import { IPlugView } from './types/ListComponent';

const PlugView: FC<IPlugView> = ({ hasPlug = false }) => {

    const source = hasPlug ? require('../resources/icons/Plug.png') : require('../resources/icons/NoPlug.png');
    const text = hasPlug ? '있음' : '없음';
    const color = hasPlug ? Color.deepOrange : Color.grayTwo;

    return (
        <View
            style={ { flexDirection: 'row' } }>
            <Image source={ source }></Image>
            <Text
                style={ {
                    marginLeft: 4,
                    fontSize: TextSize.h5,
                    color,
                } }>콘센트 { text }</Text>
        </View>
    );

};

export const ListComponent = () => {

    return (
        <TouchableOpacity
            style={ {
                marginBottom: 24,
                alignSelf: 'stretch',
                flexDirection: 'row',
                justifyContent: 'space-between'
            } }>
            <View
                style={ { justifyContent: 'space-between' } }>
                <Text
                    style={ {
                        fontSize: TextSize.h5,
                        color: Color.darkTwo,
                    } }>작당모의</Text>
                <View
                    style={ {
                        flexDirection: 'row',
                        alignItems: 'center',
                    } }>
                    <Text
                        style={ {
                            fontSize: TextSize.h3,
                            fontWeight: FontWeight.bold,
                        } }>18:00 ~</Text>
                    <Text
                        style={ {
                            marginTop: 2,
                            marginLeft: 4,
                            fontSize: TextSize.h3,
                        } }>이용가능</Text>
                </View>
                <PlugView
                    hasPlug={ true } />
            </View>
            <Image
                style={ {
                    borderRadius: 4,
                } }
                source={ require('../resources/images/Sample.png') }></Image>
        </TouchableOpacity>
    );
};