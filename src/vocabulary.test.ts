import * as fs from "fs";
import { formVocabularyFromWords, formVocabularyFromFile } from "./vocabulary";

jest.mock("fs");

describe("vocabulary.ts", () => {
  const val = 1;
  const word1 = "word1";
  const word2 = "word1";
  const word3 = "word1";

  describe("formVocabularyFromFile", () => {
    const file = "filename.txt";

    let fsMock: jest.SpyInstance,
      existMock: jest.SpyInstance,
      logSpy: jest.SpyInstance;

    beforeEach(() => {
      fsMock = jest
        .spyOn(fs, "readFileSync")
        .mockReturnValue([word1, word2, word3].join("\n"));
      existMock = jest.spyOn(fs, "existsSync").mockReturnValue(true);
      logSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls fs method to read file", () => {
      formVocabularyFromFile(file, val);

      expect(existMock).toBeCalled();
      expect(fsMock).toBeCalled();
    });

    it("builds voc from file content", () => {
      const voc = formVocabularyFromFile(file, val);

      expect(voc[word1]).toEqual(val);
      expect(voc[word2]).toEqual(val);
      expect(voc[word3]).toEqual(val);
    });

    it("returns empty vocabulary on empty file", () => {
      fsMock.mockReturnValue("");

      const voc = formVocabularyFromFile(file, val);

      expect(voc).toEqual({});
    });

    it("returns empty vocabulary on undefined filename", () => {
      const voc = formVocabularyFromFile(undefined as unknown as string, val);

      expect(voc).toEqual({});
    });

    it("returns empty when file does not exist", () => {
      existMock.mockReturnValue(false);

      const voc = formVocabularyFromFile(file, val);

      expect(voc).toEqual({});
    });

    it("logs error that file does not exist", () => {
      existMock.mockReturnValue(false);
      formVocabularyFromFile(file, val);

      expect(logSpy).toBeCalled();
    });

    it("return empty if value not present", () => {
      const voc = formVocabularyFromFile(file, undefined as unknown as number);

      expect(voc).toEqual({});
    });
  });

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
