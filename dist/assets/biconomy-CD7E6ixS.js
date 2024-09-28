import{L as c,F as y,X as p,r as u,bt as f,e as m,bo as l}from"./index-DillEupA.js";const d=0n;async function g({account:a,serializableTransaction:e,transaction:s,gasless:n}){const o=p({address:n.relayerForwarderAddress,chain:s.chain,client:s.client}),r=await u({contract:o,method:"function getNonce(address,uint256) view returns (uint256)",params:[a.address,d]}),i=Math.floor(Date.now()/1e3)+(n.deadlineSeconds??3600),t={from:a.address,to:e.to,token:f,txGas:e.gas,tokenGasPrice:0n,batchId:d,batchNonce:r,deadline:i,data:e.data};if(!t.to)throw new Error("Cannot send a transaction without a `to` address");if(!t.txGas)throw new Error("Cannot send a transaction without a `gas` value");if(!t.data)throw new Error("Cannot send a transaction without a `data` value");const h=m([{type:"address"},{type:"address"},{type:"address"},{type:"uint256"},{type:"uint256"},{type:"uint256"},{type:"uint256"},{type:"bytes32"}],[t.from,t.to,t.token,t.txGas,t.tokenGasPrice,t.batchId,t.batchNonce,l(t.data)]),w=await a.signMessage({message:h});return[t,w]}async function b(a){var i;const[e,s]=await g(a),n=await fetch("https://api.biconomy.io/api/v2/meta-tx/native",{method:"POST",body:c({apiId:a.gasless.apiId,params:[e,s],from:e.from,to:e.to,gasLimit:e.txGas}),headers:{"x-api-key":a.gasless.apiKey,"Content-Type":"application/json;charset=utf-8"}});if(!n.ok)throw(i=n.body)==null||i.cancel(),new Error(`Failed to send transaction: ${await n.text()}`);const o=await n.json(),r=o.txHash;if(y(r))return{transactionHash:r,chain:a.transaction.chain,client:a.transaction.client};throw new Error(`Failed to send transaction: ${c(o)}`)}export{g as prepareBiconomyTransaction,b as relayBiconomyTransaction};
