const fs = require('fs')

const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651')


async function testFunction() {
    // Read keystore json file
    const keystore0 = fs.readFileSync('api_key/babob/1213Parkyu@/keystore.json', 'utf8')
    const keystore1 = fs.readFileSync('api_key/babob/9051parkyu@/keystore.json', 'utf8')
    // Decrypt keystore
    const keyring0 = caver.wallet.keyring.decrypt(keystore0, '1213Parkyu@')
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

testFunction()
