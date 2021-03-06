var express = require('express');
var cors = require('cors')
var app = express();
server = require('http').createServer(app),
ent = require('ent')
const Web3 = require('web3');
const { abi } = require('../Truffle/build/contracts/ProofDiploma.json');
app.use(express.static('public'));
app.use(cors())


const web3 = new Web3("http://localhost:7545"); //Les paramètres de connexion a ganache
//l’adresse du contrat avec lequel vous comptez communiquer.
let address = "0x0788687FFCB9cA754e8b293acb20C697a60D1E42";
//L’adresse du créateur du contrat
var contractOwner = '';
//const
const dest = '0x9F70627E03a8b33239cF3FA70D8981447dE66507';
//web3.eth.getAccounts().then(console.log);
let contract = new web3.eth.Contract(abi, address);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.get('/team', function (req, res) {
  res.sendfile('ekip.html');
});

app.get('/upload', function (req, res) {
  res.sendfile('upload.html');
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

app.post('/api/addDiploma/:name/:hash', function (req, res) {
  contract.methods.create_item(req.params.name, req.params.hash).send({from: contractOwner, gasLimit:'6721975'}).then((response)=>{
    res.send(response)
  }).catch((error)=>{
    res.send(error)
  })
});

app.get('/api/checkDiploma/:hash', function (req, res) {
  contract.methods.item_present(req.params.hash).call().then((response)=>{
    res.send(response)
  }).catch((error)=>{
    res.send("error")
  })
});

app.get('/api/getauth/:address', function (req, res) {
  contractOwner = req.params.address
  res.send(contractOwner)
});

console.log('%capp.js line:34 http://localhost:8080', 'color: #007acc;');
server.listen(8080);

// var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
//   from: '0x1234567890123456789012345678901234567891', // default from address
//   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });