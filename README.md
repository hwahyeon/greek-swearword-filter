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

## License
This project is provided under the MIT License.
