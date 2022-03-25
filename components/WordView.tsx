/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import React, {FC, useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

export interface WordViewProps {
	onDone: (value: string) => void;
}

const styles = StyleSheet.create({
	container: {
		margin: 32,
		backgroundColor: "white",
		borderRadius: 8,
		padding: 16,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline"
	},
	field: {
		fontSize: 18
	}
});

export const WordView: FC<WordViewProps> = props => {

	const [word, setWord] = useState("");

	return <View style={styles.container}>
		<TextInput
			placeholder={"Enter a word."}
			autoCapitalize={"none"}
			autoCompleteType={"off"}
			autoCorrect={false}
			style={styles.field}
			returnKeyType={"done"}
			onChangeText={setWord}
			autoFocus={true}
			blurOnSubmit={false}
			onSubmitEditing={() => props.onDone(word)}
		/>
	</View>;

};