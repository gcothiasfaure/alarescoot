export const calculateInitialMapView = (scooters, location) => {
	let minLatitude = location.coords.latitude;
	let maxLatitude = location.coords.latitude;
	let minLongitude = location.coords.longitude;
	let maxLongitude = location.coords.longitude;

	for (const scoot of scooters) {
		minLatitude = Math.min(minLatitude, scoot.coords.latitude);
		maxLatitude = Math.max(maxLatitude, scoot.coords.latitude);
		minLongitude = Math.min(minLongitude, scoot.coords.longitude);
		maxLongitude = Math.max(maxLongitude, scoot.coords.longitude);
	}

	const latitudeDelta = maxLatitude - minLatitude;
	const longitudeDelta = maxLongitude - minLongitude;

	let altitude = 0;
	if (Math.max(latitudeDelta, longitudeDelta) * 111000 * 3 < 1100) {
		altitude = 1100;
	} else {
		altitude = Math.max(latitudeDelta, longitudeDelta) * 111000 * 3;
	}

	const centerLatitude = (minLatitude + maxLatitude) / 2;
	const centerLongitude = (minLongitude + maxLongitude) / 2;

	return {
		center: {
			latitude: centerLatitude,
			longitude: centerLongitude,
		},
		altitude: altitude,
		heading: 0,
	};
};

export const calculateMapViewOnScootSelection = (scoot, location) => {
	const minLatitude = Math.min(location.coords.latitude, scoot.coords.latitude);
	const maxLatitude = Math.max(location.coords.latitude, scoot.coords.latitude);
	const minLongitude = Math.min(
		location.coords.longitude,
		scoot.coords.longitude
	);
	const maxLongitude = Math.max(
		location.coords.longitude,
		scoot.coords.longitude
	);

	const latitudeDelta = maxLatitude - minLatitude;
	const longitudeDelta = maxLongitude - minLongitude;

	let altitude = 0;
	if (Math.max(latitudeDelta, longitudeDelta) * 111000 * 4 < 1100) {
		altitude = 1100;
	} else {
		altitude = Math.max(latitudeDelta, longitudeDelta) * 111000 * 4;
	}

	const centerLatitude = (minLatitude + maxLatitude) / 2 - 0.0008;
	const centerLongitude = (minLongitude + maxLongitude) / 2;

	return {
		center: {
			latitude: centerLatitude,
			longitude: centerLongitude,
		},
		altitude: altitude,
		heading: 0,
	};
};

export const getServiceColors = (serviceId) => {
	if (serviceId === "yego") {
		return {
			primary: "#08BAA5",
			secondary: "#006C5F",
			icon: "rgba(8, 186, 165, 1)",
			iconPressed: "rgba(8, 186, 165, 0.4)",
		};
	} else if (serviceId === "cooltra") {
		return {
			primary: "#01B3FF",
			secondary: "#006B99",
			icon: "rgba(1, 138, 255, 1)",
			iconPressed: "rgba(1, 138, 255,0.4)",
		};
	} else {
		return {
			primary: "#0058E2",
			secondary: "#003589",
			icon: "rgba(21, 110, 250, 1)",
			iconPressed: "rgba(21, 110, 250, 0.4)",
		};
	}
};

export const getBatteryColorAndDimension = (batteryLevel) => {
	if (batteryLevel === "low") {
		return {
			dimension: "3.78906",
			color: "#FF5733",
			path: "M7.5 10V14M21 13V11M6.2 18H16.8C17.9201 18 18.4802 18 18.908 17.782C19.2843 17.5903 19.5903 17.2843 19.782 16.908C20 16.4802 20 15.9201 20 14.8V9.2C20 8.0799 20 7.51984 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.4802 6 17.9201 6 16.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z",
		};
	} else if (batteryLevel === "medium") {
		return {
			dimension: "8.63281",
			color: "#FFA81C",
			path: "M7.5 10V14M11.5 10V14M21 13V11M6.2 18H16.8C17.9201 18 18.4802 18 18.908 17.782C19.2843 17.5903 19.5903 17.2843 19.782 16.908C20 16.4802 20 15.9201 20 14.8V9.2C20 8.0799 20 7.51984 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.4802 6 17.9201 6 16.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z",
		};
	} else {
		return {
			dimension: "16.3672",
			color: "#33FF4E",
			path: "M7.5 10V14M11.5 10V14M15.5 10V14M21 13V11M6.2 18H16.8C17.9201 18 18.4802 18 18.908 17.782C19.2843 17.5903 19.5903 17.2843 19.782 16.908C20 16.4802 20 15.9201 20 14.8V9.2C20 8.0799 20 7.51984 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.4802 6 17.9201 6 16.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z",
		};
	}
};

export const getAppStoreLinks = (serviceId) => {
	if (serviceId === "yego") {
		return "https://apps.apple.com/fr/app/yego-mobility/id1181020675";
	} else if (serviceId === "cooltra") {
		return "https://apps.apple.com/fr/app/cooltra-scooters-libre-service/id1083424977";
	} else {
		return "https://apps.apple.com/fr/app/cityscoot/id1011202160";
	}
};
