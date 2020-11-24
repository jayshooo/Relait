import React, { useRef, useEffect } from "react";
import { IMapMarker, IMapContainer } from "./types/Maps";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useSeats } from "../utils/hooks/useSeats";
import { moveCamera } from "../utils/Helpers";

export const MapMarker = ({ lat, lng, onPressMarker, isMyLocation = false }: IMapMarker) => {

	return (
		<Marker
			coordinate={ {
				latitude: lat,
				longitude: lng,
			} }
			image={ isMyLocation ? require("../resources/icons/MyLocationMarker.png") : require("../resources/icons/Marker.png") }
			onPress={ () => {
				if (!onPressMarker) {return;}
				onPressMarker();
			} }
			tracksViewChanges={ true } />
	);
};

export const MapContainer: React.FC<IMapContainer> = ({ myCoordination, onPressPlace, setMapRefObj }) => {

	const { latitude, longitude } = myCoordination;
	const { seats } = useSeats();

	let mapRef = useRef<MapView | null>(null);

	useEffect(() => {

		if (!mapRef || !myCoordination) {return;}

		moveCamera({
			mapRef,
			lat: latitude,
			lng: longitude,
		});

	}, [ myCoordination, latitude, longitude ]);

	return (
		<MapView
			onMapReady={ () => {
				setMapRefObj(mapRef);
			} }
			ref={ mapRef }
			provider={ PROVIDER_GOOGLE }
			style={ {
				flex: 1,
			} }>
			<MapMarker
				lat={ latitude }
				lng={ longitude }
				isMyLocation={ true } />
			{ seats && seats.map(seat => {
				return <MapMarker
					key={ seat.id }
					lat={ seat.lat }
					lng={ seat.lng }
					onPressMarker={ () => {
						onPressPlace(seat);
					} }
				/>;
			}) }
		</MapView>
	);
};
