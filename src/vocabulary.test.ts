import { formVocabularyFromWords } from "./vocabulary";

jest.mock("fs");

describe("vocabulary.ts", () => {
  const val = 1;
  const word1 = "word1";
  const word2 = "word1";
  const word3 = "word1";

  describe("formVocabularyFromWords", () => {
    it("builds voc from array of words", () => {
      const voc = formVocabularyFromWords([word1, word2, word3], 1);

      expect(voc[word1]).toEqual(val);
      expect(voc[word2]).toEqual(val);
      expect(voc[word3]).toEqual(val);
    });

    it("returns empty vocabulary on empty array", () => {
      const voc = formVocabularyFromWords([], 1);

      expect(voc).toEqual({});
    });

    it("returns empty vocabulary on undefined array", () => {
      const voc = formVocabularyFromWords(undefined as unknown as string[], 1);

      expect(voc).toEqual({});
    });

    it("set's the right number for vocabulary words", () => {
      const val = 123;
      const word = "word";
      const voc = formVocabularyFromWords([word], val);

      expect(voc[word]).toEqual(val);
    });

    it("return empty if value not present", () => {
      const voc = formVocabularyFromWords(
        [word1, word2, word3],
        undefined as unknown as number
      );

      expect(voc).toEqual({});
    });
  });
});
