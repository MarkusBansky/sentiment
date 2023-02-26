import { Vocabulary } from "./types";

export const formVocabularyFromWords = (words: string[], value: number) => {
  if (!words || !value) {
    return {};
  }
  return words.reduce(
    (obj, word) => ({ ...obj, [word]: value }),
    {}
  ) as Vocabulary;
};
