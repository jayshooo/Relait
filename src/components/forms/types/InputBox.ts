import { StyleProp, ViewStyle } from "react-native";

export interface InputBoxInterface {
    label?: string;
    placeholder?: string;
    isBold?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    multiline?: boolean;
    onChangeText: (value: string) => void;
}
