# 😛 Sentiment — javascript NLP tool for fast and simple sentiment analysis

[![npm version](https://badge.fury.io/js/nlp-sentiment.svg)](https://badge.fury.io/js/nlp-sentiment)
[![npm test & build](https://github.com/MarkusBansky/sentiment/actions/workflows/nodejs.yaml/badge.svg?branch=main)](https://github.com/MarkusBansky/sentiment/actions/workflows/nodejs.yaml)
[![codecov](https://codecov.io/gh/MarkusBansky/sentiment/branch/main/graph/badge.svg?token=M1BGVWCQX8)](https://codecov.io/gh/MarkusBansky/sentiment)
[![Known Vulnerabilities](https://snyk.io/test/github/MarkusBansky/sentiment/badge.svg)](https://snyk.io/test/github/MarkusBansky/sentiment)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MarkusBansky_sentiment&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=MarkusBansky_sentiment)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=MarkusBansky_sentiment&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=MarkusBansky_sentiment)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=MarkusBansky_sentiment)

This is a small and fast library for nlp sentiment analysis which supports any language, or any custom vocabulary.
It can also use intensifiers with positive or negative words adding more contrast.

Sentiment uses simple algorithms and basic optimisations to run these tasks in a fast and easy manner. It does not
have any dependencies or other libraries and is fully tested to give you confidence.

Test coverage is always kept at `> 99%`.

## Dev requirements

This project is targeting the `Node v18 LTS`. Target for `ts` is set to `ES3` to support all browsers with lower versions.

- Have `node` installed with at least `v18+`
- Install required packages with `npm ci`

## Installation

Installation is simple:

```shell
npm i nlp-sentiment
```

## Usage

You have access to all modules exported from the project, but in reality you probably need only one of them.

### Basic usage

Here is an example how to use this library in your project:

```js
// import it
import nlpSentiment from "nlp-sentiment";

// create a sentiment object with vocabulary
const sentiment = nlpSentiment()
  .withPositiveWords(["good", "brilliant", "amazing"])
  .withNegativeWords(["bad", "gross", "horrible"])
  .withIntensifierWords(["very"])
  .withNegationWords(["not"]);

// and now you are ready to use it for your sentences
const sentencesSentiment = sentiment.analyse([sentence]);
```

#### Interfaces

The input interfaces are:

```js
export interface Sentence {
  index: number;
  tokens: Token[];
}
```

and for token:

```js
export interface Token {
  index: number;
  lemma: string;

  depType?: string;
  depIndex?: number;
}
```

Then the output would be very similar:

```js
export interface SentenceResult extends Omit<Sentence, "tokens"> {
  tokens: TokenResult[];
  sentiment: number;
  attitude: "positive" | "negative";
}
```

and token is:

```js
export interface TokenResult extends Token {
  sentiment: number;
}
```

###### Note

This project has just been made public, thus the documentation will be updated soon to cover all the aspects.
