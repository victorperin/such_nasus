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



var nasus = exec('tweet stream "nasus" --json');
showScreen("Reading 'nasus' tweets");
nasus.stdout.on('data', function(data) {
    var dados = JSON.parse(data);
    showScreen("@"+dados.user.screen_name+": "+dados.text);
    var textoAleatorio = textos[Math.floor(Math.random()*textos.length)];
    var comando = 'tweet new "@'+dados.user.screen_name+' '+textoAleatorio+'"';
    var newTweet = exec(comando);
    showScreen(comando);
    newTweet.stdout.on('data', function(nasusData) {
      showScreen(nasusData);
    });
    newTweet.stderr.on('data', function(data) {
      showScreen(data);
    });
});
nasus.on('close', function(code) {
  showScreen("stream 'nasus': "+code);
  if(code=="Parsing error:Easy there, Turbo. Too many requests recently. Enhance your calm."){
    setTimeout(function() {showScreen('Waiting twitter for a calm down...');}, 30000);
  }
  process.exit();
});
nasus.stderr.on('data', function(data) {
  showScreen("stream 'nasus': "+data);
});


var reply = exec('tweet stream "@such_nasus" --json');
showScreen("Reading '@such_nasus' tweets");
reply.stdout.on('data', function(data) {
    var dados = JSON.parse(data);
    showScreen("@"+dados.user.screen_name+": "+dados.text);
    var quoteAleatorio = nasus_quotes[Math.floor(Math.random()*nasus_quotes.length)];
    var comando = 'tweet new "@'+dados.user.screen_name+' '+quoteAleatorio+'"';
    var newTweet = exec(comando);
    showScreen(comando);
    newTweet.stdout.on('data', function(nasusData) {
      showScreen(nasusData);
    });
    newTweet.stderr.on('data', function(nasusData) {
      showScreen(nasusData);
    });
});
reply.on('close', function(code) {
  showScreen("stream '@such_nasus': "+code);
  if(code=="Parsing error:Easy there, Turbo. Too many requests recently. Enhance your calm."){
    setTimeout(function() {showScreen('Waiting twitter for a calm down...');}, 30000);
  }
  process.exit();
});
reply.stderr.on('data', function(data) {
  showScreen("stream '@such_nasus': "+data);
});

function showScreen(text){
  var date = new Date();
  var current_time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  console.log(current_time+"- "+text);
}
