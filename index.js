var exec = require('child_process').exec;

var textos = ["q?","Q?"];
var nasus_quotes = [
"Who let the dogs out? Woof. Woof. Woof.",
"No, I will not fetch the ball.",
"My bite is worse than my bark.",
"The cycle of life and death continues. We will live, they will die.",
"Do not try my patience.",
"Life is part of a cycle. Yours is over.",
"Your soul will be measured.",
"Return to the dust."
];



var child = exec('tweet stream "nasus" --json');
console.log("Reading 'nasus' tweets");
child.stdout.on('data', function(data) {
    var dados = JSON.parse(data);
    console.log("@"+dados.user.screen_name+": "+dados.text);
    var textoAleatorio = textos[Math.floor(Math.random()*textos.length)];
    var comando = 'tweet new "@'+dados.user.screen_name+' '+textoAleatorio+'"';
    var newTweet = exec(comando);
    console.log(comando);
    newTweet.stdout.on('data', function(nasusData) {
      console.log(nasusData);
    });
});

var reply = exec('tweet stream "@such_nasus" --json');
console.log("Reading '@such_nasus' tweets");
reply.stdout.on('data', function(data) {
    var dados = JSON.parse(data);
    console.log("@"+dados.user.screen_name+": "+dados.text);
    var quoteAleatorio = nasus_quotes[Math.floor(Math.random()*nasus_quotes.length)];
    var comando = 'tweet new "@'+dados.user.screen_name+' '+quoteAleatorio+'"';
    var newTweet = exec(comando);
    console.log(comando);
    newTweet.stdout.on('data', function(nasusData) {
      console.log(nasusData);
    });
    newTweet.stderr.on('data', function(nasusData) {
      console.log(nasusData);
    });
});
