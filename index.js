var quotes = require('./quotes');
var twitterClient = require('./twitterClient');

twitterClient.stream('nasus,@such_nasus', function(error, tweet){
  if(error)
    return console.error(error);
  console.log(tweet.user.screen_name+':',tweet.text);
  var randomText = random(quotes);
  twitterClient.tweet(`@${tweet.user.screen_name} ${randomText}`, function(error, tweet){
    if(error)
      return console.error(error);
    return console.log('tweeted:',tweet.text);
  });
});

function random(array){
  return array[Math.floor(Math.random()*array.length)];
}
