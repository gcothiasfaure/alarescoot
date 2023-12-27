"use client";
import styles from "./page.module.css";
import Map, { GeolocateControl, FullscreenControl } from "react-map-gl";

export default function MapPage() {
	return (
		<>
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
				initialViewState={{
					longitude: 2.3488601996989473,
					latitude: 48.8533247232873,
					zoom: 12,
				}}
				style={{
					width: 600,
					height: 400,
				}}
				mapStyle="mapbox://styles/mapbox/streets-v11"
				maxPitch={0}
				minPitch={0}
			>
				<GeolocateControl position="top-left" />
				<FullscreenControl position="top-left" />
			</Map>
		</>
	);
}
