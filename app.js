import story from './data/story.js';

import { 
    lastChar, 
    firstChar, 
    fixEndings, 
    fixStarts, 
    usedUniqueWords 
} from './utils/helpers.js';


let overusedWords = ['really', 'very', 'basically'];
let unnecessaryWords = ['extremely', 'literally', 'actually'];

/*
const storyWords = story.split(' ');

const betterWords = storyWords.filter((word) => {
    return !unnecessaryWords.includes(word);
});
*/

const countSpecificWords = (words=[], specificWords = []) => {
    const cleaned = cleanWords(words);
    let bucket = {};
    let wordsList = [];

    for(const word of cleaned){
        if(specificWords.includes(word)){
            if(!wordsList.includes(word)){
                bucket[word] = 1;
                wordsList.push(word);
            } else {
                bucket[word] = bucket[word] + 1;
            }
        }
    };

    let output = [];

    // Printing message
    for(const [key, value] of Object.entries(bucket)){
        output.push({
            word: key,
            times: value
        });
    };

    return output;
    //Returning array
};

const countSentences = (story = '') => {
    const endings = [".","!","?"];
    let count = 0;
    story.forEach(word => {
        endings.includes(lastChar(word)) && count ++;
    })
    return count;
};

const cleanWords = (arr = []) => {
    const cleaned = arr.map( word => {
        let trimmedWord = cleanString(word);
        return trimmedWord.toLowerCase();
        }
    );
    return cleaned;
};

const cleanString = (str = '') => {
    const glyphs = [".","!","?","\,",":","'",'"'];
    let trimmedWord = str.trim();
    trimmedWord = trimmedWord.replace('-','');

    //Trimming out word endings characters
    if(glyphs.includes(lastChar(trimmedWord))){
        trimmedWord = fixEndings(trimmedWord, glyphs);
        }

    //Trimming out word beginning characters
    if(glyphs.includes(firstChar(trimmedWord))){
        trimmedWord = fixStarts(trimmedWord, glyphs);
        }

    return trimmedWord.toLowerCase();
};

const mostUsed = (words = []) => {
    const clean = cleanWords(words);
    const bucket = usedUniqueWords(clean);

    let rank = 0;
    let mostUsed = {
        word: "",
        times: ""
    };
    for(const [key, value] of Object.entries(bucket)){
        if(value > rank){
            mostUsed.word = key;
            mostUsed.times = value;
            rank = value;
        }
    }

    console.log(mostUsed);
    
};

const storyWords = (story = '') => {
    let words = story.split(' ');
    return words;
};

const carveOutWords = (words = [], unwantedWords = []) => {
    let originalBucket = [];
    let cleanedBucket = [];
    let bucket = [];

    words.forEach((word, index) => {
        originalBucket.push({
            word,
            index
        })
    });

    cleanedBucket = originalBucket.map((entry, index) => {
        let trimmedWord = cleanString(entry.word);
        return {
            word: trimmedWord,
            index
        }
    });

    let unwantedLowerCased = unwantedWords.map(word => word.toLowerCase());

    cleanedBucket.forEach((entry, index) => {
        !unwantedLowerCased.includes(entry.word) && bucket.push(originalBucket[index].word)
    });

   return bucket;
};

let baseStoryWords = storyWords(story);
//console.log(baseStoryWords.slice(0, 50).join(' '));

console.log(carveOutWords(baseStoryWords.slice(0,50), unnecessaryWords).join(' '));
