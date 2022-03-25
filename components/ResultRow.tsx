/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import React, {FC} from "react";
import {StyleSheet, Text, View} from "react-native";
import {calculateScoreForWord} from "./helpers";

export interface ResultRowProps {
	word: string;
}

const styles = StyleSheet.create({
	container: {
		width: "45%",
		backgroundColor: "#333",
		borderRadius: 16,
		margin: 8,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		height: "30%",
		maxHeight: 100
	},
	word: {
		color: "white",
		fontSize: 28
	},
	score: {
		position: "absolute",
		backgroundColor: "dodgerblue",
		width: 22,
		height: 22,
		fontSize: 16,
		textAlign: "center",
		borderRadius: 11,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		bottom: 8,
		right: 8
	},
	scoreText: {
		color: "#fff"
	}
});

export const ResultRow: FC<ResultRowProps> = props => {

	return <View style={styles.container}>
		<Text style={styles.word}>{props.word}</Text>
		<View style={styles.score}>
			<Text style={styles.scoreText}>{calculateScoreForWord(props.word)}</Text>
		</View>
	</View>;

};