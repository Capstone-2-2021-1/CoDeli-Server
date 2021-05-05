const fs = require('fs')
var ejs=require('ejs');
const Caver = require('caver-js')
//const caver = new Caver('https://api.baobab.klaytn.net:8651')

const accessKeyId = "KASK3K7EXXGVKRUKEMJ1XKYT";
const secretAccessKey = "6SltZ3+YYad7HJYn38zHhoNAsua2s1d4oXk1ksST";

const option = {

headers: [
  {name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')},
  {name: 'x-chain-id', value: 8217},
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));


//const caver = new Caver('http://localhost:8651')
var express=require('express');

var bodyParser =require('body-parser');
var app=express();
app.use(express.json());

var HTTP_PORT = 52273;

//const keystore0 = fs.readFileSync('api_key/babob/1213Parkyu@/keystore.json', 'utf8')
const keystore0 = fs.readFileSync('api_key/main/keystore.json', 'utf8')
// Decrypt keystore
const keyring0 = caver.wallet.keyring.decrypt(keystore0, '1213Parkyu@')

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get('/',async function(request,response){
  var string_test = await caver.klay.getBalance('0x697e67f7767558dcc8ffee7999e05807da45002d')
  //read file
  console.log(string_test)
	//read file
	fs.readFile('login.html','utf8',function(error,data){
		response.send(string_test);
	});
});

app.post('/',function(request,response){
	//declare var
	var body=request.body;
/*
  const query ='select * from account where pwd=' + String(body.pwd);
  db.serialize();
  db.each(query);
*/

	db.get('select * from account where pwd=?',body.pwd,function(error,row){
    //console.log(row);
    if(row==null){
			response.redirect('/');
		}
		else{
			//results.flush();
			response.redirect('/list');
		}
	});

});


app.get('/sendKlay',function(request,response){
	//read file
	fs.readFile('template/change_pwd.html','utf8',function(error,data){
		response.send(data);
	});
});

app.post('/sendKlay',function(request,response){
	//declare var
	var body=request.body;//user input
  //testFunction()
  response.send(testFunction(String(body.receiver)));

});


async function testFunction(receiver) {
    // Read keystore json file

    //console.log(keyring0)

    //const keyring1 = caver.wallet.keyring.decrypt(keystore1, '9051parkyu@')
    //console.log(keyring1)

    // Add to caver.wallet
    caver.wallet.add(keyring0)
    //caver.wallet.add(keyring1)

    // Create value transfer transaction
    const vt = new caver.transaction.valueTransfer({
        from: keyring0.address,
        to: '0x697e67f7767558dcc8ffee7999e05807da45002d', //cypass
        //to: '0x9a6e2a9dce1e3c8a8c5ec62a4cf428a465d1c7e9',
        value: caver.utils.convertToPeb('0.01', 'KLAY'),
        gas: 25000,
    })

    // Sign to the transaction
    const signed = await caver.wallet.sign(keyring0.address, vt)

    // Send transaction to the Klaytn blockchain platform (Klaytn)
    const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
    return receipt
}

//testFunction()
