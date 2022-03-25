/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 */

import {StyleSheet, Text, View} from "react-native";
import {TopBar} from "./components/TopBar";
import {WordView} from "./components/WordView";
import { SafeAreaView } from "react-native-safe-area-context";
import {useFonts} from "expo-font";
import {useState} from "react";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    view: {
        flexGrow: 1,
        display: "flex",
        backgroundColor: "#f8f8f8",
        width: "100%"
    }
});

export default function App() {

    const [s, setS] = useState("Hello, world!");

    return (
        <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
            <TopBar/>
            <View style={styles.view}>
                <WordView onDone={setS}/>
                <Text>{s}</Text>
            </View>
        </SafeAreaView>
    );

}