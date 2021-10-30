import { lastChar, firstChar, fixEndings, fixStarts, usedWords } from './utils/helpers.js';

let story = `
Last weekend, I took literally the most beautiful 
bike ride of my life. The route is called "The 9W to Nyack" 
and it actually stretches all the way from Riverside Park 
in Manhattan to South Nyack, New Jersey. It\'s really an adventure 
from beginning to end! It is a 48 mile loop and it basically 
took me an entire day. I stopped at Riverbank State Park 
to take some extremely artsy photos. It was a short stop, 
though, because I had a really long way left to go. 
After a quick photo op at the very popular Little Red Lighthouse, 
I began my trek across the George Washington Bridge into New Jersey.  
The GW is actually very long - 4,760 feet! I was already very tired 
by the time I got to the other side.  An hour later, I reached 
Greenbrook Nature Sanctuary, an extremely beautiful park along the 
coast of the Hudson.  Something that was very surprising to me was 
that near the end of the route you actually cross back into New York! 
At this point, you are very close to the end.
`;

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
    const bucket = usedWords(clean);

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