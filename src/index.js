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
    this.style = options.filterStyle || 'all';
    this.updateRegex();
  }

  isOffensive(word) {
    const wordWithoutAccents = removeAccents(word);
    return this.badWords.has(wordWithoutAccents.toLowerCase());
  }

  replaceWord(word, style) {
    switch (style) {
      case "all":
        return word.replace(/./g, this.placeholder);
      case "first":
        return word.charAt(0) + word.slice(1).replace(/./g, this.placeholder);
      case "firstlast":
        if (word.length > 2) {
          return (
            word.charAt(0) +
            word.slice(1, -1).replace(/./g, this.placeholder) +
            word.charAt(word.length - 1)
          );
        }
        return word.charAt(0) + word.slice(1).replace(/./g, this.placeholder);
      // default:
      //     throw new Error("");
    }
  }

  filter(text, style = this.style) {
    // 악센트 제거 텍스트와 원본 비교 후 필터링
    const textWithoutAccents = text.split(" ").map(removeAccents).join(" ");
    let filteredText = text;

    textWithoutAccents.replace(this.regex, (match, offset) => {
      // 원본 텍스트에서 해당 부분을 찾아 마스킹
      const originalTextMatch = text.substr(offset, match.length);
      const maskedText = this.replaceWord(originalTextMatch, style);
      filteredText = filteredText.replace(originalTextMatch, maskedText);
    });

    return filteredText;
  }

  addWords(words) {
    if (!Array.isArray(words)) {
      words = [words];
    }

    words.forEach((word) => {
      const wordAsString = String(word);
      const wordWithoutAccents = removeAccents(wordAsString);
      this.badWords.add(wordWithoutAccents.toLowerCase());
    });

    this.updateRegex();
  }

  removeWords(words) {
    if (!Array.isArray(words)) {
      words = [words];
    }

    words.forEach((word) => {
      const wordAsString = String(word);
      const wordWithoutAccents = removeAccents(wordAsString);
      this.badWords.delete(wordWithoutAccents.toLowerCase());
    });
    this.updateRegex();
  }

  updateRegex() {
    this.regex = new RegExp([...this.badWords].join("|"), "gi");
  }
}

module.exports = GreekFilter;
