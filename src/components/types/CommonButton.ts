import { StyleProp, ViewStyle, LayoutRectangle } from 'react-native';
import { FontWeight } from '../../constants/styles';

export interface ICommonButton {
    onLayout?: (nativeEvent: LayoutRectangle) => void;
    icon?: number;
    hasShadow?: boolean;
    buttonTitle: string;
    onPressCallback: Function;
    buttonColor: string;
    textColor: string;
    fontWeight?: FontWeight;
    additioinalStyle?: StyleProp<ViewStyle> | null;
}