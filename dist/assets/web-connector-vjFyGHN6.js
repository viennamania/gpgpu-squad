const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/passkeys-B4oNeLJB.js","assets/index-DillEupA.js","assets/index-DUMAu9QS.css","assets/client-scoped-storage-ChRDBjxy.js"])))=>i.map(i=>d[i]);
import{K as L,aj as y,ak as f,$ as N,x as _,a3 as D,al as j,a1 as U,am as E,a0 as M}from"./index-DillEupA.js";import{C as g,I as $}from"./client-scoped-storage-ChRDBjxy.js";import{signLoginPayload as B}from"./sign-login-payload-BS5pcbMU.js";import{g as T,a as A,l as R,b as G}from"./oauth-zvjgX-c5.js";import{U as m}from"./types-YMLL-Nyu.js";import"./types-CKeVp00v.js";async function F(i,e){return await i({method:"eth_sendRawTransaction",params:[e]})}function C(){return`${y("inAppWallet")}/api/2024-05-05/login/passkey/callback`}function P(i,e){return`${y("inAppWallet")}/api/2024-05-05/login/passkey?type=${i}${e?`&username=${e}`:""}`}async function Q(i){var o,u,l;if(!i.passkeyClient.isAvailable())throw new Error("Passkeys are not available on this device");const e=new g({storage:i.storage,clientId:i.client.clientId,ecosystemId:(o=i.ecosystem)==null?void 0:o.id}),t=L(i.client,i.ecosystem),a=i.username??J(i.ecosystem),s=await(await t(P("sign-up",a))).json();if(!s.challenge)throw new Error("No challenge received");const r=s.challenge,c=await i.passkeyClient.register({name:a,challenge:r,rp:i.rp}),d={};(u=i.ecosystem)!=null&&u.partnerId&&(d["x-ecosystem-partner-id"]=i.ecosystem.partnerId),(l=i.ecosystem)!=null&&l.id&&(d["x-ecosystem-id"]=i.ecosystem.id);const h=await(await t(C(),{method:"POST",headers:{"Content-Type":"application/json",...d},body:JSON.stringify({type:"sign-up",authenticatorData:c.authenticatorData,credentialId:c.credentialId,serverVerificationId:s.serverVerificationId,clientData:c.clientData,username:a,credential:{publicKey:c.credential.publicKey,algorithm:c.credential.algorithm},origin:c.origin,rpId:i.rp.id})})).json();if(!h||!h.storedToken)throw new Error(`Error verifying passkey: ${h.message??"unknown error"}`);return await e.savePasskeyCredentialId(c.credentialId),h}async function V(i){var o,u,l;if(!i.passkeyClient.isAvailable())throw new Error("Passkeys are not available on this device");const e=new g({storage:i.storage,clientId:i.client.clientId,ecosystemId:(o=i.ecosystem)==null?void 0:o.id}),t=L(i.client,i.ecosystem),n=await(await t(P("sign-in"))).json();if(!n.challenge)throw new Error("No challenge received");const s=n.challenge,r=await e.getPasskeyCredentialId()??void 0,c=await i.passkeyClient.authenticate({credentialId:r,challenge:s,rp:i.rp}),d={};(u=i.ecosystem)!=null&&u.partnerId&&(d["x-ecosystem-partner-id"]=i.ecosystem.partnerId),(l=i.ecosystem)!=null&&l.id&&(d["x-ecosystem-id"]=i.ecosystem.id);const h=await(await t(C(),{method:"POST",headers:{"Content-Type":"application/json",...d},body:JSON.stringify({type:"sign-in",authenticatorData:c.authenticatorData,credentialId:c.credentialId,serverVerificationId:n.serverVerificationId,clientData:c.clientData,signature:c.signature,origin:c.origin,rpId:i.rp.id})})).json();if(!h||!h.storedToken)throw new Error(`Error verifying passkey: ${h.message??"unknown error"}`);return await e.savePasskeyCredentialId(c.credentialId),h}function J(i){return`${(i==null?void 0:i.id)??"wallet"}-${new Date().toISOString()}`}async function x(i){const{wallet:e,chain:t}=i,a=await e.connect({client:i.client}),n=L(i.client,i.ecosystem),s=await(async()=>{const d=T({authOption:"wallet",client:i.client,ecosystem:i.ecosystem}),p=await n(`${d}&address=${a.address}&chainId=${t.id}`);if(!p.ok)throw new Error("Failed to generate SIWE login payload");return await p.json()})(),{signature:r}=await B({payload:s,account:a});return await(async()=>{const d=A({authOption:"wallet",client:i.client,ecosystem:i.ecosystem}),p=await n(`${d}&signature=${r}&payload=${encodeURIComponent(s)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({signature:r,payload:s})});if(!p.ok)throw new Error("Failed to verify SIWE signature");return await p.json()})()}function I(i){return new Promise(e=>{setTimeout(e,i*1e3)})}const q={height:"100%",width:"100%",border:"none",backgroundColor:"transparent",colorScheme:"light",position:"fixed",top:"0px",right:"0px",zIndex:"2147483646",display:"none",pointerEvents:"all"},b=new Map;class H{constructor({link:e,baseUrl:t,iframeId:a,container:n=document.body,onIframeInitialize:s}){Object.defineProperty(this,"iframe",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"POLLING_INTERVAL_SECONDS",{enumerable:!0,configurable:!0,writable:!0,value:1.4}),Object.defineProperty(this,"iframeBaseUrl",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.iframeBaseUrl=t;let r=document.getElementById(a);const c=new URL(e);if(!r||r.src!==c.href){r=document.createElement("iframe");const d={...q};Object.assign(r.style,d),r.setAttribute("id",a),r.setAttribute("fetchpriority","high"),n.appendChild(r),r.src=c.href;const p=h=>{if(h.data.eventType==="ewsIframeLoaded"){if(window.removeEventListener("message",p),!r){console.warn("thirdweb iFrame not found");return}this.onIframeLoadHandler(r,s)()}};window.addEventListener("message",p)}this.iframe=r}async onIframeLoadedInitVariables(){return{}}onIframeLoadHandler(e,t){return async()=>{var r;const a=new MessageChannel,n=new Promise((c,d)=>{a.port1.onmessage=p=>{const{data:h}=p;a.port1.close(),h.success||d(new Error(h.error)),b.set(e.src,!0),t&&t(),c(!0)}});(r=e==null?void 0:e.contentWindow)==null||r.postMessage({eventType:"initIframe",data:await this.onIframeLoadedInitVariables()},this.iframeBaseUrl,[a.port2]),await n}}async call({procedureName:e,params:t,showIframe:a=!1}){var r;for(;!b.get(this.iframe.src);)await I(this.POLLING_INTERVAL_SECONDS);a&&(this.iframe.style.display="block",await I(.005));const n=new MessageChannel,s=new Promise((c,d)=>{n.port1.onmessage=async p=>{const{data:h}=p;n.port1.close(),a&&(await I(.1),this.iframe.style.display="none"),h.success?c(h.data):d(new Error(h.error))}});return(r=this.iframe.contentWindow)==null||r.postMessage({eventType:e,data:t},this.iframeBaseUrl,[n.port2]),s}destroy(){b.delete(this.iframe.src)}}class K extends H{constructor({clientId:e,baseUrl:t,ecosystem:a}){super({iframeId:z+((a==null?void 0:a.id)||""),link:Z({clientId:e,path:$,ecosystem:a,baseUrl:t}).href,baseUrl:t,container:document.body}),Object.defineProperty(this,"clientId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.clientId=e,this.ecosystem=a}async onIframeLoadedInitVariables(){var t,a,n;const e=new g({storage:f,clientId:this.clientId,ecosystemId:(t=this.ecosystem)==null?void 0:t.id});return{authCookie:await e.getAuthCookie(),deviceShareStored:await e.getDeviceShare(),walletUserId:await e.getWalletUserId(),clientId:this.clientId,partnerId:(a=this.ecosystem)==null?void 0:a.partnerId,ecosystemId:(n=this.ecosystem)==null?void 0:n.id}}}function Z({clientId:i,baseUrl:e,path:t,ecosystem:a,queryParams:n}){var r;const s=new URL(`${t}`,e);if(n)for(const c of Object.keys(n))s.searchParams.set(c,((r=n[c])==null?void 0:r.toString())||"");return s.searchParams.set("clientId",i),(a==null?void 0:a.partnerId)!==void 0&&s.searchParams.set("partnerId",a.partnerId),(a==null?void 0:a.id)!==void 0&&s.searchParams.set("ecosystemId",a.id),s}const z="thirdweb-in-app-wallet-iframe";class Y{constructor({baseUrl:e,querier:t,preLogin:a,postLogin:n,client:s,ecosystem:r}){Object.defineProperty(this,"LoginQuerier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"preLogin",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"postLogin",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"baseUrl",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.baseUrl=e,this.LoginQuerier=t,this.preLogin=a,this.postLogin=n,this.client=s,this.ecosystem=r}async sendEmailLoginOtp({email:e}){return await this.LoginQuerier.call({procedureName:"sendThirdwebEmailLoginOtp",params:{email:e}})}async sendSmsLoginOtp({phoneNumber:e}){return await this.LoginQuerier.call({procedureName:"sendThirdwebSmsLoginOtp",params:{phoneNumber:e}})}}class X extends Y{async authenticateWithModal(){return this.LoginQuerier.call({procedureName:"loginWithThirdwebModal",params:void 0,showIframe:!0})}async loginWithModal(){await this.preLogin();const e=await this.authenticateWithModal();return this.postLogin(e)}async authenticateWithIframe({email:e}){return this.LoginQuerier.call({procedureName:"loginWithThirdwebModal",params:{email:e},showIframe:!0})}async loginWithIframe({email:e}){await this.preLogin();const t=await this.authenticateWithIframe({email:e});return this.postLogin(t)}async authenticateWithCustomJwt({encryptionKey:e,jwt:t}){if(!e||e.length===0)throw new Error("Encryption key is required for custom jwt auth");return this.LoginQuerier.call({procedureName:"loginWithCustomJwt",params:{encryptionKey:e,jwt:t}})}async loginWithCustomJwt({encryptionKey:e,jwt:t}){if(!e||e.length===0)throw new Error("Encryption key is required for custom jwt auth");await this.preLogin();const a=await this.authenticateWithCustomJwt({encryptionKey:e,jwt:t});return this.postLogin(a)}async authenticateWithCustomAuthEndpoint({encryptionKey:e,payload:t}){return this.LoginQuerier.call({procedureName:"loginWithCustomAuthEndpoint",params:{encryptionKey:e,payload:t}})}async loginWithCustomAuthEndpoint({encryptionKey:e,payload:t}){if(!e||e.length===0)throw new Error("Encryption key is required for custom auth");await this.preLogin();const a=await this.authenticateWithCustomAuthEndpoint({encryptionKey:e,payload:t});return this.postLogin(a)}async authenticateWithEmailOtp({email:e,otp:t,recoveryCode:a}){return this.LoginQuerier.call({procedureName:"verifyThirdwebEmailLoginOtp",params:{email:e,otp:t,recoveryCode:a}})}async loginWithEmailOtp({email:e,otp:t,recoveryCode:a}){const n=await this.authenticateWithEmailOtp({email:e,otp:t,recoveryCode:a});return this.postLogin(n)}async authenticateWithSmsOtp({phoneNumber:e,otp:t,recoveryCode:a}){return this.LoginQuerier.call({procedureName:"verifyThirdwebSmsLoginOtp",params:{phoneNumber:e,otp:t,recoveryCode:a}})}async loginWithSmsOtp({phoneNumber:e,otp:t,recoveryCode:a}){const n=await this.authenticateWithSmsOtp({phoneNumber:e,otp:t,recoveryCode:a});return this.postLogin(n)}}class ee{constructor({client:e,querier:t,onAuthSuccess:a,ecosystem:n,baseUrl:s}){Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"AuthQuerier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"localStorage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"onAuthSuccess",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"BaseLogin",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.client=e,this.AuthQuerier=t,this.localStorage=new g({storage:f,clientId:e.clientId,ecosystemId:n==null?void 0:n.id}),this.onAuthSuccess=a,this.BaseLogin=new X({postLogin:async r=>this.postLogin(r),preLogin:async()=>{await this.preLogin()},ecosystem:n,querier:t,client:e,baseUrl:s})}async preLogin(){await this.logout()}async postLogin({storedToken:e,walletDetails:t}){return e.shouldStoreCookieString&&await this.localStorage.saveAuthCookie(e.cookieString),await this.onAuthSuccess({storedToken:e,walletDetails:t})}async loginWithAuthToken(e,t){await this.preLogin();const a=await this.AuthQuerier.call({procedureName:"loginWithStoredTokenDetails",params:{storedToken:e.storedToken,recoveryCode:t}});return this.postLogin(a)}async loginWithModal(){return this.BaseLogin.loginWithModal()}async authenticateWithModal(){return this.BaseLogin.authenticateWithModal()}async loginWithIframe(e){return this.BaseLogin.loginWithIframe(e)}async authenticateWithIframe(e){return this.BaseLogin.authenticateWithIframe(e)}async loginWithCustomJwt(e){return this.BaseLogin.loginWithCustomJwt(e)}async authenticateWithCustomJwt(e){return this.BaseLogin.authenticateWithCustomJwt(e)}async loginWithCustomAuthEndpoint(e){return this.BaseLogin.loginWithCustomAuthEndpoint(e)}async authenticateWithCustomAuthEndpoint(e){return this.BaseLogin.authenticateWithCustomAuthEndpoint(e)}async sendEmailLoginOtp({email:e}){return this.BaseLogin.sendEmailLoginOtp({email:e})}async sendSmsLoginOtp({phoneNumber:e}){return this.BaseLogin.sendSmsLoginOtp({phoneNumber:e})}async loginWithEmailOtp(e){return await this.preLogin(),this.BaseLogin.loginWithEmailOtp(e)}async authenticateWithEmailOtp(e){return this.BaseLogin.authenticateWithEmailOtp(e)}async loginWithSmsOtp(e){return await this.preLogin(),this.BaseLogin.loginWithSmsOtp(e)}async authenticateWithSmsOtp(e){return this.BaseLogin.authenticateWithSmsOtp(e)}async logout(){const{success:e}=await this.AuthQuerier.call({procedureName:"logout",params:void 0}),t=await this.localStorage.removeAuthCookie(),a=await this.localStorage.removeWalletUserId();return{success:e||t||a}}}const te=async i=>{const{client:e,ecosystem:t}=i,a=T({client:e,ecosystem:t,authOption:i.strategy}),n={"Content-Type":"application/json","x-client-id":e.clientId};t!=null&&t.id&&(n["x-ecosystem-id"]=t.id),t!=null&&t.partnerId&&(n["x-ecosystem-partner-id"]=t.partnerId);const s=(()=>{switch(i.strategy){case"email":return{email:i.email};case"phone":return{phone:i.phoneNumber}}})(),r=await fetch(a,{method:"POST",headers:n,body:JSON.stringify(s)});if(!r.ok)throw new Error("Failed to send verification code");return await r.json()},O=async i=>{const{client:e,ecosystem:t}=i,a=A({authOption:i.strategy,client:i.client,ecosystem:i.ecosystem}),n={"Content-Type":"application/json","x-client-id":e.clientId};t!=null&&t.id&&(n["x-ecosystem-id"]=t.id),t!=null&&t.partnerId&&(n["x-ecosystem-partner-id"]=t.partnerId);const s=(()=>{switch(i.strategy){case"email":return{email:i.email,code:i.verificationCode};case"phone":return{phone:i.phoneNumber,code:i.verificationCode}}})(),r=await fetch(a,{method:"POST",headers:n,body:JSON.stringify(s)});if(!r.ok)throw new Error("Failed to verify verification code");return await r.json()},ae=async(i,e)=>await(await fetch(`${y("inAppWallet")}/api/2024-05-05/ecosystem-wallet/${i}/partner/${e}`,{headers:{"x-ecosystem-id":i,"x-ecosystem-partner-id":e||""}})).json();class ie{constructor({client:e,ecosystem:t,querier:a}){Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"ecosystem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"walletManagerQuerier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"localStorage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.client=e,this.ecosystem=t,this.walletManagerQuerier=a,this.localStorage=new g({storage:f,clientId:e.clientId,ecosystemId:t==null?void 0:t.id})}async postWalletSetUp({deviceShareStored:e,walletAddress:t,isIframeStorageEnabled:a,walletUserId:n}){return a||await this.localStorage.saveDeviceShare(e,n),{walletAddress:t}}async getUserWalletStatus(){const e=await this.walletManagerQuerier.call({procedureName:"getUserStatus",params:void 0});return e.status===m.LOGGED_IN_WALLET_INITIALIZED?{status:m.LOGGED_IN_WALLET_INITIALIZED,...e.user,account:await this.getAccount()}:e.status===m.LOGGED_IN_NEW_DEVICE?{status:m.LOGGED_IN_WALLET_UNINITIALIZED,...e.user}:e.status===m.LOGGED_IN_WALLET_UNINITIALIZED?{status:m.LOGGED_IN_WALLET_UNINITIALIZED,...e.user}:{status:e.status}}async getAccount(){var d,p,h;const e=this.walletManagerQuerier,t=this.client,a=(d=this.ecosystem)==null?void 0:d.partnerId,n=!!this.ecosystem,s=(p=this.ecosystem)!=null&&p.partnerId?await ae(this.ecosystem.id,(h=this.ecosystem)==null?void 0:h.partnerId):void 0,{address:r}=await e.call({procedureName:"getAddress",params:void 0}),c=async o=>{const u={to:o.to??void 0,data:o.data,value:o.value,gasLimit:o.gas,nonce:o.nonce,chainId:o.chainId};o.maxFeePerGas?(u.accessList=o.accessList,u.maxFeePerGas=o.maxFeePerGas,u.maxPriorityFeePerGas=o.maxPriorityFeePerGas,u.type=2):(u.gasPrice=o.gasPrice,u.type=0);const l=E().rpc,{signedTransaction:w}=await e.call({procedureName:"signTransaction",params:{transaction:u,chainId:o.chainId,partnerId:a,rpcEndpoint:`https://${o.chainId}.${l}`},showIframe:s!=null&&s.permissions.includes("FULL_CONTROL_V1")?!1:n});return w};return{address:N(r),async signTransaction(o){if(!o.chainId)throw new Error("chainId required in tx to sign");return c({...o,chainId:o.chainId})},async sendTransaction(o){const u=_({client:t,chain:D(o.chainId)}),l=await c(o);return{transactionHash:await F(u,l)}},async signMessage({message:o}){const u=typeof o=="string"?o:o.raw instanceof Uint8Array?o.raw:j(o.raw),{signedMessage:l}=await e.call({procedureName:"signMessage",params:{message:u,partnerId:a,chainId:1},showIframe:s!=null&&s.permissions.includes("FULL_CONTROL_V1")?!1:n});return l},async signTypedData(o){var W;console.log("signTypedData",o);const u=U(o);(W=u.types)!=null&&W.EIP712Domain&&(u.types.EIP712Domain=void 0);const l=u.domain,w=l==null?void 0:l.chainId,v={...l!=null&&l.verifyingContract?{verifyingContract:l==null?void 0:l.verifyingContract}:{},name:l==null?void 0:l.name,version:l==null?void 0:l.version};w&&(v.chainId=w);const k=E().rpc,{signedTypedData:S}=await e.call({procedureName:"signTypedDataV4",params:{domain:v,types:u.types,message:u.message,chainId:w||1,partnerId:a,rpcEndpoint:`https://${w}.${k}`},showIframe:s!=null&&s.permissions.includes("FULL_CONTROL_V1")?!1:n});return S}}}}class de{isClientIdLegacyPaper(e){return e.indexOf("-")>0&&e.length===36}constructor({client:e,onAuthSuccess:t,ecosystem:a,passkeyDomain:n}){if(Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"querier",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"wallet",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"auth",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"passkeyDomain",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.isClientIdLegacyPaper(e.clientId))throw new Error("You are using a legacy clientId. Please use the clientId found on the thirdweb dashboard settings page");const s=y("inAppWallet");this.client=e,this.passkeyDomain=n,this.querier=new K({clientId:e.clientId,ecosystem:a,baseUrl:s}),this.wallet=new ie({client:e,ecosystem:a,querier:this.querier}),this.auth=new ee({client:e,querier:this.querier,baseUrl:s,ecosystem:a,onAuthSuccess:async r=>(t==null||t(r),await this.wallet.postWalletSetUp({...r.walletDetails,walletUserId:r.storedToken.authDetails.userWalletId}),await this.querier.call({procedureName:"initIframe",params:{partnerId:a==null?void 0:a.partnerId,ecosystemId:a==null?void 0:a.id,deviceShareStored:r.walletDetails.deviceShareStored,clientId:this.client.clientId,walletUserId:r.storedToken.authDetails.userWalletId,authCookie:r.storedToken.cookieString}}),{user:{status:m.LOGGED_IN_WALLET_INITIALIZED,authDetails:r.storedToken.authDetails,account:await this.wallet.getAccount(),walletAddress:r.walletDetails.walletAddress}})})}async getUser(){return this.wallet.getUserWalletStatus()}getAccount(){return this.wallet.getAccount()}async preAuthenticate(e){return te({...e,client:this.wallet.client,ecosystem:this.wallet.ecosystem})}authenticateWithRedirect(e,t,a){R({authOption:e,client:this.wallet.client,ecosystem:this.wallet.ecosystem,redirectUrl:a,mode:t})}async loginWithAuthToken(e){return this.auth.loginWithAuthToken(e)}async authenticate(e){const t=e.strategy;switch(t){case"email":return O({...e,client:this.wallet.client,ecosystem:this.wallet.ecosystem});case"phone":return O({...e,client:this.wallet.client,ecosystem:this.wallet.ecosystem});case"jwt":return this.auth.authenticateWithCustomJwt({jwt:e.jwt,encryptionKey:e.encryptionKey});case"passkey":return this.passkeyAuth(e);case"auth_endpoint":return this.auth.authenticateWithCustomAuthEndpoint({payload:e.payload,encryptionKey:e.encryptionKey});case"iframe_email_verification":return this.auth.authenticateWithIframe({email:e.email});case"iframe":return this.auth.authenticateWithModal();case"apple":case"facebook":case"google":case"telegram":case"farcaster":case"discord":return G({authOption:t,client:this.wallet.client,ecosystem:this.wallet.ecosystem,closeOpenedWindow:e.closeOpenedWindow,openedWindow:e.openedWindow});case"wallet":return x({ecosystem:this.wallet.ecosystem,client:this.wallet.client,wallet:e.wallet,chain:e.chain})}}async connect(e){const t=e.strategy;switch(t){case"jwt":return this.auth.loginWithCustomJwt({jwt:e.jwt,encryptionKey:e.encryptionKey});case"auth_endpoint":return this.auth.loginWithCustomAuthEndpoint({payload:e.payload,encryptionKey:e.encryptionKey});case"iframe_email_verification":return this.auth.loginWithIframe({email:e.email});case"iframe":return this.auth.loginWithModal();case"passkey":{const a=await this.passkeyAuth(e);return this.loginWithAuthToken(a)}case"phone":case"email":case"wallet":case"apple":case"facebook":case"google":case"farcaster":case"telegram":case"discord":{const a=await this.authenticate(e);return this.auth.loginWithAuthToken(a)}default:ne(t)}}async logout(){return await this.auth.logout()}async passkeyAuth(e){const{PasskeyWebClient:t}=await M(async()=>{const{PasskeyWebClient:s}=await import("./passkeys-B4oNeLJB.js");return{PasskeyWebClient:s}},__vite__mapDeps([0,1,2,3])),a=new t,n=f;return e.type==="sign-up"?Q({client:this.wallet.client,ecosystem:this.wallet.ecosystem,username:e.passkeyName,passkeyClient:a,storage:n,rp:{id:this.passkeyDomain??window.location.hostname,name:this.passkeyDomain??window.document.title}}):V({client:this.wallet.client,ecosystem:this.wallet.ecosystem,passkeyClient:a,storage:n,rp:{id:this.passkeyDomain??window.location.hostname,name:this.passkeyDomain??window.document.title}})}}function ne(i,e){throw new Error(`Invalid param: ${i}`)}export{de as InAppWebConnector};
