/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import React, {FC} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import { EvilIcons } from '@expo/vector-icons';

export interface TopBarProps {

}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingBottom: 8,
		paddingStart: 16,
		paddingTop: 32,
		paddingEnd: 16,
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#000",
		color: "#fff",
		borderBottomColor: "#111",
		borderBottomWidth: 1
	},
	title: {
		fontWeight: "bold",
		fontSize: 32,
		color: "#fff",
		textTransform: "lowercase"
	},
	icon: {
		width: 48,
		height: 48,
		borderRadius: 8
	}
});

export const TopBar: FC<TopBarProps> = props => {

	return <View style={styles.container}>
		<StatusBar style="light" />
		<Image style={styles.icon} source={require("../assets/wramble.png")}/>
		<Text style={styles.title}>octopus</Text>
		<TouchableOpacity
			onPress={() => {}}
		>
			<EvilIcons name="share-apple" size={36} color="dodgerblue" />
		</TouchableOpacity>
	</View>;

};