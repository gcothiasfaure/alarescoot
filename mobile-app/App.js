import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Map from "./screens/map.js";

SplashScreen.preventAutoHideAsync();

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style="black" />
			<Map />
		</GestureHandlerRootView>
	);
}
