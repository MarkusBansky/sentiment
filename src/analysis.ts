import { Token, Sentence, Vocabulary, SentenceResult } from "./types";

const DEPDENDENCY_TYPES_MODIFIER = [
  "acl",
  "acl:relcl",
  "advcl",
  "advmod",
  "advmod:emph",
  "advmod:lmod",
  "amod",
  "appos",
];

export const analyseSentence = (
  sentence: Sentence,
  p: Vocabulary,
  n: Vocabulary,
  i: Vocabulary,
  neg: Vocabulary
): SentenceResult => {
  const tokens = sentence.tokens.map((t) => {
    let sentiment = p[t.lemma] ?? n[t.lemma] ?? 0;
    if (sentiment != 0) {
      sentiment = itensify(sentiment, t, i, sentence.tokens);
      sentiment = negate(sentiment, t, neg, sentence.tokens);
    }
    return { ...t, sentiment };
  });
  const sentiment = tokens.map((t) => t.sentiment).reduce((o, s) => o + s, 0);
  const attitude = sentiment < 0 ? "negative" : "positive";
  return { ...sentence, sentiment, attitude, tokens };
};

export const itensify = (
  sent: number,
  t: Token,
  voc: Vocabulary,
  arr: Token[]
): number => {
  const modifiers = arr.filter(
    (a) =>
      a.depIndex == t.index &&
      DEPDENDENCY_TYPES_MODIFIER.includes(a.depType ?? "") &&
      voc[a.lemma] != null
  );
  if (modifiers.length == 0) {
    return sent;
  }
  const mod = modifiers.map((m) => voc[m.lemma]).reduce((a, b) => a + b, 0);
  return sent * mod;
};

export const negate = (
  sent: number,
  t: Token,
  voc: Vocabulary,
  arr: Token[]
): number => {
  const modifiers = arr.filter(
    (a) =>
      a.depIndex == t.index &&
      DEPDENDENCY_TYPES_MODIFIER.includes(a.depType ?? "") &&
      voc[a.lemma] != null
  );
  if (modifiers.length == 0) {
    return sent;
  }
  return sent * -1;
};
