/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import wordsData from "./words.json";
import {getDayKey} from "./helpers";
import dictionaryData from "./dictionary.json";

const words = wordsData as string[];
const wordCount = words.length;

const dictionaryList = dictionaryData as string[];
const dictionary = new Map<string, boolean>();
for (const w of dictionaryList) dictionary.set(w, true);

export function getWordForToday(): string {
	const dayKey = getDayKey();
	return words[dayKey % wordCount];
}

export function wordExists(word: string): boolean {
	return dictionary.has(word);
}