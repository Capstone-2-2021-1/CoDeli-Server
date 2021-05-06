
//caver.rpc.klay.getBlockByHash blockHash를 사용해 가장 최근의 블록 번호를 반환합니다.



const fs = require('fs')
var ejs=require('ejs');
const Caver = require('caver-js')

//const caver = new Caver('https://api.baobab.klaytn.net:8651')

const accessKeyId = "KASK3K7EXXGVKRUKEMJ1XKYT";
const secretAccessKey = "6SltZ3+YYad7HJYn38zHhoNAsua2s1d4oXk1ksST";
const chainId = 8217

const option = {

headers: [
  {name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')},
  {name: 'x-chain-id', value: 8217},
  ]
}

function Unix_timestamp(t){
  var date = new Date(t*1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth()+1);
  var day = "0" + date.getDate();
  var hour = "0" +date.getHours()
  var minute = "0" +date.getMinutes();
  var second = "0" + date.getSeconds();
  return year +"-"+month.substring(month.length-2,month.length) +"-"+day.substring(day.length-2,day.length) + " " + hour.substring(hour.length-2,hour.length)  +":" +minute.substring(minute.length-2,minute.length) + ":" + second.substring(second.length-2,second.length)
}
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));

const CaverExtKAS = require('caver-js-ext-kas')
const caverKAS = new CaverExtKAS()

caverKAS.initKASAPI(chainId, accessKeyId, secretAccessKey)

async function getBlock() {
  const blockNumber = await caver.rpc.klay.getBlockNumber()
  console.log(blockNumber)

  /*const query = {
    kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
    size: 1,
    range: '1593529200,1599145200',
    caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
  }*/
  const result = await caverKAS.kas.tokenHistory.getTransferHistoryByAccount('0xb78dEF84c88Cd50DCaff3D520dA2B5255044Fe09')
  console.log(result)
  var Max_index = 0;
  var Max_value = 0x0;
  for(var i = 0; i < result.items.length; i++){
    var temp_Var = result.items[i]
    if (temp_Var.transferType == 'klay'){
      const result_json = await caver.rpc.klay.getTransactionByHash(temp_Var.transactionHash);
      //console.log(result_json)
      //console.log(result_json.blockHash)
      const result_getBlockByHash = await caver.rpc.klay.getBlockByHash(result_json.blockHash)
      console.log("/////////////////////////////////////////////////////")
      console.log(result_getBlockByHash.timestamp)
      if(result_getBlockByHash.timestamp > Max_value){
        Max_index = i;
        Max_value = result_getBlockByHash.timestamp;
      }
      console.log(Unix_timestamp(result_getBlockByHash.timestamp));
    }
  }
    console.log("///////////////////");
    const result_data = await caver.rpc.klay.getTransactionByHash(result.items[Max_index].transactionHash);
    //console.log(result_json)
    //console.log(result_json.blockHash)
    const result_data_time = await caver.rpc.klay.getBlockByHash(result_data.blockHash)
    console.log("/////////////////////////////////////////////////////")
    console.log(Unix_timestamp(result_data_time.timestamp))

// see caver.klay.getTransaction)
}
getBlock()




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
  const query = {
    kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
    size: 1,
    range: '1593529200,1599145200',
    caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
}
const result = await caver.kas.tokenHistory.getTransferHistoryByAccount('0x697e67f7767558dcc8ffee7999e05807da45002d', query)
  //read file
  console.log(result)
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
        to: '0xb78dEF84c88Cd50DCaff3D520dA2B5255044Fe09', //cypass
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

app.get('/verification',function(request,response){
	//read file
	fs.readFile('template/change_pwd.html','utf8',function(error,data){
		response.send(data);
	});
});


app.post('/verification',function(request,response){
	//declare var
	var body=request.body;//user input
  //testFunction()
  response.send(testFunction(String(body.receiver)));
});

//testFunction()
