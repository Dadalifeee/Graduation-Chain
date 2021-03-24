var express = require('express');
var cors = require('cors')
var app = express();
server = require('http').createServer(app),
ent = require('ent') 
const Web3=require('web3');
app.use(express.static('public'));
app.use(cors())
var Contract = require('web3-eth-contract');
const tc = require('truffle-contract')

var contract;
const web3= new Web3("http://localhost:7545"); //Les paramètres de connexion a ganache
//l’adresse du contrat avec lequel vous comptez communiquer.
var address="0xf82ad6b23B45C85bceF4c4af2dD391A872Cad6f7";
//Se trouve dans /build/contracts/nomToken.json
var abi=[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "documentHash",
        "type": "bytes32"
      }
    ],
    "name": "ProofCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "documentHash",
        "type": "bytes32"
      }
    ],
    "name": "notarizeHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "documentHash",
        "type": "bytes32"
      }
    ],
    "name": "doesProofExist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
//L’adresse du créateur du contrat
const contractOwner='0xB32Eb60271bB8967D49cbf0e910c8d0eC5F1a26aa5cF24800D2fA84d151D57D3'; 
//const
const dest='0x9F70627E03a8b33239cF3FA70D8981447dE66507';
//web3.eth.getAccounts().then(console.log);
//web3.eth.contract(abi).at(address);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.get('/chat2', function (req, res) {
    res.sendfile(__dirname + '/Chat2.html');
  });

app.get('/api/account', function (req,res){
  web3.eth.getAccounts().then((reponses) =>{
    console.log('%capp.js line:53 reponses', 'color: #007acc;', reponses);
    res.send(reponses)
  })
})

app.get('/api/getTransaction/:id', function (req, res) {
  web3.eth.getTransaction(req.params.id).then((reponses) =>{
    console.log('%capp.js line:53 reponses', 'color: #007acc;', reponses);
    res.send(reponses)
  });
});

app.get('/api/pushDoc', function (req,res){
  contract.notarizeHash(123, 456)
})

console.log('%capp.js line:34 http://localhost:8080', 'color: #007acc;');
server.listen(8080);