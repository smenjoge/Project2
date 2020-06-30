$(document).ready(function () {

  //   $(document).on("click", "button.deleteReview", handleReviewDelete);
  //   $(document).on("click", "button.editReview", handleReviewEdit);

  // Made it so the the last searched for movie will have its ID retreived from local storage
  // let movieData = localStorage.getItem("movies");
  // let parsed = JSON.parse(movieData)
  // let objectWeNeed = parsed[0];
  // console.log(objectWeNeed.movieImdbID);
  var movieId = localStorage.getItem("movieReview")

  getReviews();

  function getReviews() {
    $.get("/api/reviews/" + movieId, function (data) {
      renderReviewList(data);
    });
  }

  function renderReviewList(reviewData) {
    $("#movieTitle").text(reviewData[0].Title);
    $("#reviewImg").attr({ src: reviewData[0].Poster, alt: reviewData[0].Title });
    let reviewsArr = reviewData[0].Reviews;
    for (i = 0; i < reviewsArr.length; i++) {
      let newDiv = $(".reviewCard").clone();
      newDiv.removeClass("displayNone");
      newDiv.removeClass("reviewCard");
      reviewTitle = reviewsArr[i].review_title;

      newDiv.attr("id", reviewsArr[i].id);
      newDiv(".reviewText").prepend(`<button type="button" class="btn btn-outline-primary fa fa-thumbs-up"></button>`);
      newDiv(".reviewText").prepend(`<button type="button" class="btn btn-outline-primary fa fa-thumbs-down"></button>`);

      newDiv.find(".reviewTitle").text(reviewTitle);
      newDiv.find(".reviewText").text(reviewsArr[i].review_text);
      $(".reviewList").append(newDiv);
    };
  };

  $(document).on("click", ".fa-thumbs-up", function (event) {
    var id = $(this).data("id");
    //parent id from whole review card//

    var newThumbsUp = review_rating++
     //double check grabbing review_rating
    console.log(newThumbsUp);
    
    // Send the PUT request.
    $.ajax("/reviews/" + id, {
      type: "PUT",
      data: JSON.stringify(newThumbsUp),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      location.reload();
    });
  });

  $(document).on("click", ".fa-thumbs-down", function (event) {
    var id = $(this).data("id");
    //parent id from whole review card//

    if (review_rating > 0) {
      var newThumbsDown = {
        review_rating: defaultValue--
      }; //double check
      console.log(newThumbsDown);

       // Send the PUT request.
    $.ajax("/reviews/" + id, {
      type: "PUT",
      data: JSON.stringify(newThumbsDown),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      location.reload();
    });
    }
  });


  //   function handleReviewEdit() {
  //     var 

  //   };

  //   function handleReviewDelete() {
  //     var id = $(this).data("id");
  //     $.ajax({
  //       method: "DELETE",
  //       url: "/api/reviews/" + id
  //     }).then(getReviews);
  //   };

});
