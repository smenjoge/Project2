$(document).ready(function() {


    $(document).on("submit", ".searchMovie", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        let movieSearch = $("#search-term").val().trim();

        $.get("/api/movie/" + movieSearch, function(data) {
            movieDetails = data[0];
            $("#name").text(movieDetails.Title);
            $("#year").text(movieDetails.Year);
            $("#poster").attr({src: movieDetails.Poster, alt: movieDetails.Title} );
        });
    
       
    });
   


});