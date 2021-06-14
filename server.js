
//caver.rpc.klay.getBlockByHash blockHash를 사용해 가장 최근의 블록 번호를 반환합니다.
const request = require("request");
const fs = require('fs')
const Caver = require('caver-js')
const firebase  = require("firebase");
var crypto = require('crypto');
var moment = require('moment');
var express=require('express');
var bodyParser =require('body-parser');
const CaverExtKAS = require('caver-js-ext-kas')
//const caver = new Caver('https://api.baobab.klaytn.net:8651')

const accessKeyId = "KASK3K7EXXGVKRUKEMJ1XKYT";
const secretAccessKey = "6SltZ3+YYad7HJYn38zHhoNAsua2s1d4oXk1ksST";
const chainId = 8217

const firebaseConfig = {
  apiKey: "AIzaSyAzNazd_ktknXEQndsmmtWUP7WbeVSe1S0",
  authDomain: "codeli.firebaseapp.com",
  databaseURL: "https://codeli-default-rtdb.firebaseio.com",
  projectId: "codeli",
  storageBucket: "codeli.appspot.com",
  messagingSenderId: "574116505872",
  appId: "1:574116505872:web:472e495c0b38e39df49d95",
  measurementId: "G-XC30SPW44K"
};

 firebase.initializeApp(firebaseConfig);

 // Get a reference to the database service
 var database = firebase.database();
var db = firebase.firestore();
//https://codeli-default-rtdb.firebaseio.com/


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
  const result_json = await caver.rpc.klay.getTransactionByHash('0x838723ab250bb0b76a143815c8c9d7b121bdb0b2ad550434447b2d08088ef67d');
  console.log(parseInt(result_json.value,16)/1000000000000000000)

  /*
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
        Max_value = result_getBlockpm install deg2radByHash.timestamp;
      }
      console.log(Unix_timestamp(result_getBlockByHash.timestamp));
    }
  }
  */
    //console.log("///////////////////");
    //const result_data = await caver.rpc.klay.getTransactionByHash(result.items[Max_index].transactionHash);
    //console.log(result_json)
    //console.log(result_json.blockHash)
    //const result_data_time = await caver.rpc.klay.getBlockByHash(result_data.blockHash)
    console.log("/////////////////////////////////////////////////////")
    //console.log(Unix_timestamp(result_data_time.timestamp))

// see caver.klay.getTransaction)
}
//getBlock()


//const caver = new Caver('http://localhost:8651')

var app=express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('./static'));

var HTTP_PORT = 52274;

//const keystore0 = fs.readFileSync('api_key/babob/1213Parkyu@/keystore.json', 'utf8')
const keystore0 = fs.readFileSync('api_key/main/keystore.json', 'utf8')
// Decrypt keystore
const keyring0 = caver.wallet.keyring.decrypt(keystore0, '1213Parkyu@')
caver.wallet.add(keyring0)
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get('/',async function(request,response){

  var string_test = await caver.klay.getBalance('0x697e67f7767558dcc8ffee7999e05807da45002d')
/*
  const query = {
    kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
    size: 1,
    range: '1593529200,1599145200',
    caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
}
*/
const result = await caverKAS.kas.tokenHistory.getTransferHistoryByAccount('0x697e67f7767558dcc8ffee7999e05807da45002d')
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
/*
app.get('/verification',function(request,response){
  data = 'testdata'
  if (data != ''){
      latest = data
    qrCode.toDataURL(latest, {
        errorCorrectionLevel:'H'
    }, (err, url) => {
        response.render('home', { data:url })
    });
}else{
    response.render('home', { data:'' });
}
*/







	//read file
  /*
	fs.readFile('template/change_pwd.html','utf8',function(error,data){
		response.send(data);
	});
  */





////////////////////////////////////////////////////////////////////////////////////////////

//QRCODE-Verification

/*
commentsRef.on('child_changed', (data) => {
  var temp_data = data.val()
  if(data.val().verification.trigger == true){
    temp_data.verification.trigger = false
    console.log(temp_data.partitions['bohyun'])
    for(iter_data in data.val().partitions){
      temp_data.partitions[iter_data].verification = crypto.createHash('sha512').update(temp_data.partitions[iter_data].UID +  new Date().getTime() + data.key).digest('base64')
      //console.log(temp_data.status)
      //console.log(temp_data.menu_price)

      //firebase.database().ref('Chat/'+data.key + '/partitions/' +temp_data ).set({
      //  'verification': 'test',
      //});

    }
  }
  console.log(temp_data.verification)
  firebase.database().ref('Chat/'+data.key).set(temp_data);
  //console.log(data.key, data.val().verification, data.val().author);
});



app.get('/verification/:id2',(request,response) => {
  data = request.params.id2
  console.log(request.params);
  if (data != ''){
      latest = data
      qrCode.toDataURL(latest, {
          errorCorrectionLevel:'H'
      }, (err, url) => {
        response.render('home', { data:url })
      });
}else{
    response.render('home', { data:'' });
 }
});




*/




////////////////////////////////////////////////////////////////////////////////////////////
var commentsRef = firebase.database().ref('Chat/');

commentsRef.on('child_added', (data) => {
  if(typeof data.val().verification == "undefined"){
    verification_first_data = {
      'trigger' : false
    }

    var temp_data = data.toJSON()
    temp_data.verification = verification_first_data

    firebase.database().ref('Chat/'+data.key).set(temp_data)
  }

  //console.log(temp_data)
  //console.log(typeof data.val());
});



timeObject = new Object()
sendCheckObject = new Object()
commentsRef.on('child_changed', async (data) => {
  var temp_data = data.val()
  const threshold = 0.05

  var location_gps = await getLocationGps(data.key)
  console.log('destination location: ', location_gps)
  for(iter_data in data.val().partitions){
      var temp_distance = getDistance(temp_data.partitions[iter_data].x, temp_data.partitions[iter_data].y, location_gps.x, location_gps.y)
      console.log(temp_data.partitions[iter_data].id +' distance from destination: ',temp_distance)
      if (isNaN(temp_distance)){
        console.log(temp_data.partitions[iter_data].id +' distance not ready')
        temp_data.partitions[iter_data].location_verification_status = false
        continue
      }
      if (temp_distance > threshold){
        console.log(temp_data.partitions[iter_data].id +' distance not ready')
        temp_data.partitions[iter_data].location_verification_status = false
      }
      else{
          console.log(temp_data.partitions[iter_data].id +' distance ready')
          temp_data.partitions[iter_data].location_verification_status = true
     }
     if(typeof data.val().partitions[iter_data].sendToManager != "undefined" && typeof data.val().partitions[iter_data].verification_status != "undefined"){
       if (data.val().partitions[iter_data].verification_status == true && data.val().partitions[iter_data].sendToManager == false){
         var temp_klay_by_hash = await getSendingKlayByHash(temp_data.partitions[iter_data].tx_hash)
         console.log('verification success, amount_of_klay:',temp_klay_by_hash)
         await sendKlay(temp_data.verification.room_manager_wallet,String(temp_klay_by_hash))
         temp_data.partitions[iter_data].sendToManager = true
       }
     }
  }
  firebase.database().ref('Chat/'+data.key).set(temp_data);

  var verification_status = true
  if(typeof data.val().appointmentTime != "undefined"){
    timeObject[data.key] = data.val().appointmentTime
    console.log('add time in server', timeObject[data.key])
  }
  if(typeof data.val().verification.trigger != "undefined" && data.val().verification.trigger == true){
    temp_data.verification.trigger = false
    var amount_of_klay = 0.0
    var location_gps = await getLocationGps(data.key)
    console.log('destination location: ', location_gps)
    for(iter_data in data.val().partitions){
      if(temp_data.partitions[iter_data].sendingStatus != "success" || temp_data.partitions[iter_data].verification_status != true || temp_data.partitions[iter_data].location_verification_status != true){
        console.log(temp_data.partitions[iter_data].id +' not ready',temp_data.partitions[iter_data].sendingStatus,temp_data.partitions[iter_data].verification_status, temp_data.partitions[iter_data].location_verification_status)
        verification_status = false
      }
      else{
        console.log(temp_data.partitions[iter_data].id +' ready',temp_data.partitions[iter_data].sendingStatus,temp_data.partitions[iter_data].x,temp_data.partitions[iter_data].y)
        var temp_klay_by_hash = await getSendingKlayByHash(temp_data.partitions[iter_data].tx_hash)
        amount_of_klay += temp_klay_by_hash
        console.log(temp_data.partitions[iter_data].id,' sending ',temp_klay_by_hash)
      }
    }

    if(verification_status == true && sendCheckObject[data.key] != true){
      temp_data.verification.status = true
      console.log('verification success, amount_of_klay:',amount_of_klay)
      await sendKlay(temp_data.verification.room_manager_wallet,String(amount_of_klay))
      sendCheckObject[data.key] = true
    }

    console.log(temp_data.verification)
    firebase.database().ref('Chat/'+data.key).set(temp_data);
  }




});


commentsRef.on('child_removed', (data) => {
  console.log('delete data: ',data.key);
});





var klay_value_refs = firebase.database().ref('klay_value/');
klay_value_refs.on('child_changed', (data) => {
  if(data.val() == true){
    getKlayValue()
    //console.log(data)
  }
})

async function getKlayValue(){
    var my_Data;

    await request("https://api.coinone.co.kr/ticker?currency=klay", function (err, res, body) {
       var klay_data = JSON.parse(body).last;
       console.log('update klay_value: ',klay_data)
       firebase.database().ref('klay_value/').set({
         'trigger': false,
         'value': klay_data
       });
    });
  }
    //console.log(my_Data)

    //console.log(klay_data)


//
async function getSendingKlayByHash(hash) {

  const result_json = await caver.rpc.klay.getTransactionByHash(hash);
  //console.log(parseInt(result_json.value,16)/1000000000000000000)
  //console.log("/////////////////////////////////////////////////////")
  return parseInt(result_json.value,16)/1000000000000000000

}

async function getSendedAddressByHash(hash) {

  const result_json = await caver.rpc.klay.getTransactionByHash(hash);
  //console.log(parseInt(result_json.value,16)/1000000000000000000)
  //console.log("/////////////////////////////////////////////////////")
  return parseInt(result_json.to,16)/1000000000000000000

}

async function sendKlay(receiver,price) {
    // Read keystore json file

    //console.log(keyring0)

    //const keyring1 = caver.wallet.keyring.decrypt(keystore1, '9051parkyu@')
    //console.log(keyring1)

    // Add to caver.wallet

    //caver.wallet.add(keyring1)

    // Create value transfer transaction
    const vt = new caver.transaction.valueTransfer({
        from: keyring0.address,
        to: receiver,
        //to: '0xb78dEF84c88Cd50DCaff3D520dA2B5255044Fe09', //cypass
        //to: '0x9a6e2a9dce1e3c8a8c5ec62a4cf428a465d1c7e9',
        value: caver.utils.convertToPeb(price, 'KLAY'),
        gas: 25000,
    })

    // Sign to the transaction
    const signed = await caver.wallet.sign(keyring0.address, vt)

    // Send transaction to the Klaytn blockchain platform (Klaytn)
    const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)

    console.log('//////description//////')
    console.log('to: ', receipt.to)
    console.log('from: ', receipt.from)
    console.log('amout of klay', parseInt(receipt.value,16)/1000000000000000000)
    return receipt
}

function getDistance(lat1,lng1,lat2,lng2) {//FromLatLonInKm
  console.log(lat1,lng1,lat2,lng2)
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below

    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km

    return d;
}

async function getLocationGps(room){
  docRef = db.collection('Rooms').doc(String(room))
  docData = await docRef.get()
  docJSON = new Object()
  docJSON.x = docData.data().x
  docJSON.y = docData.data().y
  //returnMessage = JSON.parse(String("{ 'x':" + docData.data().x + "\n 'y':" + docData.data().y + "\n }"))
  return docJSON
}

async function intervalFunc() {

  var now_time = moment() //
  amount_of_klay = 0
  var temp_time = moment('06-06 19:26', 'MM-DD HH:mm')
  //console.log(now_time)
  for (x in timeObject){
    temp_time = moment(timeObject[x], 'MM-DD HH:mm')
    //console.log('time duration', moment.duration(now_time.diff(temp_time)).asMinutes()>= 0.0, sendCheckObject[x] != true)
    if (moment.duration(now_time.diff(temp_time)).asMinutes() >= 0.0 && sendCheckObject[x] != true){
      console.log('start', timeObject[x]);

      const dbRef = firebase.database().ref('Chat/'+x+'/');
      const data = await dbRef.get()
      const temp_data = data.toJSON()
      //console.log(data.val())
      if(typeof data.val().verification.room_manager_wallet != "undefined"){
        sendCheckObject[x] = true
        for(iter_data in data.val().partitions){
          if(data.val().partitions[iter_data].sendingStatus == "success" && data.val().partitions[iter_data].location_verification_status == true && data.val().partitions[iter_data].verification_status != true){
            console.log(data.val().partitions[iter_data].id +' in destination but not meet room manager',data.val().partitions[iter_data].sendingStatus,data.val().partitions[iter_data].verification_status, data.val().partitions[iter_data].location_verification_status)
            temp_data.partitions[iter_data].sendToManager = false
          }
          else{
            temp_data.partitions[iter_data].sendToManager = true
            console.log(data.val().partitions[iter_data].id +' ready',data.val().partitions[iter_data].sendingStatus,data.val().partitions[iter_data].x,data.val().partitions[iter_data].y)
            var temp_klay_by_hash = await getSendingKlayByHash(data.val().partitions[iter_data].tx_hash)
            amount_of_klay += temp_klay_by_hash
            console.log(data.val().partitions[iter_data].id,' sending ',temp_klay_by_hash)
          }
        }
          data.val().verification.status = true
          console.log('time verification success, amount_of_klay:',amount_of_klay)
          await sendKlay(data.val().verification.room_manager_wallet,String(amount_of_klay))
          firebase.database().ref('Chat/'+x).set(temp_data);
      }
    }
  }

}

setInterval(intervalFunc, 1000);
/*
async function testFunc(){
  const dbRef = firebase.database().ref('Chat/'+'0'+'/');
  data = await dbRef.get()
  data.toJSON()
  data.sendToManager = false
  console.log(data.sendToManager)
}
testFunc()
*/
//getLocationGps(0)







//sendKlay('0xb78dEF84c88Cd50DCaff3D520dA2B5255044Fe09','0.001')

//testFunction()
