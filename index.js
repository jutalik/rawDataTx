const Caver = require('caver-js');
// require("dotenv").config();
const option = {
    headers: [
        { name: 'Authorization', value: 'Basic ' + Buffer.from(process.env.accessKeyId + ':' + process.env.secretAccessKey).toString('base64') },
        { name: 'x-chain-id', value: 8217 },
    ]
}




const mint = async () => {
    const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
    // 
    const contract_address = '컨트랙트주소';
    
    // 
    const account = caver.klay.accounts.wallet.add('프라이빗키');
    
    // 0 부분에 민팅시 들어가는 클레이 넣을 숫자 넣을 것
    const SendEA = caver.utils.convertToPeb(0, 'KLAY');
    // 
    const txData = 'Tx바이트코드 복붙'
    
    try {
      caver.klay
        .sendTransaction({
          type: 'SMART_CONTRACT_EXECUTION',
          from: account.address,
          to: contract_address,
          data: txData,
          gas: 500000,
          value: SendEA,
        })
        .then((receipt) => {
          const TX_HASH = receipt.transactionHash;
          console.log(TX_HASH);
        });
    } catch (err) {
        console.log(err)
    }
}

mint()