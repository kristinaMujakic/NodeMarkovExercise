/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== ""); //['the', 'cat', 'in', 'the', 'hat']
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      if (!chains[word]) {
        chains[word] = [];
      }
      if (this.words[i + 1]) {
        chains[word].push(this.words[i + 1]);
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let words = Object.keys(this.chains);
    let idx = Math.floor(Math.random() * words.length);
    let currentWord = words[idx];
    let text = [currentWord];

    while (text.length < numWords) {
      let possibleNextWords = this.chains[currentWord];
      if (!possibleNextWords || possibleNextWords.length === 0) {
        break;
      }
      let nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      text.push(nextWord);
      currentWord = nextWord;
    }

    return text.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};