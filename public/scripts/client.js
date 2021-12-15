/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const createTweetElement = function (tweetObj) {
    
    const user = tweetObj.user.name
    const pic = tweetObj.user.avatars;
    const handle = tweetObj.user.handle;
    const tweet = tweetObj.content.text;
    const time = timeago.format(tweetObj.created_at);
    
    const $tweet = $(`<article class="tweet">
    <div class="tweet-header">
    <div class="tweet-front">
    <div class="pic">${pic}</div>
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
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }

  const renderTweets = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      $("#tweets-container").append(createTweetElement(arr[i]));
    }
  }

  renderTweets(data);

//   // Test / driver code (temporary). Eventually will get this from the server.

// const $tweet = createTweetElement(tweetData);

// // // Test / driver code (temporary)
// // console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


})

  



