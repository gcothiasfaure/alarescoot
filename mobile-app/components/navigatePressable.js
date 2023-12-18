import { StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function NavigatePressable({ onPress }) {
	return (
		<Pressable style={styles.navigatePressableContainer} onPress={onPress}>
			<Feather name="navigation" size={24} color="black" />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	navigatePressableContainer: {
		backgroundColor: "white",
		position: "absolute",
		zIndex: 1000,
		borderRadius: 10,
		right: 0,
		top: Constants.statusBarHeight,
		margin: 10,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});
