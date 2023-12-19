const defaultBadWords = require("./badwords.config.json");

function removeAccents(word) {
  const accentMappings = {
    ά: "α",
    έ: "ε",
    ή: "η",
    ί: "ι",
    ό: "ο",
    ύ: "υ",
    ώ: "ω",
    Ά: "Α",
    Έ: "Ε",
    Ή: "Η",
    Ί: "Ι",
    Ό: "Ο",
    Ύ: "Υ",
    Ώ: "Ω",
  };

  return word
    .split("")
    .map((char) => accentMappings[char] || char)
    .join("");
}

class GreekFilter {
  constructor(options = {}) {
    this.badWords = new Set(options.customList || defaultBadWords);
    this.placeholder = options.placeholder || "*";
    this.updateRegex();
  }

  isOffensive(word) {
    const wordWithoutAccents = removeAccents(word);
    return this.badWords.has(wordWithoutAccents.toLowerCase());
  }

  replaceWord(word, style) {
    switch (style) {
      case 'all':
          return word.replace(/./g, this.placeholder);
      case 'first':
          return word.charAt(0) + word.slice(1).replace(/./g, this.placeholder);
      case 'firstlast':
          if (word.length > 2) {
              return word.charAt(0) + word.slice(1, -1).replace(/./g, this.placeholder) + word.charAt(word.length - 1);
          }
          return word.charAt(0) + word.slice(1).replace(/./g, this.placeholder);
      // default:
      //     throw new Error("");
    }
  }

  filter(text, style = 'all') {
    const textWithoutAccents = text.split(" ").map(removeAccents).join(" ");

    return textWithoutAccents.replace(this.regex, (match) => {
      return this.replaceWord(match, style);
    });
  }

  addWords(words) {
    if (!Array.isArray(words)) {
      words = [words];
    }

    words.forEach((word) => {
      const wordWithoutAccents = removeAccents(word);
      this.badWords.add(wordWithoutAccents.toLowerCase());
    });

    this.updateRegex();
  }

  removeWords(words) {
    if (!Array.isArray(words)) {
      words = [words];
    }

    words.forEach((word) => {
      const wordWithoutAccents = removeAccents(word);
      this.badWords.delete(wordWithoutAccents.toLowerCase());
    });
    this.updateRegex();
  }

  updateRegex() {
    this.regex = new RegExp([...this.badWords].join("|"), "gi");
  }
}

module.exports = GreekFilter;
