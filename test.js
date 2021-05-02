const fs = require('fs')

const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651')

var express=require('express');
var app=express();

var HTTP_PORT = 52273;

const keystore0 = fs.readFileSync('api_key/babob/1213Parkyu@/keystore.json', 'utf8')
// Decrypt keystore
const keyring0 = caver.wallet.keyring.decrypt(keystore0, '1213Parkyu@')

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get('/',async function(request,response){
  var string_test = await caver.klay.getBalance(keyring0.address)
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


app.get('/change_pwd',function(request,response){
	//read file
	fs.readFile('change_pwd.html','utf8',function(error,data){
		response.send(data);
	});
});
app.post('/change_pwd',function(request,response){
	//declare var
	var body=request.body;//user input
	db.run('select * from account where pwd=?',body.cur_pwd,function(error,results){

		if(results.length==0){	//wrong pwd
			response.redirect('/change_pwd');
		}
		else{			//correct_pwd
			if(body.new_pwd===body.new_pwd2){		//same pwd input
				db.run('update account set pwd=?',body.new_pwd,function(error,result){
					response.redirect('/');
				});
			}
			else{
				response.redirect('/change_pwd');
			}
		}
	});
});





async function testFunction() {
    // Read keystore json file

    console.log(keyring0)

    const keyring1 = caver.wallet.keyring.decrypt(keystore1, '9051parkyu@')
    console.log(keyring1)

    // Add to caver.wallet
    caver.wallet.add(keyring0)
    caver.wallet.add(keyring1)

    // Create value transfer transaction
    const vt = new caver.transaction.valueTransfer({
        from: keyring1.address,
        to: keyring0.address,
        value: caver.utils.toPeb(1, 'KLAY'),
        gas: 25000,
    })

    // Sign to the transaction
    const signed = await caver.wallet.sign(keyring1.address, vt)

    // Send transaction to the Klaytn blockchain platform (Klaytn)
    const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}

//testFunction()
