//the array of quotes, add more if you want
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
//store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
//the starting time
let startTime = Date.now();
//page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');


document.getElementById('start').addEventListener('click', () => {
    //get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    //put the quotes into an array of words
    words = quote.split(' ');
    //reset the word index for tracking
    wordIndex = 0;

    //UI updates
    //create an array of span elements so we can set up a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    //convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    //highligh the first word
    quoteElement.childNodes[0].className = 'highLight';
    //clear any prior messages
    messageElement.innerText = '';

    //set up the textbox
    //clear the textbox
    typedValueElement.value = '';
    //set focus
    typedValueElement.focus();
    //set event handler

    //start the timer
    startTime = new Date().getTime();

});

typedValueElement.addEventListener('input', () => {
    //get the current word
    const currentWord = words[wordIndex];
    //get the current value
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        //end of sentence
        //display success
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGTATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
    }   else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        //end of word
        //clear the trypedvalueelement for the new word
        typedValueElement.value = '';
        //move to next word
        wordIndex++;
        //reset the class name for all elemenets in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        //highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        //currently correct
        //highlight the next word
        typedValueElement.className = '';
    } else {
        //error state
        typedValueElement.className = 'error';
    }
});
