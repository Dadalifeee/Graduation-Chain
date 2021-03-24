var express = require('express');
var cors = require('cors')
var app = express();
server = require('http').createServer(app),
ent = require('ent') 
const Web3=require('web3');
app.use(express.static('public'));
app.use(cors())

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.get('/chat2', function (req, res) {
    res.sendfile(__dirname + '/Chat2.html');
  });

app.get('/contract', function (req,res){
  var contract;
  const web3= new Web3("http://localhost:7545"); //Les paramètres de connexion a ganache
  //l’adresse du contrat avec lequel vous comptez communiquer.
  var address="0xf82ad6b23B45C85bceF4c4af2dD391A872Cad6f7";
  //Se trouve dans /build/contracts/nomToken.json
  var abi=[];
  //L’adresse du créateur du contrat
  const contractOwner='0xB32Eb60271bB8967D49cbf0e910c8d0eC5F1a26aa5cF24800D2fA84d151D57D3'; 
  //const
  const dest='0x9F70627E03a8b33239cF3FA70D8981447dE66507';
  contract=new web3.eth.Contract(abi,address);
  //web3.eth.getAccounts().then(console.log);
  console.log('%capp.js line:31 web3.eth.getAccounts()', 'color: #007acc;', web3.eth.getAccounts());
  return web3.eth.getAccounts()
})
console.log('%capp.js line:34 http://localhost:8080', 'color: #007acc;');
server.listen(8080);