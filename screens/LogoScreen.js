import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import RubyLogo from "../common/static/RubyLogo";

function LogoScreen(props) {
	useEffect(() => {
		fadeIn();
	}, []);

	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	};

	// const fadeOut = () => {
	//   // Will change fadeAnim value to 0 in 3 seconds
	//   Animated.timing(fadeAnim, {
	//     toValue: 0,
	//     duration: 3000,
	//   }).start();
	// };

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.logoBox,
					{
						opacity: fadeAnim,
					},
				]}
			>
				<RubyLogo />
				<Text style={styles.logoText}>ruby</Text>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#78123a",
		alignItems: "center",
		justifyContent: "center",
	},
	logoBox: {
		flex: 0.5,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#78123a",
	},
	logoText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 56,
	},
});

export default LogoScreen;
