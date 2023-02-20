import { analyseSentence } from "./analysis";
import { Vocabulary, Sentence, SentenceResult } from "./types";
import { formVocabularyFromFile, formVocabularyFromWords } from "./vocabulary";

class NlpSentiment {
  private _positiveVocabulary: Vocabulary;
  private _negativeVocabulary: Vocabulary;
  private _intensifierVocabulary: Vocabulary;
  private _negationVocabulary: Vocabulary;

  constructor() {
    this._positiveVocabulary = {};
    this._negativeVocabulary = {};
    this._intensifierVocabulary = {};
    this._negationVocabulary = {};
  }

  withPositiveWords(words: string[]): NlpSentiment {
    this._positiveVocabulary = formVocabularyFromWords(words, 1);
    return this;
  }

  withPositiveAsFile(filePath: string): NlpSentiment {
    this._positiveVocabulary = formVocabularyFromFile(filePath, 1);
    return this;
  }

  withNegativeWords(words: string[]): NlpSentiment {
    this._negativeVocabulary = formVocabularyFromWords(words, -1);
    return this;
  }

  withNegativeAsFile(filePath: string): NlpSentiment {
    this._negativeVocabulary = formVocabularyFromFile(filePath, -1);
    return this;
  }

  withIntensifierWords(words: string[]): NlpSentiment {
    this._intensifierVocabulary = formVocabularyFromWords(words, 1.5);
    return this;
  }

  withIntensifierAsFile(filePath: string): NlpSentiment {
    this._intensifierVocabulary = formVocabularyFromFile(filePath, 1.5);
    return this;
  }

  withNegationWords(words: string[]): NlpSentiment {
    this._negationVocabulary = formVocabularyFromWords(words, -1);
    return this;
  }

  withNegationAsFile(filePath: string): NlpSentiment {
    this._negationVocabulary = formVocabularyFromFile(filePath, -1);
    return this;
  }

  analyse(sentences: Sentence[]): SentenceResult[] {
    return sentences.map((s) =>
      analyseSentence(
        s,
        this._positiveVocabulary,
        this._negativeVocabulary,
        this._intensifierVocabulary,
        this._negationVocabulary
      )
    );
  }
}

export default () => new NlpSentiment();
