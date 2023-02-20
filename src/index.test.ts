import sentiment from "./index";
import * as analysis from "./analysis";
import * as vocabulary from "./vocabulary";
import { Sentence, SentenceResult } from "./types";

describe("index.ts", () => {
  describe("NLPSentiment", () => {
    const filename = "filename";
    const array = ["word1", "word2", "word3", "word4"];

    let fromFileSpy: jest.SpyInstance, fromWordsSpy: jest.SpyInstance;

    beforeEach(() => {
      fromFileSpy = jest
        .spyOn(vocabulary, "formVocabularyFromFile")
        .mockImplementation(() => ({}));
      fromWordsSpy = jest
        .spyOn(vocabulary, "formVocabularyFromWords")
        .mockImplementation(() => ({}));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("initialises with default empty vocabularies", () => {
      const analyseSpy = jest
        .spyOn(analysis, "analyseSentence")
        .mockImplementation(() => ({} as SentenceResult));

      const nlpSentiment = sentiment();
      nlpSentiment.analyse([{} as Sentence]);

      expect(analyseSpy).toBeCalledWith({}, {}, {}, {}, {});

      analyseSpy.mockClear();
    });

    it("initialises positive vocabulary from file", () => {
      const nlpSentiment = sentiment().withPositiveAsFile(filename);

      expect(fromFileSpy).toBeCalledWith(filename, 1);
    });

    it("initialises positive vocabulary from array", () => {
      const nlpSentiment = sentiment().withPositiveWords(array);

      expect(fromWordsSpy).toBeCalledWith(array, 1);
    });

    it("initialises negative vocabulary from file", () => {
      const nlpSentiment = sentiment().withNegativeAsFile(filename);

      expect(fromFileSpy).toBeCalledWith(filename, -1);
    });

    it("initialises negative vocabulary from array", () => {
      const nlpSentiment = sentiment().withNegativeWords(array);

      expect(fromWordsSpy).toBeCalledWith(array, -1);
    });

    it("initialises negation vocabulary from file", () => {
      const nlpSentiment = sentiment().withNegationAsFile(filename);

      expect(fromFileSpy).toBeCalledWith(filename, -1);
    });

    it("initialises negation vocabulary from array", () => {
      const nlpSentiment = sentiment().withNegationWords(array);

      expect(fromWordsSpy).toBeCalledWith(array, -1);
    });

    it("initialises intensifier vocabulary from file", () => {
      const nlpSentiment = sentiment().withIntensifierAsFile(filename);

      expect(fromFileSpy).toBeCalledWith(filename, 1.5);
    });

    it("initialises intensifier vocabulary from array", () => {
      const nlpSentiment = sentiment().withIntensifierWords(array);

      expect(fromWordsSpy).toBeCalledWith(array, 1.5);
    });
  });
});
