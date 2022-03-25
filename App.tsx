/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import {KeyboardAvoidingView, Platform, StyleSheet, Text, View} from "react-native";
import {TopBar} from "./components/TopBar";
import {WordView} from "./components/WordView";
import { SafeAreaView } from "react-native-safe-area-context";
import {useCallback, useState} from "react";
import {ResultView} from "./components/ResultView";
import {getDayKey} from "./components/helpers";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    main: {
        flexGrow: 1,
        display: "flex",
        width: "100%"
    }
});

export default function App() {

    const [newWord, setNewWord] = useState("");
    const [words, setWords] = useState<string[]>([]);

    console.log(getDayKey());

    const handleNewWord = useCallback(() => {
        if (words.length >= 6) return;
        setWords([...words, newWord]);
        setNewWord("");
    }, [words, newWord]);

    return (
        <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
            <TopBar/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.main}
            >
                <WordView word={newWord} setWord={setNewWord} onDone={handleNewWord}/>
                <ResultView words={words}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}