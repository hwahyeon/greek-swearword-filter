const defaultBadWords = require("./badwords.config.json");

class GreekFilter {
  constructor(options = {}) {
    this.badWords = new Set(options.customList || defaultBadWords);
    this.placeholder = options.placeholder || "*";
    this.updateRegex();
  }

  isOffensive(word) {
    return this.badWords.has(word.toLowerCase());
  }

  replaceWord(word) {
    return word.replace(/./g, this.placeholder);
  }

  filter(text) {
    return text.replace(this.regex, (match) => {
      return this.replaceWord(match);
    });
  }

  addWords(words) {
    if (!Array.isArray(words)) {
      words = [words];
    }

    words.forEach((word) => this.badWords.add(word.toLowerCase()));

    this.updateRegex();
  }

  removeWords(words) {
    if (!Array.isArray(words)) {
      words = [words];
    }

    words.forEach((word) => this.badWords.delete(word.toLowerCase()));
    this.updateRegex();
  }

  updateRegex() {
    this.regex = new RegExp([...this.badWords].join("|"), "gi");
  }
}

module.exports = GreekFilter;
