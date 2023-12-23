const defaultBadWords = require("./badwords.config.json");

/**
 * Removes Greek accents from a given word.
 * @param {string} word - The word from which accents will be removed.
 * @returns {string} The word with Greek accents removed.
 */
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

/**
 * Class representing a GreekFilter for text processing.
 * This class provides functionality to filter out inappropriate words
 * from a given text, handling Greek characters and accents.
 */
class GreekFilter {
  /**
   * Creates a GreekFilter.
   * @param {Object} options - Configuration options for the filter.
   * @param {Set<string>} [options.customList=defaultBadWords] - Custom list of bad words.
   * @param {string} [options.placeholder='*'] - The character used to replace filtered words.
   * @param {string} [options.filterStyle='all'] - Default style of filtering ('all', 'first', 'firstlast').
   */
  constructor(options = {}) {
    this.badWords = new Set(options.customList || defaultBadWords);
    this.placeholder = options.placeholder || "*";
    this.style = options.filterStyle || "all";
    this.updateRegex();
  }

  // isOffensive(word) {
  //   const wordWithoutAccents = removeAccents(word);
  //   return this.badWords.has(wordWithoutAccents.toLowerCase());
  // }

  /**
   * Replaces a word with placeholders based on the specified filtering style.
   * @param {string} word - The word to be replaced.
   * @param {string} style - The filtering style.
   * @returns {string} The word replaced with placeholders.
   */
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

  /**
   * Filters a given text based on the added words and the specified style.
   * @param {string} text - The text to be filtered.
   * @param {string} [style=this.style] - The style to be used for filtering.
   * @returns {string} The filtered text.
   */
  filter(text, style = this.style) {
    // Filter after comparing 'accent removed text' with the original
    const textWithoutAccents = text.split(" ").map(removeAccents).join(" ");
    let filteredText = text;

    textWithoutAccents.replace(this.regex, (match, offset) => {
      // Find and mask the corresponding part of the original text
      const originalTextMatch = text.substr(offset, match.length);
      const maskedText = this.replaceWord(originalTextMatch, style);
      filteredText = filteredText.replace(originalTextMatch, maskedText);
    });

    return filteredText;
  }

  /**
   * Adds words to the filter list.
   * @param {string|string[]} words - The word(s) to be added to the filter.
   */
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

  /**
   * Removes words from the filter list.
   * @param {string|string[]} words - The word(s) to be removed from the filter.
   */
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

  /**
   * Updates the internal regular expression based on the current list of bad words.
   */
  updateRegex() {
    this.regex = new RegExp([...this.badWords].join("|"), "gi");
  }
}

module.exports = GreekFilter;
