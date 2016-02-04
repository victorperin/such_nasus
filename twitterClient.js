var configuration = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

var Twitter = require('twitter');
var client = new Twitter(configuration);

exports.stream = function (word, callback){
  client.stream('statuses/filter', {track: 'justin'}, function(stream) {
    stream.on('data', function(tweet) {
      callback(undefined, tweet);
      console.log(tweet.user.screen_name+':',tweet.text);
    });

    stream.on('error', function(error) {
      callback(error, undefined);
    });
  });
}
