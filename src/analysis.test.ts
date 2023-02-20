import { formVocabularyFromWords } from "./vocabulary";
import { analyseSentence, itensify, negate } from "./analysis";
import { Token } from "./types";

const token = (lemma: string, index: number) => {
  return { index, lemma };
};

const sentence = (i: number, ...words: string[]) => {
  return { index: i, tokens: words.map(token) };
};

describe("analysis.ts", () => {
  describe("negate", () => {
    const neg = "not";
    const initial = 1;
    const voc = formVocabularyFromWords([neg], -1);
    const token = { index: 0, lemma: "token" } as Token;
    const tokens = [
      { index: 1, lemma: neg, depType: "advmod", depIndex: 0 } as Token,
      token,
    ];

    it("negate value when token conmtains a negation modifier", () => {
      const sent = negate(initial, token, voc, tokens);

      expect(sent).toEqual(initial * -1);
    });

    it("dont change sentiment if no negation modifier", () => {
      const sent = negate(initial, token, voc, [token]);

      expect(sent).toEqual(initial);
    });

    it("dont change sentiment if negation has different type", () => {
      const sent = negate(initial, token, voc, [
        token,
        { index: 1, lemma: neg, depType: "cc", depIndex: 0 },
      ]);

      expect(sent).toEqual(initial);
    });

    it("dont change sentiment if vocabulary not found", () => {
      const sent = negate(initial, token, voc, [
        token,
        { index: 1, lemma: "notnot", depType: "advmod", depIndex: 0 },
      ]);

      expect(sent).toEqual(initial);
    });

    it("dont change sentiment if missing dependency type on token", () => {
      const sent = negate(initial, token, voc, [
        token,
        { index: 1, lemma: neg, depIndex: 0 },
      ]);

      expect(sent).toEqual(initial);
    });
  });

  describe("itensify", () => {
    const intense = "very";
    const initial = 1;
    const voc = formVocabularyFromWords([intense], 1.5);
    const token = { index: 0, lemma: "token" } as Token;
    const tokens = [
      { index: 1, lemma: intense, depType: "advmod", depIndex: 0 } as Token,
      token,
    ];

    it("itensify value when token contains a negation modifier", () => {
      const sent = itensify(initial, token, voc, tokens);

      expect(sent).toEqual(initial * 1.5);
    });

    it("dont change sentiment if no negation modifier", () => {
      const sent = itensify(initial, token, voc, [token]);

      expect(sent).toEqual(initial);
    });

    it("dont change sentiment if negation has different type", () => {
      const sent = itensify(initial, token, voc, [
        token,
        { index: 1, lemma: intense, depType: "cc", depIndex: 0 },
      ]);

      expect(sent).toEqual(initial);
    });

    it("dont change sentiment if missing dependency type", () => {
      const sent = itensify(initial, token, voc, [
        token,
        { index: 1, lemma: intense, depIndex: 0 } as Token,
      ]);

      expect(sent).toEqual(initial);
    });
  });

  describe("analyseSentence", () => {
    const posVoc = formVocabularyFromWords(["pos1", "pos2", "pos3"], 1);
    const negVoc = formVocabularyFromWords(["neg1", "neg2", "neg3"], -1);
    const negateVoc = formVocabularyFromWords(["not"], -1);

    it("should return positive analysed result on normal sentence", () => {
      const s = sentence(0, "a", "pos1", "b", "c", "pos2", "neg1");

      const result = analyseSentence(s, posVoc, negVoc, {}, {});

      expect(result.attitude).toEqual("positive");
      expect(result.sentiment).toEqual(1);
    });

    it("should return negative result on sentence", () => {
      const s = sentence(0, "a", "neg2", "b", "c", "neg3", "d");

      const result = analyseSentence(s, posVoc, negVoc, {}, {});

      expect(result.attitude).toEqual("negative");
      expect(result.sentiment).toEqual(-2);
    });

    it("should negate positive token", () => {
      const s = sentence(0, "a", "neg1", "c", "e", "d");
      s.tokens = [
        ...s.tokens,
        { index: 5, lemma: "not", depType: "advmod", depIndex: 1 } as Token,
      ];

      const result = analyseSentence(s, posVoc, negVoc, {}, negateVoc);

      expect(result.attitude).toEqual("positive");
      expect(result.sentiment).toEqual(1);
    });
  });
});
