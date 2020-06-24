$(document).ready(function () {

  var reviewContainer = $(".review-container");
  $(document).on("click", "button.delete", handleReviewDelete);
  $(document).on("click", "button.edit", handleReviewEdit);
  var reviews;
  var reviewstoAdd = [];

    $(document).on("click", ".addReviewNoAdd", function () {

        $.get("/api/posts/:" + imdbID, function (data) {
            console.log("Reviews", data);
            reviews = data;
            if (!reviews || !reviews.length) {
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });

        function initializeRows() {
            reviewContainer.empty();
            for (var i = 0; i < reviews.length; i++) {
                reviewsToAdd.push(createNewRow(reviews[i]));
            }
            reviewContainer.append(reviewstoAdd);
        }

        function createNewRow(review) {
            var newReviewCard = $("<div>");
            newReviewCard.addClass("card");
            var newReviewCardHeading = $("<div>");
            newReviewCardHeading.addClass("card-header");
            var deleteBtn = $("<button>");
            deleteBtn.text("x");
            deleteBtn.addClass("delete btn btn-danger");
            var editBtn = $("<button>");
            editBtn.text("EDIT");
            editBtn.addClass("edit btn btn-default");
            var newReviewTitle = $("<h2>");
            var newReviewDate = $("<small>");
            var newReviewCategory = $("<h5>");
            newReviewCategory.text(review.review_text);
            newReviewCategory.css({
              float: "right",
              "font-weight": "700",
              "margin-top":
              "-15px"
            });
            var newReviewCardBody = $("<div>");
            newReviewCardBody.addClass("card-body");
            var newReviewBody = $("<p>");
            newReviewTitle.text(review.title + " ");
            newReviewBody.text(review.body);
            var formattedDate = new Date(review.createdAt);
            formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
            newReviewDate.text(formattedDate);
            newReviewTitle.append(newReviewDate);
            newReviewCardHeading.append(deleteBtn);
            newReviewCardHeading.append(editBtn);
            newReviewCardHeading.append(newReviewTitle);
            newReviewCardHeading.append(newReviewCategory);
            newReviewCardBody.append(newReviewBody);
            newReviewCard.append(newReviewCardHeading);
            newReviewCard.append(newReviewCardBody);
            newReviewCard.data("post", review);
            return newReviewCard;
          }

    });

});