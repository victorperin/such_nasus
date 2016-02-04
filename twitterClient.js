var configuration = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

var configuration = {
  consumer_key: '7TTyf7BCJylJiIcPzMtSJOTLJ',
  consumer_secret: 'mI2kmo8fs9cqIwLYZRlgzisSdMhZXJFZLdrNQoytBCceW5oTEL',
  access_token_key: '3293576481-BdDE4PiksYLXfPT8lHT8HeadeYiCsOemrmo9jNb',
  access_token_secret: '8yCyMaB7kavGogoYC6OKRiRF6bmuXfts1bPOjHACytBQD'
}

var Twitter = require('twitter');
var client = new Twitter(configuration);

exports.stream = function (word, callback){
  client.stream('statuses/filter', {track: word}, function(stream) {
    stream.on('data', function(tweet) {
      callback(undefined, tweet);
      console.log(tweet.user.screen_name+':',tweet.text);
    });

    stream.on('error', function(error) {
      callback(error, undefined);
    });
  });
}
