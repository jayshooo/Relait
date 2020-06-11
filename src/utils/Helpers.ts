import DeviceInfo from 'react-native-device-info';

export const isIphoneX = DeviceInfo.hasNotch();

export const StatusBarHeight = isIphoneX ? 25 : 0;

export const TabBarHeight = isIphoneX ? 34 : 0;