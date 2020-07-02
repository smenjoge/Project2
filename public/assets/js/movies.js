$(document).ready(function () {
    let movieImdbID;
    let recommendedMovieID;

    // Check local storage for history of recently searched movies. If found,
    // the movie posters will be displayed in the Search History section on HTML
    let movieLocalStorage = JSON.parse(localStorage.getItem("movies"));
    if (!movieLocalStorage) {
        movieLocalStorage = [];
    } else {
        displayHistory();
    };

    function displayHistory() {
        $(".search-history").removeClass("displayNone");
        $(".historyMovies .history").remove();
        for (let i = 0; i < movieLocalStorage.length; i++) {
            let newCard = $(".historyCard").clone();
            newCard.removeClass("displayNone");
            newCard.removeClass("historyCard");
            newCard.addClass("history");
            newCard.find(".card-img-top").attr({src: movieLocalStorage[i].poster, id: movieLocalStorage[i].movieImdbID, alt:  movieLocalStorage[i].name});
            $(".historyMovies").append(newCard);
        }
    }

    $(".history").on("click", function (event) {
        let movieIDtoSave = $(this).find("img").attr("id");
        redirectToReviews(movieIDtoSave);
    });

    $(document).on("submit", ".searchMovie", async function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        let movieSearch = $("#search-term").val().trim();

        // call GET route on server side, to get movie information from OMDB API
        $.get("/api/movie/" + movieSearch, function (movieDetails) {
            if (movieDetails.Response === "True") {
                $(".search-results").removeClass("displayNone");
                $(".recommended").addClass("displayNone");
                $("#errMsg").addClass("displayNone");
                displayResult(movieDetails);
                movieImdbID = movieDetails.imdbID;
                addLocalStorage(movieDetails);
            } else {
                $("#errMsg").removeClass("displayNone");
                $("#errMsg").text(movieDetails.Error);
            }
        });
        $("#search-term").val("");
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
                poster: movieDetails.Poster,
                movieImdbID: movieDetails.imdbID
            }
            movieLocalStorage.unshift(movieObj);
            if (movieLocalStorage.length > 5) {
                movieLocalStorage.splice(movieLocalStorage.length - 1, 1);
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
        $("#poster").attr({ src: omdbAPIResp.Poster, alt: omdbAPIResp.Title });
    };

    function displayMessage(message) {
        $("#msg").text(message);
    }

    function displayRecMessage(message) {
        $("#RecMsg").text(message);
    }

    // When user clicks Add Review Button
    $("#addReview").on("click", function (event) {
        event.preventDefault();

        // Make a newReview object
        var newReview = {
            MovieImdbID: movieImdbID,
            review_name: $("#userName").val().trim(),
            review_title: $("#reviewTitle").val().trim(),
            review_text: $("#reviewText").val().trim()
        };

        if (newReview.user_name === "") {
            displayMessage("Reviewer name cannot be blank");
        } else if (newReview.review_title === "") {
            displayMessage("Title cannot be blank");
        } else if (newReview.review_text === "") {
            displayMessage("Review cannot be blank");
        } else {
            // Send an AJAX POST-request with jQuery
            $.post("/api/reviews", newReview)
                .then(function () {
                    redirectToReviews(movieImdbID);
                });
            $("#userName").val("");
            $("#reviewTitle").val("");
            $("#reviewText").val("");
        }
    });

    $("#viewReviews").on("click", function () {
        redirectToReviews(movieImdbID);
    });

    function redirectToReviews(movieIDtoSave) {
        // Add movieIDtoSave to Local storage here. This Local storage value will be retrieved on reviews page. 
        localStorage.setItem("movieReview", movieIDtoSave);
        window.location.replace("review.html");
    };
    var url = $('.modal-body-music iframe').attr('src');

    $('.endVideo').click(function () {
        $('.modal-body-music').hide();
        $('.modal-body-music iframe').attr('src', '');
    });

    $('.endVideo').click(function () {
        $('.modal-body-music').show();
        $('.modal-body-music iframe').attr('src', url);
    });

    $('.videoBTN').on('click', function() {

        $("#my_iframe").attr("src", $(this).attr("data-video"));
        recommendedMovieID = $(this).attr("id");
        localStorage.setItem("movieReview", recommendedMovieID);
    }).on('hidden.bs.modal', function () {
        $(this).find('video')[0].pause();
    });

    $(".recommendedViewReviews").on("click", function (event) {
        event.preventDefault();
        redirectToReviews(recommendedMovieID);
    });

    $("#recommendedAddReview").on("click", function (event) {
        event.preventDefault();
        // Make a newReview object
        var recommendedNewReview = {
            MovieImdbID: recommendedMovieID,
            review_name: $("#recommendedUserName").val().trim(),
            review_title: $("#recommendedReviewTitle").val().trim(),
            review_text: $("#recommendedReviewText").val().trim()
        };

        if (recommendedNewReview.user_name === "") {
            displayMessage("Reviewer name cannot be blank");
        } else if (recommendedNewReview.review_title === "") {
            displayRecMessage("Title cannot be blank");
        } else if (recommendedNewReview.review_text === "") {
            displayRecMessage("Review cannot be blank");
        } else {

            // Send an AJAX POST-request with jQuery
            $.post("/api/reviews", recommendedNewReview)
                .then(function () {
                    window.location.replace("review.html");
            });
            $("#recommendedUserName").val("");
            $("#recommendedReviewTitle").val("");
            $("#recommendedReviewText").val("");
        }
    });
});