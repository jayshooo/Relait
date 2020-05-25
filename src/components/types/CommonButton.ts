import { StyleProp, ViewStyle, LayoutRectangle } from 'react-native';

export interface ICommonButton {
    onLayout?: (nativeEvent: LayoutRectangle) => void;
    icon?: number;
    hasShadow?: boolean;
    buttonTitle: string;
    onPressCallback: Function;
    buttonColor: string;
    textColor: string;
    textWeight?: string;
    additioinalStyle?: StyleProp<ViewStyle> | null;
}