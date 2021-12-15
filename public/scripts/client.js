/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


  const getTweets = () => {

    $.ajax({

      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (err) {
        console.log("Error: ", err)
      }
    });
  };

  getTweets();



  
  const createTweetElement = function (tweetObj) {
    
    const user = tweetObj.user.name
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
    <div class="tweet-content">${tweet}</div>
    <footer class="tweet-footer">
    <div class="time">${time}</div>
    <div><i class="fa-solid fa-flag" id="flag"></i> <i class="fa-solid fa-retweet" id="retweet"></i> <i class="fa-solid fa-heart" id="heart"></i></div>
    </footer>
    </article>
    `);
    
    return $tweet;
    
    
  };
 

  const renderTweets = function (arr) {
    const $tweetContainer = $('#tweets-container');
    $tweetContainer.empty();
    for (const key of arr) {
      $tweetContainer.prepend(createTweetElement(key));
    }
  }

  


  const $form = $('#tweet-form');

  $form.on("submit", function(event) {
    const text = $('textarea').val();
    if (text.length === 0) {
      event.preventDefault();
      return alert('Input field is empty!!');
    }
    else if(text.length > 140) {
      event.preventDefault();
      return alert('Tweet has too many characters!!');
    } else {
      event.preventDefault();
      const serializedData = $(this).serialize();
  
      console.log("*********",serializedData);
  
      $.post('/tweets', serializedData, (response) => {
        getTweets()
  
      })
    }


  })
    





})

  



