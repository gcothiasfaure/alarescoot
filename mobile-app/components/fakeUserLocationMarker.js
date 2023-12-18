import { Marker } from "react-native-maps";

export default function fakeUserLocationMarker({ fakeUserLocationCoords }) {
	return (
		<Marker
			style={{ zIndex: 1000 }}
			identifier={"fake-user-position-marker"}
			key={"fake-location"}
			tracksViewChanges={false}
			coordinate={fakeUserLocationCoords.coords}
			stopPropagation={true}
		/>
	);
}
