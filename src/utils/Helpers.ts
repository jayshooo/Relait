import DeviceInfo from "react-native-device-info";
import MapView from "react-native-maps";
import { RefObject } from "react";

export const isIphoneX = DeviceInfo.hasNotch();

export const StatusBarHeight = isIphoneX ? 25 : 0;

export const TabBarHeight = isIphoneX ? 34 : 0;

export const moveCamera = ({ lat, lng, mapRef }: { lat: number, lng: number, mapRef: RefObject<MapView> | null; }) => {

	if (!mapRef) {return;}

    mapRef.current!.animateCamera({
    	center: {
    		latitude: lat,
    		longitude: lng,
    	},
    	zoom: 18,
    }, {
    	duration: 50,
    });
};
