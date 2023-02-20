export interface Vocabulary {
  [key: string]: number;
}

export interface Token {
  index: number;
  lemma: string;

  depType?: string;
  depIndex?: number;
}

export interface Sentence {
  index: number;
  tokens: Token[];
}

export interface TokenResult extends Token {
  sentiment: number;
}

export interface SentenceResult extends Omit<Sentence, "tokens"> {
  tokens: TokenResult[];
  sentiment: number;
  attitude: "positive" | "negative";
}

export type Analyse = (sentences: Sentence[]) => SentenceResult[];

export type NlpSentiment = (
  pathToPositiveVocabulary: string,
  pathToNegativeVocabulary: string,
  pathToIntensifierVocabulary?: string,
  pathToNegationVocabulary?: string
) => {
  analyse: Analyse;
};
