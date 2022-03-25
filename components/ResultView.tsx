/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import React, {FC} from "react";
import {StyleSheet, Text, View} from "react-native";
import {ResultRow} from "./ResultRow";

export interface ResultViewProps {
	words: string[];
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingBottom: 72,
		alignItems: "center"
	}
});

export const ResultView: FC<ResultViewProps> = props => {

	return <View style={styles.container}>
		{props.words.map((word, i) => {
			return <ResultRow word={word} key={i}/>
		})}
	</View>;

};