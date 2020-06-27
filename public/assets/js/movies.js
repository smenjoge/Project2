$(document).ready(function () {
    let movieImdbID;

    // Check local storage for history of recently searched movies. If found,
    // the movie posters will be displayed in the Search History section on HTML
    let movieLocalStorage = JSON.parse(localStorage.getItem("movies"));
    if (!movieLocalStorage) {
        movieLocalStorage =[];
    } else {
        displayHistory(); 
    };

    function displayHistory() {
        $(".search-history").removeClass("displayNone");
        $(".historyMovies .history").remove();
        for (let i=0; i < movieLocalStorage.length; i++ ) {
            let newCard = $(".historyCard").clone();
            newCard.removeClass("displayNone");
            newCard.removeClass("historyCard");
            newCard.addClass("history");
            newCard.find(".card-img-top").attr({src: movieLocalStorage[i].poster, alt:  movieLocalStorage[i].name})
            newCard.find("a").attr("href", "/review/" + movieLocalStorage[i].movieImdbID)
            $(".historyMovies").append(newCard);
        }
    }

    $(document).on("submit", ".searchMovie", async function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        $(".search-results").removeClass("displayNone");
        $(".recommended").addClass("displayNone");

        let movieSearch = $("#search-term").val().trim();
        
        // call GET route on server side, to get movie information from OMDB API
        $.get("/api/movie/" + movieSearch, function(movieDetails) {
            displayResult(movieDetails);
            movieImdbID = movieDetails.imdbID;
            addLocalStorage(movieDetails);
        });
        $("#search-term").val(" ");
    });

    // If local storage is not empty, use filter function to search if the movie
    // just searched is already in the local storage. If not, then only it will be added
    // to the local storage
    async function addLocalStorage(movieDetails) {
        let movieFound = [];

        if (movieLocalStorage.length > 0) {
            displayHistory(); 
            movieFound = await movieLocalStorage.filter(movie => movie.movieImdbID === movieDetails.imdbID);
        }; 
        if (movieFound.length === 0) {
            let movieObj = {
                name: movieDetails.Title,
                year: movieDetails.Year,
                genre: movieDetails.Genre,
                actors: movieDetails.Actors,
                plot: movieDetails.Plot,
                poster: movieDetails.Poster,
                movieImdbID: movieDetails.imdbID
            }
            movieLocalStorage.unshift(movieObj);
            if (movieLocalStorage.length > 5) { 
                movieLocalStorage.splice(movieLocalStorage.length-1, 1);
            }
            localStorage.setItem("movies", JSON.stringify(movieLocalStorage));
        }
    }
   
    // Function to display Movie info on html page
    function displayResult(omdbAPIResp) {
        $("#name").text(omdbAPIResp.Title);
        $("#year").text(omdbAPIResp.Year);
        $("#genre").text(omdbAPIResp.Genre);
        $("#actors").text(omdbAPIResp.Actors);
        $("#plot").text(omdbAPIResp.Plot);
        $("#poster").attr({src: omdbAPIResp.Poster, alt: omdbAPIResp.Title} );
    };

    // When user clicks Add Review Button
    $("#addReview").on("click", function (event) {
        event.preventDefault();

        // Make a newReview object
        var newReview = {
            movieImdbID: movieImdbID,
            review_title: $("#reviewTitle").val().trim(),
            review_text: $("#reviewText").val().trim()
        };

        // Send an AJAX POST-request with jQuery
        $.post("/api/reviews", newReview)
            // On success, run the following code
            .then(function (data) {
                window.location.replace("/review/" + movieImdbID);
            });
        $("#reviewTitle").val("");
        $("#reviewText").val("");
    });

    $("#viewReviews").on("click", function () {
        // Send an AJAX GET-request with jQuery
        $.get("/review/" + movieImdbID)
            // On success, run the following code
            .then(function (data) {
                console.log("reviews Page loaded");
            });
    });
});