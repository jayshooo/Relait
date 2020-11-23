import React, { FC, memo } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Color, FontWeight, TextSize } from "../../constants/styles";
import { PickerButtonInterface } from "./types/PickerButton";

export const PickerButton: FC<PickerButtonInterface> = memo(({ onPress, value, label, containerStyle = {}, isBold = false, placeholder }) => {
    
    const hasValue = !!value;
    return (
        <View
            style={ [{
                flex: 1,
            }, containerStyle] }>
            { label && (
                <Text
                    style={ {
                        fontSize: TextSize.h5,
                        color: Color.darkTwo,
                        fontWeight: !!isBold ? FontWeight.bold : FontWeight.normal,
                        marginBottom: 4,
                    } }>{ label }
                </Text>
            ) }
            <TouchableOpacity
                style={ {
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: Color.powderBlue,
                    paddingHorizontal: 16,
                    paddingTop: 14,
                    paddingBottom: 14,
                } }
            onPress={ onPress }>
            <Text
                style={ {
                    color: hasValue ? Color.darkTwo : Color.grayTwo,
                } }>{ hasValue ? value : placeholder }</Text>
        </TouchableOpacity>
        </View>
    )
})