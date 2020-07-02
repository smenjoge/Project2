$(document).ready(function () {

  //   $(document).on("click", "button.deleteReview", handleReviewDelete);
  //   $(document).on("click", "button.editReview", handleReviewEdit);

  let movieId = localStorage.getItem("movieReview");
  
  getReviews();

  function getReviews() {
    $.get("/api/reviews/" + movieId, function (data) {
      renderReviewList(data);
    });
  };

  function renderReviewList(reviewData) {
    $("#movieTitle").text(reviewData[0].Title);
    $("#reviewImg").attr({ src: reviewData[0].Poster, alt: reviewData[0].Title });
    let reviewsArr = reviewData[0].Reviews;
    for (i = 0; i < reviewsArr.length; i++) {
      let newDiv = $(".reviewCard").clone();
      newDiv.removeClass("displayNone");
      newDiv.removeClass("reviewCard");
      newDiv.attr("id", reviewsArr[i].id);
      newDiv.find(".reviewTitle").text(reviewsArr[i].review_title);
      newDiv.find(".reviewText").text(reviewsArr[i].review_text);
      if (reviewsArr[i].review_rating != 0) {
      newDiv.find(".count").text(reviewsArr[i].review_rating);
      };
      $(".reviewList").append(newDiv);
    };
  };

  $(document).on("click", ".fa-thumbs-up", function (event) {
    var id = $(this).parent().parent().attr("id");
    //parent id from whole review card//

    //double check grabbing review_rating
    
    // Send the PUT request.
    $.ajax("/api/reviews/" + id, {
      type: "PUT",
      data: {up: true}
    }).then(function () {
      location.reload();
    });
  });

  function displayMessage(message) {
    $("#msg").text(message);
  }

  $("#addReview").on("click", function (event) {
    event.preventDefault();

    // Make a newReview object
    let newReview = {
        MovieImdbID: movieId,
        user_name: $("#userName").val().trim(),
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
              window.location.reload();
            });
        $("#userName").val("");
        $("#reviewTitle").val("");
        $("#reviewText").val("");
    }
  });

  $(document).on("click", "button.deleteReview", function(event){
  // $(".deleteReview").on("click", function(event){
    //Get ID of the review that needs to be deleted. 
    let reviewIDDel = $(this).parent().parent().attr("id");
    $.ajax({
      method: "DELETE",
      url: "/api/reviews/" + reviewIDDel
    })
      .then(function () {
              window.location.reload();
          });
  });

  $(document).on("click", ".fa-thumbs-down", function (event) {
    var id = $(this).parent().parent().attr("id");
    //parent id from whole review card//

    //double check grabbing review_rating
    
    // Send the PUT request.
    $.ajax("/api/reviews/" + id, {
      type: "PUT",
      data: {down: true}
    }).then(function () {
      location.reload();
    });

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
