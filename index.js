var exec = require('child_process').exec;

var textos = ["q?", "q", "Que?","ke?"];



var child = exec('tweet stream "nasus" --json');
child.stdout.on('data', function(data) {
    //console.log('stdout: ' + data);
    var dados = JSON.parse(data);
    console.log("@"+dados.user.screen_name+": "+dados.text);
    var textoAleatorio = textos[Math.floor(Math.random()*textos.length)];
    var comando = 'tweet new "@'+dados.user.screen_name+' '+textoAleatorio+'"';
    var nasusData = exec(comando);
    console.log(comando);
    child.stdout.on('data', function(nasusData) {
      console.log(nasusData);
    });
});
