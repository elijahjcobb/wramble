/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import {AppState, KeyboardAvoidingView, Platform, StyleSheet, Text, View, Share} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TopBar} from "./components/TopBar";
import {WordView} from "./components/WordView";
import { SafeAreaView } from "react-native-safe-area-context";
import {useCallback, useEffect, useState} from "react";
import {ResultView} from "./components/ResultView";
import {getWordForToday, wordExists} from "./components/words";
import {getShareMessage, useAppState} from "./components/helpers";


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
    const [targetWord, setTargetWord] = useState(getWordForToday());
    const [enableEntry, setEnableEntry] = useState(true);
    const appState = useAppState();

    const fetchWords = useCallback(() => {
        AsyncStorage.getItem("words").then(r => {
            if (!r) return;
            setWords(r.split(";"));
        }).catch(console.error)
    }, []);

    const resetViewForNewDay = useCallback(() => {
        AsyncStorage.setItem("words", "").catch(console.error);
        setWords([])
        setNewWord("");
        setTargetWord(getWordForToday());
        setEnableEntry(true);
    }, []);

    const isPossible = useCallback((word: string): boolean => {
        let temp = targetWord.toLowerCase();
        for (const letter of word.toLowerCase()) {
            const i = temp.indexOf(letter);
            if (i !== -1) temp = temp.slice(0, i) + temp.slice(i + 1)
            else return false;
        }
        return true
    }, [targetWord]);

    const isWord = useCallback((word: string): boolean => {
        return wordExists(word);
    }, []);

    useEffect(() => {
        const word = getWordForToday();
        if (word !== targetWord) resetViewForNewDay()
        if (appState === "active") fetchWords();
    }, [appState])

    useEffect(() => {
        AsyncStorage.setItem("words", words.join(";")).catch(console.error);
        if (words.length === 6) {
            setEnableEntry(false);
            // handleShare();
        }
    }, [words])

    const handleNewWord = useCallback(() => {
        if (words.length >= 6) return;

        if (newWord === targetWord) {
            console.log("Nice try...");
            return;
        }

        if (words.indexOf(newWord) !== -1) {
            console.log("Word already exists");
            return;
        }

        if (!isWord(newWord)) {
            console.log("Not a word!");
            return;
        }

        if (!isPossible(newWord)) {
            console.log("Not a possible!");
            return;
        }

        setWords([...words, newWord]);
        setNewWord("");
    }, [words, newWord]);

    const handleShare = useCallback(() => {
        const message = getShareMessage(words);
        Share.share({message}).then().catch(console.error);
    }, [words]);

    return (
        <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
            <TopBar
                allowShare={!enableEntry}
                onShare={handleShare}
                targetWord={targetWord}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.main}
            >
                {enableEntry && <WordView word={newWord} setWord={setNewWord} onDone={handleNewWord}/>}
                <ResultView words={words}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}