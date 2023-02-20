import * as fs from "fs";
import { Vocabulary } from "./types";

export const formVocabularyFromFile = (pathToFile: string, value: number) => {
  if (!pathToFile || !value) {
    return {};
  }
  if (!fs.existsSync("foo.txt")) {
    console.error(`File "${pathToFile}" does not exist`);
    return {};
  }
  const text = fs.readFileSync(pathToFile);
  const textByLine = text.toString().split("\n");
  return textByLine.reduce((obj, word) => {
    if (word.length > 0) {
      return { ...obj, [word]: value };
    }
    return obj;
  }, {}) as Vocabulary;
};

export const formVocabularyFromWords = (words: string[], value: number) => {
  if (!words || !value) {
    return {};
  }
  return words.reduce(
    (obj, word) => ({ ...obj, [word]: value }),
    {}
  ) as Vocabulary;
};
