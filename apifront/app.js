var express = require('express');
var cors = require('cors')
var app = express();
server = require('http').createServer(app),
ent = require('ent')
const Web3 = require('web3');
const { abi } = require('../Truffle/build/contracts/ProofDiploma.json');
app.use(express.static('public'));
app.use(cors())

var contract;
const web3 = new Web3("http://localhost:7545"); //Les paramètres de connexion a ganache
//l’adresse du contrat avec lequel vous comptez communiquer.
var address = "0xC55d8797544DEA1d8C69eB2DCd4fb81481412FFf";
//Se trouve dans /build/contracts/nomToken.json
//L’adresse du créateur du contrat
const contractOwner = '0xB32Eb60271bB8967D49cbf0e910c8d0eC5F1a26aa5cF24800D2fA84d151D57D3';
//const
const dest = '0x9F70627E03a8b33239cF3FA70D8981447dE66507';
//web3.eth.getAccounts().then(console.log);
contract = new web3.eth.Contract(abi, address);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});


app.get('/api/account', function (req, res) {
  web3.eth.getAccounts().then((reponses) => {
    console.log('%capp.js line:53 reponses', 'color: #007acc;', reponses);
    res.send(reponses)
  })
});

app.get('/api/getTransaction/:id', function (req, res) {
  web3.eth.getTransaction(req.params.id).then((reponses) => {
    console.log('%capp.js line:53 reponses', 'color: #007acc;', reponses);
    res.send(reponses)
  });
});

app.get('/api/returnContract', function (req, res) {
  //contract.notarizeHash(123, 456)
  res.send(contract)
});

app.get('/api/getContract', function (req, res) {
  var getData = contract.methods.create_item('DiplomeCDP', "123456789").call();
  // finally pass this data parameter to send Transaction
  res.send(web3.eth.sendTransaction({ to: address, from: '0xCd5f24964698BaFd04B9edA6A316878465F0476a', data: getData }));
});

app.get('/api/test', function (req, res) {
  contract.methods.myFunction().call().then((response)=> {console.log(response)})
  contract.methods.myFunction().call().then((response)=>{
   res.send(response)
   }).catch((error)=>{
     res.send(error)
   })
});


console.log('%capp.js line:34 http://localhost:8080', 'color: #007acc;');
server.listen(8080);