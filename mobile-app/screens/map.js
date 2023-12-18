import ScootMarker from "../components/scootMarker";
import SelectedScootMarker from "../components/selectedScootMarker";
import ScootInfos from "../components/scootInfos";
import FakeUserLocationMarker from "../components/fakeUserLocationMarker";
import NavigatePressable from "../components/navigatePressable";
import * as SplashScreen from "expo-splash-screen";

import MapView from "react-native-maps";

import { BlurView } from "expo-blur";
import BottomSheet from "@gorhom/bottom-sheet";

import Constants from "expo-constants";

import { StyleSheet, Alert, Dimensions } from "react-native";

import {
	calculateInitialMapView,
	calculateMapViewOnScootSelection,
} from "../utils";

import * as Network from "expo-network";

import { useFonts } from "expo-font";
import { useState, useEffect, useRef, useMemo } from "react";
import * as Location from "expo-location";

export default function Map() {
	const fakeUserLocationCoords = {
		coords: {
			latitude: 48.8533247232873,
			longitude: 2.3488601996989473,
		},
	};
	const windowHeight = Dimensions.get("window").height;

	const bottomSheetRef = useRef(null);
	const mapViewRef = useRef(null);

	const snapPoints = useMemo(() => [(1350 / windowHeight) * 100], []);

	const [mapIsReady, setMapIsReady] = useState(false);
	const [initialRegionChangeComplete, setInitialRegionChangeComplete] =
		useState(true);
	const [location, setLocation] = useState(null);
	const [locationReady, setLocationReady] = useState(false);
	const [scooters, setScooters] = useState(null);
	const [selectedScooter, setSelectedScooter] = useState(null);
	const [requestHandle, setRequestHandle] = useState(false);

	const [fontsLoaded] = useFonts({
		"Geist-Regular": require("../assets/fonts/Geist-Regular.otf"),
		"Geist-Bold": require("../assets/fonts/Geist-Bold.otf"),
	});

	useEffect(() => {
		if (mapIsReady & fontsLoaded & locationReady & requestHandle) {
			if (location) {
				mapViewRef.current.setCamera(
					calculateInitialMapView(scooters, location),
					{ duration: 0 }
				);
			} else {
				mapViewRef.current.setCamera(
					calculateInitialMapView(scooters, fakeUserLocationCoords),
					{ duration: 0 }
				);
			}
		}

		if (
			mapIsReady &
			fontsLoaded &
			locationReady &
			requestHandle &
			initialRegionChangeComplete
		) {
			setTimeout(() => {
				SplashScreen.hideAsync();
			}, 500);
		}
	}, [
		fontsLoaded,
		mapIsReady,
		locationReady,
		requestHandle,
		initialRegionChangeComplete,
	]);

	useEffect(() => {
		(async () => {
			let location = await getUserLocation();
			setLocation(location);
			setLocationReady(true);
			let scooters = await getScooters(location);
			setScooters(scooters.data);
			setRequestHandle(true);
		})();
	}, []);

	const getUserLocation = async () => {
		const locationRequestStatus =
			await Location.getForegroundPermissionsAsync();
		if (locationRequestStatus.status === "denied") {
			return null;
		}
		if (locationRequestStatus.status === "undetermined") {
			const newRequestStatus =
				await Location.requestForegroundPermissionsAsync();
			if (newRequestStatus.status === "denied") {
				return null;
			}
		}
		return await Location.getCurrentPositionAsync({ accuracy: 1 });
	};

	const getScooters = async (location) => {
		(async () => {
			const internetStatus = await Network.getNetworkStateAsync();
			if (!internetStatus.isInternetReachable) {
				Alert.alert(
					"Erreur",
					"Impossible de se connecter à internet. Veuillez réessayer lorsque vous serez connecté à internet."
				);
				throw new Error("Impossible de se connecter à internet.");
			}
		})();
		try {
			const apiUrl = location
				? `https://api.alarescoot.lgna.fr/nearest-10-scooters-2-helmets?lat=${location.coords.latitude}&lng=${location.coords.longitude}`
				: `https://api.alarescoot.lgna.fr/nearest-10-scooters-2-helmets?lat=${fakeUserLocationCoords.coords.latitude}&lng=${fakeUserLocationCoords.coords.longitude}`;

			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error(
					`La requête a échoué avec un statut ${response.status}`
				);
			}

			return await response.json();
		} catch (error) {
			Alert.alert(
				"Erreur",
				"Impossible de récupérer la position des scooters. Veuillez réessayer plus tard."
			);
		}
	};

	const handleNavigatePress = () => {
		bottomSheetRef.current.close();
		setTimeout(() => {
			setSelectedScooter(null);
		}, 200);

		if (location) {
			mapViewRef.current.animateCamera(
				calculateInitialMapView(scooters, location),
				{ duration: 400 }
			);
		} else {
			mapViewRef.current.animateCamera(
				calculateInitialMapView(scooters, fakeUserLocationCoords),
				{ duration: 400 }
			);
		}
	};

	const pressMarker = (markerId) => {
		const scoot = scooters.filter((item) => item.id === markerId)[0];
		setSelectedScooter(scoot);

		if (location) {
			mapViewRef.current.animateCamera(
				calculateMapViewOnScootSelection(scoot, location),
				{ duration: 400 }
			);
		} else {
			mapViewRef.current.animateCamera(
				calculateMapViewOnScootSelection(scoot, fakeUserLocationCoords),
				{ duration: 400 }
			);
		}

		if (selectedScooter === null) {
			bottomSheetRef.current.expand();
		} else {
			bottomSheetRef.current.close();
			setTimeout(() => {
				bottomSheetRef.current.expand();
			}, 300);
		}
	};

	const onChange = (e) => {
		if (e == -1) {
			setSelectedScooter(null);
		}
	};

	return (
		<>
			<MapView
				compassOffset={{ x: -5, y: 59 }}
				onMapReady={() => setMapIsReady(true)}
				style={styles.mapView}
				mapType={"mutedStandard"}
				pitchEnabled={false}
				showsPointsOfInterest={false}
				showsIndoors={false}
				showsUserLocation={true}
				followsUserLocation={false}
				showsMyLocationButton={false}
				ref={mapViewRef}
				onRegionChangeComplete={() => setInitialRegionChangeComplete(true)}
			>
				{!location && (
					<FakeUserLocationMarker
						fakeUserLocationCoords={fakeUserLocationCoords}
					/>
				)}

				<NavigatePressable onPress={handleNavigatePress} />

				{selectedScooter && (
					<SelectedScootMarker
						scoot={selectedScooter}
						pressMarker={pressMarker}
					/>
				)}

				{requestHandle &&
					scooters.map((scoot) => (
						<ScootMarker
							scoot={scoot}
							key={scoot.id}
							pressMarker={pressMarker}
						/>
					))}
			</MapView>
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				onChange={onChange}
				handleIndicatorStyle={{ backgroundColor: "black" }}
			>
				{selectedScooter && <ScootInfos scoot={selectedScooter} />}
			</BottomSheet>
			<BlurView intensity={20} style={styles.bluredBackgroundStatusBar} />
		</>
	);
}

const styles = StyleSheet.create({
	mapView: {
		width: "100%",
		height: "100%",
	},
	bluredBackgroundStatusBar: {
		height: Constants.statusBarHeight,
		position: "absolute",
		left: 0,
		right: 0,
		zIndex: 1000,
	},
});
