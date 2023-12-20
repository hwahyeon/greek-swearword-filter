# greek-swearword-filter
- Βιβλιοθήκη JavaScript για φιλτράρισμα βρισιών στα ελληνικά.
- JavaScript library to filter Greek swear words

## Installation
```bash
npm install greek-swearword-filter
```
## Usage
```javascript
const GreekFilter = require('greek-swearword-filter');

const filter = new GreekFilter(); 
filter.filter("Σκατά στα μούτρα σου ρε σούργελο!");
// ***** στα μούτρα σου ρε ********!
```
OR
```javascript
import GreekFilter from 'greek-swearword-filter';

const filter = new GreekFilter();
filter.filter("Σκατά στα μούτρα σου ρε σούργελο!");
// ***** στα μούτρα σου ρε ********!
```

### Placeholder
```javascript
const filter = new GreekFilter();

filter.placeholder =  '-';
filter.filter("Είναι μεγάλο αρχίδι ο προϊστάμενος.");
// Είναι μεγάλο ------ ο προϊστάμενος.

filter.placeholder =  'x';
filter.filter("Είναι μεγάλο αρχίδι ο προϊστάμενος.");
// Είναι μεγάλο xxxxxx ο προϊστάμενος.
```

### Style
```javascript
const filter = new GreekFilter();

filter.filter("μαλάκας") // *******
filter.filter("μαλάκας", style = 'all') // *******
filter.filter("μαλάκας", style = 'first') // μ******
filter.filter("μαλάκας", style = 'firstlast') // μ*****ς
```

```javascript
filter.filter("μαλάκας", 'firstlast') // μ*****ς
```

### Add your word/words to the list
```javascript
filter.filter("μηλο"); // μηλο

filter.addWords("μηλο");

filter.filter("μηλο"); // ****
```

```javascript
filter.filter("λεμονι, πορτοκαλι, πεπονι"); // λεμονι, πορτοκαλι, πεπονι

filter.addWords(["λεμονι",  "πορτοκαλι",  "πεπονι"]);

filter.filter("λεμονι, πορτοκαλι, πεπονι"); // ******, *********, ******
```

### Remove any word/words you want from the list
```javascript
filter.removeWords("Σκατά")

filter.filter("Σκατά στα μούτρα σου ρε σούργελο!"); // Σκατά στα μούτρα σου ρε ********!
```
```javascript
filter.removeWords(["Σκατά",  "σούργελο"])

filter.filter("Σκατά στα μούτρα σου ρε σούργελο!"); // Σκατά στα μούτρα σου ρε σούργελο!
```

## API
The `GreekFilter` class offers various methods for text filtering. Below are detailed descriptions of its main methods:

### Constructor
#### `GreekFilter(options)`
- Description: Creates an instance of the `GreekFilter` class.
- Parameters:
  - `options`: Object, specifying the filtering options.
    - `placeholder`: String (optional), the character used to replace filtered words.
    - `filterStyle`: String (optional), the default style of filtering ('all', 'first', 'firstlast').
- Usage:
```javascript
const filter = new GreekFilter({ placeholder: '*', filteringStyle: 'all' });
```

### Methods
#### `addWords(words)`
- Description: Adds words to the filtering list.
- Parameters:
  - `words`: String or array of strings, the words to be filtered.
- Usage:
```javascript
filter.addWords(["badword1", "badword2"]);
```
#### `removeWords(words)`
- Description: Removes words from the filtering list.
- Parameters:
  - `words`: String or array of strings, the words to be removed.
- Usage:
```javascript
filter.removeWords(["badword1", "badword2"]);
```

#### `filter(text, style)`
- Description: Filters the given text according to the specified style.
- Parameters:
  - `text`: String, the text to be filtered.
  - `style`: String (optional), the style of filtering ('all', 'first', 'ends').
- Usage:
```javascript
const filteredText = filter.filter("This is a test sentence.", 'first');
```

#### `replaceWord(word, style)`
- Description: Filters an individual word according to the specified style.
- Parameters:
  - `word`: String, the word to be filtered.
  - `style`: String, the style of filtering.
- Usage:
```javascript
const maskedWord = filter.replaceWord("badword", 'ends');
```

## License
This project is provided under the MIT License.
