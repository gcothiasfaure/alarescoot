import localFont from "next/font/local";
import "./globals.css";

const geistFont = localFont({
	src: [
		{ path: "./fonts/Geist-Bold.otf", style: "bold" },
		{ path: "./fonts/Geist-Regular.otf", style: "normal" },
	],
});

export const metadata = {
	title: "Alarescoot",
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body className={geistFont.className}>{children}</body>
		</html>
	);
}
