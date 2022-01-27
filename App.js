// Sending the transactions
var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/30f709e5f1fe491fadae788c82dcb6c3')

const account1 = '0x1b922Baa2a64892C75140Ab791eF5D6bB2827F21'
const account2 = '0xa3A2A3f07c543c940746E11BaCAe8C2c79035673'
//const privatekey1 = web3.utils.toHex('YOUR PRIVATE KEY')

const privateKey = Buffer.from('0f33408e7569b6c1f462b474ffc52795186ec1ed5ab2c6e647426a84c96eeb32','hex')

console.log(web3.eth.getBalance(account1))

web3.eth.getBalance(account1,(err, bal) => {
  console.log('account 1 balance:', web3.utils.fromWei(bal,'ether'))
})

web3.eth.getBalance(account2,(err, bal) => {
  console.log('account 2 balance:', web3.utils.fromWei(bal,'ether'))
})

web3.eth.getTransactionCount(account1, (err,txCount) => {
  // build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount), // safeguarding the double spending of transaction
    to: account2,
    from: account1,
    value: web3.utils.toHex(web3.utils.toWei('1','ether')),
    gasLimit: web3.utils.toHex(21000), // safegaurd the limit of gas cost
    gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')) // cost of gas
  }

  // Sign the Transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey)

  //serialize the transaction
  const serializedTransaction = tx.serialize()
  const raw = '0x' +serializedTransaction.toString('hex') 

  //Broadcast the Transaction
   web3.eth.sendSignedTransaction(raw,(err,txHash) => {
      console.log('txHash: ',txHash) 
    }) 
})


