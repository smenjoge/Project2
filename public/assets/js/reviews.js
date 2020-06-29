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
    $("#reviewImg").attr({src: reviewData[0].Poster, alt: reviewData[0].Title});
    let reviewsArr = reviewData[0].Reviews;
    for (i = 0; i < reviewsArr.length; i++) {
      let newDiv = $(".reviewCard").clone();
      newDiv.removeClass("displayNone");
      newDiv.removeClass("reviewCard");
      reviewTitle = reviewsArr[i].review_title;
      // reviewsArr[i]
      // newDiv.find(".reviewText").prepend(`<button type="button" class="btn btn-outline-primary fa fa-thumbs-up" id="${}"></button>`);
      // newDiv.find(".reviewText").prepend(`<button type="button" class="btn btn-outline-primary fa fa-thumbs-down" id="${}"></button>`);
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


// $(".fa-thumbs-up").on("click", function () {
//   if (localStorage.clickcount) {
//     localStorage.clickcount = Number(localStorage.clickcount)+1;
//   } else {
//     localStorage.clickcount = 1;
//   }
//     $("#like").text(localStorage.clickcount);
// });


// $(".fa-thumbs-down").on("click", function () {
//   if (localStorage.clickcount) {
//     localStorage.clickcount = Number(localStorage.clickcount)-1;
//   } else {
//     localStorage.clickcount = 1;
//   }
//     $("#dislike").text(localStorage.clickcount);
// });

});
