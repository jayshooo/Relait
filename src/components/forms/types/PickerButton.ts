import { StyleProp, ViewStyle } from "react-native";

export interface PickerButtonInterface {
    onPress: () => void;
    label: string;
    value: string | null;
    containerStyle?: StyleProp<ViewStyle>;
    isBold?: boolean;
    placeholder: string;
}
