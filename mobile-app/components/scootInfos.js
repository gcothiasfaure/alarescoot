import {
	StyleSheet,
	View,
	Text,
	Image,
	Pressable,
	Linking,
	Alert,
	ActivityIndicator,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import {
	getServiceColors,
	getBatteryColorAndDimension,
	getAppStoreLinks,
} from "../utils";

import { useState } from "react";

const yegoServiceIcon = require("../assets/service-icons/yego.png");
const cityscootServiceIcon = require("../assets/service-icons/cityscoot.png");
const cooltraServiceIcon = require("../assets/service-icons/cooltra.png");

export default function ScootInfos({ scoot }) {
	const [loading, setLoading] = useState(false);

	const getServiceIcon = (serviceId) => {
		if (serviceId === "yego") {
			return yegoServiceIcon;
		} else if (serviceId === "cooltra") {
			return cooltraServiceIcon;
		} else {
			return cityscootServiceIcon;
		}
	};

	const onPress = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		Linking.openURL(scoot.operator.id + "://").catch((err) => {
			if (err.code === "EUNSPECIFIED") {
				Linking.openURL(getAppStoreLinks(scoot.operator.id));
			} else {
				Alert.alert(
					"Erreur",
					"Erreur lors de l'ouverture de l'application de location de scooter."
				);
			}
		});
	};

	const getBackgroundColor = (pressed) => {
		if (loading) {
			return getServiceColors(scoot.operator.id).iconPressed;
		}
		if (pressed) {
			return getServiceColors(scoot.operator.id).iconPressed;
		} else {
			return getServiceColors(scoot.operator.id).icon;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					position: "absolute",
					right: 15,
					borderRadius: 5,
					borderColor: "black",
					borderWidth: 3,
					padding: 10,
				}}
			>
				<Text style={{ fontSize: 18, textAlign: "center" }}>
					{scoot?.operator.id != "yego"
						? scoot?.public_id.text.slice(0, 3) +
						  "\n" +
						  scoot?.public_id.text.slice(3, 9)
						: scoot?.public_id.text}
				</Text>
			</View>
			<View style={{ marginLeft: 15 }}>
				<View
					style={{
						marginBottom: 15,
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Image
						source={getServiceIcon(scoot.operator.id)}
						style={{ width: 30, height: 30, marginEnd: 5 }}
					/>
					<Text style={styles.title}>{scoot?.operator.lib}</Text>
				</View>

				<View
					style={{
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 5,
					}}
				>
					<View style={{ marginEnd: 10 }}>
						<Svg height="24" width="24" viewBox="0 0 512 512" fill="none">
							<Path
								fill="#000000"
								d="M434.115,239.04l-33.036-46.148c-8.024-10.894-18.451-19.779-30.478-25.988l-67.478-35.418 c-15.591-6.356-26.846-11.578-43.15-12.33l-18.842-0.537c-11.675-0.196-23.536,3.475-31.689,11.841l-64.217,57.638l-55.627,15.258 c-10.534,2.9-16.957,13.531-14.624,24.201l0.196,0.821c2.294,10.494,12.3,17.435,22.942,15.922l44.81-6.394 c11.178-1.591,21.966-5.223,31.826-10.709l27.081-18.275l1.386,89.883c-0.274,7.234-0.43,12.173-3.466,17.455l-91.835,159.518 c-6.561,11.374-2.685,25.9,8.649,32.51l0.791,0.459c10.729,6.257,24.455,3.241,31.562-6.932l104.908-148.37l40.182,87.94 c3.105,4.09,6.863,7.634,11.129,10.485l80.189,53.704c10.094,6.765,23.722,4.617,31.259-4.93l0.899-1.152 c3.856-4.892,5.584-11.12,4.822-17.31c-0.772-6.179-3.983-11.793-8.923-15.59l-69.158-53.138l-40.045-113.166l3.573-101.441 l48.012,14.418l50.492,49.574c6.346,6.238,16.304,6.932,23.45,1.63l0.489-0.361C438.117,258.233,439.875,247.074,434.115,239.04z"
							></Path>
							<Path
								fill="#000000"
								d="M239.735,99.221c27.227,4.169,52.688-14.536,56.867-41.773c4.158-27.237-14.546-52.698-41.784-56.867 c-27.237-4.168-52.698,14.536-56.857,41.774C193.783,69.593,212.497,95.053,239.735,99.221z"
							></Path>
						</Svg>
					</View>
					<View>
						<Text style={styles.textFontFamily}>{scoot?.distance} m</Text>
					</View>
				</View>

				<View
					style={{
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 15,
					}}
				>
					<View style={{ marginEnd: 10 }}>
						<Svg viewBox="0 0 24 24" fill="none" width="24" height="24">
							<Path
								d={getBatteryColorAndDimension(scoot.autonomy.level).path}
								stroke={getBatteryColorAndDimension(scoot.autonomy.level).color}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></Path>
						</Svg>
					</View>
					<View>
						<Text style={styles.textFontFamily}>
							{scoot?.autonomy.number} {scoot?.autonomy.type}
						</Text>
					</View>
				</View>
			</View>
			<View style={{ alignItems: "center" }}>
				<Pressable
					onPress={onPress}
					style={({ pressed }) => [
						{
							backgroundColor: getBackgroundColor(pressed),
							alignItems: "center",
							borderRadius: 50,
							justifyContent: "center",
							height: 50,
							width: "90%",
						},
					]}
				>
					{!loading ? (
						<Text style={{ color: "white", fontSize: 20 }}>
							Ouvir l'application
						</Text>
					) : (
						<ActivityIndicator color="white" />
					)}
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	textFontFamily: {
		fontFamily: "Geist-Regular",
		color: "black",
	},
	title: {
		fontFamily: "Geist-Bold",
		fontSize: 27,
	},
	scootPublicIdContainer: {
		borderRadius: 5,
		borderColor: "black",
		borderWidth: 3,
	},
});
