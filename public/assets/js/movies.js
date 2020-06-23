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
   
    // When user clicks add-btn
    $("#addReview").on("click", function(event) {
        event.preventDefault();
  
    // Make a newReview object
    var newReview = {
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