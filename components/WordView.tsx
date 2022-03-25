/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import React, {FC, useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

export interface WordViewProps {
	word: string;
	setWord: (value: string) => void;
	onDone: () => void;
}

const styles = StyleSheet.create({
	container: {
		margin: 16,
		backgroundColor: "#222",
		borderRadius: 8,
		padding: 16,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline"
	},
	field: {
		fontSize: 18,
		color: "white"
	}
});

export const WordView: FC<WordViewProps> = props => {

	const {word, setWord, onDone} = props;

	return <View style={styles.container}>
		<TextInput
			placeholder={"Enter a word."}
			autoCapitalize={"none"}
			autoCompleteType={"off"}
			autoCorrect={false}
			style={styles.field}
			returnKeyType={"done"}
			onChangeText={setWord}
			value={word}
			autoFocus={true}
			keyboardAppearance={"dark"}
			blurOnSubmit={false}
			onSubmitEditing={onDone}
		/>
	</View>;

};