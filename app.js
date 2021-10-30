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

const storyWords = story.split(' ');

const betterWords = storyWords.filter((word) => {
    return !unnecessaryWords.includes(word);
});

const countOverusedWords = (words=[]) => {
    const cleaned = cleanWords(words);
    let bucket = {};
    let overusedList = [];

    for(const word of cleaned){
        if(overusedWords.includes(word)){
            if(!overusedList.includes(word)){
                bucket[word] = 1;
                overusedList.push(word);
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

    console.log(output)
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
    const glyphs = [".","!","?","\,",":","'",'"'];
    const cleaned = arr.map( word => {
        let trimmedWord = word.trim();
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
        }
    );
    return cleaned;
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


countOverusedWords(storyWords);
mostUsed(storyWords);
console.log(countSentences(storyWords));