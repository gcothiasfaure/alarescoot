import { Marker } from "react-native-maps";
import Svg, { Path, Rect, Circle } from "react-native-svg";

import { getServiceColors, getBatteryColorAndDimension } from "../utils";

export default function ScootMarker({ scoot, pressMarker }) {
	return (
		<Marker
			// style={{ zIndex: 1000 }}
			identifier={"selected-" + scoot.id}
			key={"selected-" + scoot.id}
			onPress={() => {
				pressMarker(scoot.id);
			}}
			tracksViewChanges={false}
			coordinate={scoot.coords}
			stopPropagation={true}
		>
			<Svg width="35" height="35" viewBox="0 0 40 40" fill="none">
				<Circle
					cx="20"
					cy="20"
					r="20"
					fill={getServiceColors(scoot.operator.id).primary}
				/>
				<Circle
					cx="20"
					cy="20"
					r="19.2188"
					stroke={getServiceColors(scoot.operator.id).secondary}
					stroke-width="1.5625"
				/>
				<Path
					d="M16.5039 18.9014C15.5371 18.9014 14.7461 19.6924 14.7461 20.6592V24.2188C14.7461 25.1855 15.5371 25.9766 16.5039 25.9766C17.4707 25.9766 18.2617 25.1855 18.2617 24.2188V20.6592C18.2617 19.6924 17.4707 18.9014 16.5039 18.9014Z"
					fill="white"
				/>
				<Path
					d="M22.876 8.13477H19.4922C19.0967 6.86035 17.9102 5.9375 16.5039 5.9375C15.0976 5.9375 13.9111 6.86035 13.5156 8.13477H10.1758C9.69238 8.13477 9.29688 8.53027 9.29688 9.01367C9.29688 9.49707 9.69238 9.89258 10.1758 9.89258H13.5596C13.7793 10.6396 14.2627 11.2549 14.9219 11.6504C12.5488 12.3535 10.791 14.5508 10.791 17.1436V21.7578C10.791 22.5488 11.4502 23.208 12.2412 23.208H13.4277V20.7031C13.4277 18.9892 14.834 17.583 16.5479 17.583C18.2617 17.583 19.668 18.9893 19.668 20.7031V23.208H20.8545C21.6455 23.208 22.3047 22.5488 22.3047 21.7578V17.1875C22.3047 14.5947 20.5469 12.3535 18.1738 11.6943C18.833 11.2988 19.3164 10.6836 19.5361 9.93652H22.9199C23.4033 9.93652 23.7988 9.54102 23.7988 9.05762C23.7549 8.53027 23.3594 8.13477 22.876 8.13477ZM16.5039 10.8154C15.5371 10.8154 14.7461 10.0244 14.7461 9.05762C14.7461 8.09082 15.5371 7.2998 16.5039 7.2998C17.4707 7.2998 18.2617 8.09082 18.2617 9.05762C18.3057 10.0244 17.5146 10.8154 16.5039 10.8154Z"
					fill="white"
				/>
				<Rect
					x="24.8047"
					y="21.6797"
					width="2.92969"
					height="4.29688"
					fill="white"
				/>
				<Rect
					x="24.8047"
					y="11.6797"
					width="2.92969"
					height="8.55469"
					fill="white"
				/>
				<Rect
					x="24.8047"
					y="5.9375"
					width="2.92969"
					height="4.29688"
					fill="white"
				/>
				<Rect
					x="10.3516"
					y="27.6953"
					width="19.3359"
					height="5.78125"
					rx="2.89062"
					fill="white"
				/>
				<Rect
					x="11.8359"
					y="28.7109"
					width={getBatteryColorAndDimension(scoot.autonomy.level).dimension}
					height="3.78906"
					rx="1.89453"
					fill={getBatteryColorAndDimension(scoot.autonomy.level).color}
				/>
			</Svg>
		</Marker>
	);
}
