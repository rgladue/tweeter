/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const getTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (err) {
        console.log("Error: ", err);
      },
    });
  };

  getTweets();

  const createTweetElement = function (tweetObj) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const user = tweetObj.user.name;
    const pic = tweetObj.user.avatars;
    const handle = tweetObj.user.handle;
    const tweet = tweetObj.content.text;
    const time = timeago.format(tweetObj.created_at);

    const $tweet = $(`<article class="tweet">
    <div class="tweet-header">
    <div class="tweet-front">
    <img src="${pic}">
    <div class="user">${user}</div>
    </div>
    <div class="handle">${handle}</div>
    </div>
    <div class="tweet-content">${escape(tweet)}</div>
    <footer class="tweet-footer">
    <div class="time">${time}</div>
    <div><i class="fa-solid fa-flag" id="flag"></i> <i class="fa-solid fa-retweet" id="retweet"></i> <i class="fa-solid fa-heart" id="heart"></i></div>
    </footer>
    </article>
    `);

    return $tweet;
  };

  const renderTweets = function (arr) {
    const $tweetContainer = $("#tweets-container");
    $tweetContainer.empty();
    for (const key of arr) {
      $tweetContainer.prepend(createTweetElement(key));
    }
  };

  const $form = $("#tweet-form");

  $form.on("submit", function (event) {
    const text = $("textarea").val();
    if (text.length === 0) {
      event.preventDefault();
      $(".empty-field").slideDown(1000);
      $(".empty-field").text("Error: Input field is empty!");
      $(".empty-field").css("color", "red");
      $(".empty-field").css("border", "5px solid red");
      return;
    } else if (text.length > 140) {
      event.preventDefault();
      $(".too-much-chars").slideDown(1000);
      $(".too-much-chars").text(
        "Error: Too many characters! (maximum length 140 characters)"
      );
      $(".too-much-chars").css("color", "red");
      $(".too-much-chars").css("border", "5px solid red");
      return;
    } else {
      event.preventDefault();
      $(".too-much-chars").slideUp();
      $(".empty-field").slideUp();
      const encodedData = $(this).serialize();

      $.post("/tweets", encodedData, (response) => {
        getTweets();
        $("textarea").val("");
        $('.counter').val(140);
      });
    }
  });

  $('#arrow').on('click', () => {
    $('textarea').focus();    

  })

});
