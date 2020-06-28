$(document).ready(function () {

//   $(document).on("click", "button.deleteReview", handleReviewDelete);
//   $(document).on("click", "button.editReview", handleReviewEdit);

// Made it so the the last searched for movie will have its ID retreived from local storage
  let movieData = localStorage.getItem("movies");
  let parsed = JSON.parse(movieData)
  let objectWeNeed = parsed[0];
  console.log(objectWeNeed.movieImdbID);
  
  getReviews();

  function getReviews() {
    $.get("/api/reviews/" + movieImdbID, function (data) {
        renderReviewList(data);
    });
  }

  function renderReviewList(reviewData) {
    $("#movieTitle").text(reviewData[0].Title);
    $("#reviewImg").attr({src: reviewData[0].Poster, alt: reviewData[0].Title});
    let reviewsArr = reviewData[0].Reviews;
    for (i = 0; i < reviewsArr.length; i++) {
      let newDiv = $(".reviewCard").clone();
      newDiv.removeClass("displayNone");
      newDiv.removeClass("reviewCard");
      reviewTitle = reviewsArr[i].review_title;
      newDiv.find(".reviewTitle").text(reviewTitle);
      newDiv.find(".reviewText").text(reviewsArr[i].review_text);
      $(".reviewList").append(newDiv);
    };
  };



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
