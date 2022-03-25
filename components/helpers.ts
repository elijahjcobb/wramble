/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */
import {useEffect, useRef, useState} from "react";
import {AppState, AppStateStatus} from "react-native";

function scoreForLetter(letter: string): number {

	const scores = {
		a: 8.2,
		b: 1.5,
		c: 2.7,
		d: 4.7,
		e: 13,
		f: 2.2,
		g: 2,
		h: 6.2,
		i: 6.9,
		j: 0.16,
		k: 0.81,
		l: 4,
		m: 2.7,
		n: 6.7,
		o: 7.8,
		p: 1.9,
		q: 0.11,
		r: 5.9,
		t: 6.2,
		u: 9.6,
		v: 2.7,
		w: 0.97,
		x: 0.15,
		y: 2,
		z: 0.078,
	}

	// @ts-ignore
	const freq: number | undefined = scores[letter.toLowerCase()];
	if (!freq) return 0;
	const inv = 13 - freq;
	return Math.ceil(inv) + 1
}

export function calculateScoreForWord(word: string): number {
	let score = 0;
	for (const letter of word) score += scoreForLetter(letter);
	return score
}

export function getWrambleDay(): number {
	const start = new Date("3/25/22");
	const now = new Date();
	const ms = now.getDate() - start.getDate();
	return Math.ceil(ms / 1000 / 60 / 60 / 24) + 1;
}

export function getShareMessage(words: string[]): string {
	let rows = [];
	let totalScore = 0;
	for (const word of words) {
		let wordX = ""
		const wordScore = calculateScoreForWord(word);
		for (let i = 0; i < word.length; i++) wordX += " ? ";
		totalScore += wordScore;
		rows.push(`${wordScore} pts - ${wordX}`)
	}
	let msg = `Wramble ${getWrambleDay()}  -  ${totalScore}pts\n\n`;
	msg += rows.join("\n");
	return msg;
}

export function getDayKey(): number {
	const today = new Date();
	const month = today.getMonth() + 1
	const day = today.getDate()
	const year = today.getFullYear()
	return parseInt(month + "" + day + "" + year);
}

export function useAppState(): AppStateStatus {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	const _handleAppStateChange = (nextAppState: AppStateStatus) => {
		appState.current = nextAppState;
		setAppStateVisible(appState.current);
	}

	useEffect(() => {
		AppState.addEventListener("change", _handleAppStateChange);
		return () => {
			AppState.removeEventListener("change", _handleAppStateChange);
		};
	}, []);

	return appStateVisible;
}
