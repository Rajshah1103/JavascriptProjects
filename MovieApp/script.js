// flow of the project 
// api and fetching data
// function to populate the user side i.e populate the html 
// the title and ratings of the site should change according to the input from user 
// search the movie according to the search from the user 
// create a genre of movies which will show the movies according to the genre of the movie this can be done in the letter stages by recreating this app using React js which will make the work easy

const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});

/*
const apiURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgpath =  "https://image.tmdb.org/t/p/w1280";
const searchUrl = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


getMovies(apiURL)

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}

function showMovies(movies){
    main.innerHTML = "";
    movies.forEach((movie)=>{
        const {poster_path,title,vote_average,overview} = movie;
        const movieEL = document.createElement("div")
        movieEL.classList.add("movie")
   

    movieEL.innerHTML =`
    <img 
        src = "${imgpath+poster_path}"
        alt = "${title}"
    />
    <div class = "movie-info>
        <h3>${title}</h3>
        <span class = "${getClassByRate(vote_average)}"
        ${vote_average}
        </span>
    </div>
        <div class = "overview">
            <h3>"Overview"</h3>
            ${overview}
        </div>
    `;

     main.appendChild(movieEL);
    })
   
}

function getClassByRate(vote){
    if(vote>=8){
        return "green"
    }
    else if(vote>=5){
        return "orange"
    }
    else{
        return "red"
    }
}


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchterm = search.value;
    if(searchterm){
        getMovies(searchUrl+searchterm)
    }

    search.value = "";
})
*/
