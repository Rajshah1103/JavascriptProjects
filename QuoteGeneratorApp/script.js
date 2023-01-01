const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

let apiQuotes =[];

function newQuote(){
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]

    // now lets check whether the authorspace is empty or not
    if(!quote.author){
        authorText.textContent = "";
    }
    else{
        authorText.content = quote.author;
    }
    // checking quote length to determine the styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

//  get Quotes from API 

async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    console.log(apiUrl)
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote();
        console.log(apiQuotes);
    } catch (error) {
        console.log("Error in fetching quote from api")
    }
}

// Tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
  }
  
  // Event Listeners
  newQuoteBtn.addEventListener('click', newQuote);
  twitterBtn.addEventListener('click', tweetQuote);
  
  // On Load
  getQuotes();

