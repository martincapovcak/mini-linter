const lastChar = str => {
    return str.charAt(str.length - 1)
};

const firstChar = str => {
    return str[0]
};

const trimLastChar = str => {
    return str.slice(0, str.length - 1)
};

const trimFirstChar = str => {
    return str.slice(1)
};

const cleanBackslashN = str => {
    return str.replace('\n','')
};

// Trim endings recursion
const fixEndings = (str, arr) => {
    let newStr = str;
    newStr = trimLastChar(newStr);
    if(arr.includes(lastChar(newStr))){
        newStr = fixEndings(newStr, arr);
    }
    return newStr;
};

// Trim starts recursion
const fixStarts = (str, arr) => {
    let newStr = str;
    newStr = trimFirstChar(newStr);
    if(arr.includes(firstChar(newStr))){
        newStr = fixStarts(newStr, arr);
    }
    return newStr;
};

const usedUniqueWords = (words = []) => {
    let bucket = {};
    let uniqueWords = [];
    for(const word of words){
        if(!uniqueWords.includes(word)){
            uniqueWords.push(word);
            bucket[word] = 1;
        } else {
            bucket[word] = bucket[word] + 1;
        }
    }
    return bucket
};

export  {
    lastChar,
    firstChar,
    trimLastChar,
    cleanBackslashN,
    fixEndings,
    fixStarts,
    usedUniqueWords
}