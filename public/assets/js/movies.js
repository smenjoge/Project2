$(document).ready(function() {
    let movieImdbID;

    // let movieLocalStorage = JSON.parse(localStorage.getItem("movies"));
    // if (!movieLocalStorage) {
    //     movieLocalStorage =[];
    // }
    

    $(document).on("submit", ".searchMovie", async function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        let movieSearch = $("#search-term").val().trim();
        await getMovieDetails(movieSearch);
    });

    async function getMovieDetails(movieSearch) {
        $.get("/api/movie/" + movieSearch, function(movieDetails) {
            $("#name").text(movieDetails.Title);
            $("#year").text(movieDetails.Year);
            $("#genre").text(movieDetails.Genre);
            $("#actors").text(movieDetails.Actors);
            $("#plot").text(movieDetails.Plot);
            $("#poster").attr({src: movieDetails.Poster, alt: movieDetails.Title} );
            movieImdbID = movieDetails.imdbID;

            // let movieObj = {
            //     name: movieDetails.Title,
            //     year: movieDetails.Year,
            //     genre: movieDetails.Genre,
            //     actors: movieDetails.Actors,
            //     plot: movieDetails.Plot,
            //     poster: movieDetails.Poster,
            //     movieImdbID: movieDetails.imdbID
            // }
            // movieLocalStorage.unshift(movieObj);
            // if (movieLocalStorage.length > 10) { 
            //     movieLocalStorage.splice(movieLocalStorage.length-1, 1);
            //   }
            // localStorage.setItem("movies", JSON.stringify(movieLocalStorage));
        });
    };
   

    // When user clicks add-btn
    $("#addReview").on("click", function(event) {
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
        .then(function(data) {
            // Log the data we found
            console.log(data);

        });
        $("#reviewTitle").val("");
        $("#reviewText").val("");
    });   

});