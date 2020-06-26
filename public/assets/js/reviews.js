$(document).ready(function () {

  $(document).on("click", "button.deleteReview", handleReviewDelete);
  $(document).on("click", "button.editReview", handleReviewEdit);
  let reviewT;
  let reviewAuth;

  getReviews();

  function getReviews() {
    $.get("/api/reviews", function (data) {
      renderReviewList(data);
    });
  }

  function renderReviewList(data) {
    for (i = 0; i < data.length; i++) {
      $(".displayNone").clone().removeClass("displayNone")
      reviewAuth = data[i].review_author;
      $(".reviewAuthor").text(reviewAuth);
      reviewT = data[i].review_text;
      $(".reviewText").text(reviewT);
    };

  };



  function handleReviewEdit() {
    var 

  };

  function handleReviewDelete() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/reviews/" + id
    }).then(getReviews);
  };

});
