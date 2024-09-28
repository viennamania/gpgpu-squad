import{aj as Q,ao as Y,aR as X,at as _,b3 as ee,aZ as g,aq as i,as as te,av as U,ax as H,aA as ne,ay as j,b4 as ae,b5 as ie,b6 as x,b7 as oe,b8 as se,b9 as le,ba as re,aP as ce,a_ as de,aK as A,aY as ue,b1 as fe,ak as he,a0 as c}from"./index-DillEupA.js";import{I as q,l as me}from"./InputSelectionUI-D5yAzt1Q.js";import{g as ge,l as _e}from"./oauth-zvjgX-c5.js";import{s as we}from"./types-CKeVp00v.js";function ye(e){switch(e){case"google":return"Sign In - Google Accounts";default:return`Sign In - ${e.slice(0,1).toUpperCase()}${e.slice(1)}`}}function pe(e){switch(e){case"facebook":return{width:715,height:555};default:return{width:350,height:500}}}function xe(e,t,n){switch(e){case"apple":case"facebook":case"google":case"farcaster":case"telegram":case"discord":return ge({authOption:e,client:t,ecosystem:n});default:return""}}function be({authOption:e,themeObj:t,client:n,ecosystem:l}){const{height:w,width:r}=pe(e),b=(window.innerHeight-w)/2,E=(window.innerWidth-r)/2,s=window.open(xe(e,n,l),void 0,`width=${r}, height=${w}, top=${b}, left=${E}`);if(s){const u=ye(e);s.document.title=u,s.document.body.innerHTML=Ee,s.document.body.style.background=t.colors.modalBg,s.document.body.style.color=t.colors.accentText}return s&&window.addEventListener("beforeunload",()=>{s==null||s.close()}),s}const Ee=`
<svg class="loader" viewBox="0 0 50 50">
  <circle
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke="currentColor"
    stroke-width="4"
  />
</svg>

<style>
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  .loader circle {
    animation: loading 1.5s linear infinite;
  }

  @keyframes loading {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
        }
  }
</style>
`;async function Le(e){const n=await(await fetch(`${Q("inAppWallet")}/api/2024-05-05/ecosystem-wallet`,{headers:{"x-ecosystem-id":e}})).json();if(!n||n.code==="UNAUTHORIZED")throw new Error(n.message||`Could not find ecosystem wallet with id ${e}, please check your ecosystem wallet configuration.`);return n.authOptions??void 0}function ke(e){return/^\S+@\S+\.\S+$/.test(e.replace(/\+/g,""))}const z=["email","phone","google","apple","facebook","passkey"],We=e=>{var $,D,M;const t=e.locale,{wallet:n}=e,l=Y(),w=X(),r=_.useMemo(()=>{var a,o;return e.wallet.id==="inApp"?(o=(a=e.wallet.getConfig())==null?void 0:a.metadata)==null?void 0:o.image:void 0},[e.wallet]),b={google:t.signInWithGoogle,facebook:t.signInWithFacebook,apple:t.signInWithApple,discord:t.signInWithDiscord,farcaster:"Farcaster",telegram:"Telegram"},{data:E,isLoading:s}=ee({queryKey:["auth-options",n.id],queryFn:async()=>g(n)?Le(n.id):null,enabled:g(n),retry:!1}),u=g(n)?E??z:((D=($=n.getConfig())==null?void 0:$.auth)==null?void 0:D.options)??z,L=u.indexOf("email"),m=L!==-1,k=u.indexOf("phone"),f=k!==-1,[I,W]=_.useState(null),h=_.useMemo(()=>I||(m&&f?L<k?"email":"phone":m?"email":f?"phone":"none"),[m,f,L,k,I]);if(g(n)&&s)return i.jsx(te,{});const K=u.includes("passkey"),O=h==="email"?t.emailPlaceholder:t.phonePlaceholder,T=h==="email"?t.emailRequired:t.phoneRequired;let y="text";h==="email"?y="email":h==="phone"&&(y="tel");const d=u.filter(a=>we.includes(a)),R=d.length>0,C=g(n)?{id:n.id,partnerId:(M=n.getConfig())==null?void 0:M.partnerId}:void 0,G=async a=>{var V,F;const o=n.getConfig(),P=((V=o==null?void 0:o.auth)==null?void 0:V.mode)??"popup";if(o&&"auth"in o&&P!=="popup"&&!e.isLinking)return _e({authOption:a,client:e.client,ecosystem:C,redirectUrl:(F=o==null?void 0:o.auth)==null?void 0:F.redirectUrl,mode:P});try{const p=be({authOption:a,themeObj:w,client:e.client,ecosystem:C});if(!p)throw new Error("Failed to open login window");const B={chain:e.chain,client:e.client,strategy:a,openedWindow:p,closeOpenedWindow:S=>{S.close()}},J=(()=>{if(e.isLinking){if(n.id!=="inApp")throw new Error("Only in-app wallets support multi-auth");return me(n,B)}else{const S=n.connect(B);return fe(a,he),S}})();l({socialLogin:{type:a,connectionPromise:J}}),e.select()}catch(p){console.error(`Error signing in with ${a}`,p)}};function N(){l({passkeyLogin:!0}),e.select()}function Z(){l({walletLogin:!0}),e.select()}const v=d.length>2;return i.jsxs(U,{flex:"column",gap:"md",style:{position:"relative"},children:[r&&i.jsxs(i.Fragment,{children:[i.jsx(H,{client:e.client,src:r.src,alt:r.alt,width:`${r.width}`,height:`${r.height}`,style:{margin:"auto"}}),i.jsx(ne,{y:"xxs"})]}),R&&i.jsx(U,{flex:"row",center:"x",gap:d.length>4?"xs":"sm",style:{justifyContent:"space-between",display:"grid",gridTemplateColumns:`repeat(${d.length}, 1fr)`},children:d.map(a=>{const o=v?d.length>4?j.md:j.lg:j.md;return i.jsxs(Ie,{"aria-label":`Login with ${a}`,"data-variant":v?"icon":"full",variant:"outline",disabled:e.disabled,onClick:()=>{G(a)},children:[i.jsx(H,{src:ae[a],width:o,height:o,client:e.client}),!v&&`${d.length===1?"Continue with ":""}${b[a]}`]},a)})}),e.size==="wide"&&R&&(m||f)&&i.jsx(ie,{text:t.or}),m&&i.jsx(i.Fragment,{children:h==="email"?i.jsx(q,{type:y,onSelect:a=>{l({emailLogin:a}),e.select()},placeholder:O,name:"email",errorMessage:a=>{if(!ke(a.toLowerCase()))return t.invalidEmail},disabled:e.disabled,emptyErrorMessage:T,submitButtonText:t.submitEmail}):i.jsx(x,{client:e.client,icon:oe,onClick:()=>{W("email")},title:t.emailPlaceholder,disabled:e.disabled})}),f&&i.jsx(i.Fragment,{children:h==="phone"?i.jsx(q,{format:"phone",type:y,onSelect:a=>{l({phoneLogin:a.replace(/[-\(\) ]/g,"")}),e.select()},placeholder:O,name:"phone",errorMessage:a=>{const o=a.replace(/[-\(\) ]/g,"");if(!/^[0-9]+$/.test(o)&&f)return t.invalidPhone},disabled:e.disabled,emptyErrorMessage:T,submitButtonText:t.submitEmail}):i.jsx(x,{client:e.client,icon:se,onClick:()=>{W("phone")},title:t.phonePlaceholder,disabled:e.disabled})}),K&&i.jsx(i.Fragment,{children:i.jsx(x,{client:e.client,icon:le,onClick:()=>{N()},title:t.passkey,disabled:e.disabled})}),e.isLinking&&i.jsx(i.Fragment,{children:i.jsx(x,{client:e.client,icon:re(""),onClick:()=>{Z()},title:t.linkWallet})})]})},Ie=ce(de)({flexGrow:1,"&[data-variant='full']":{display:"flex",justifyContent:"flex-start",padding:A.md,gap:A.sm,fontSize:ue.md,fontWeight:500,transition:"background-color 0.2s ease","&:active":{boxShadow:"none"}},"&[data-variant='icon']":{padding:A.sm}});async function ve(e){switch(e){case"es_ES":return(await c(async()=>{const{default:t}=await import("./es-KRP1eUth.js");return{default:t}},[])).default;case"ja_JP":return(await c(async()=>{const{default:t}=await import("./ja-CvlQDx_E.js");return{default:t}},[])).default;case"tl_PH":return(await c(async()=>{const{default:t}=await import("./tl-DYNbjJIy.js");return{default:t}},[])).default;case"vi_VN":return(await c(async()=>{const{default:t}=await import("./vi-DNa2Is64.js");return{default:t}},[])).default;case"de_DE":return(await c(async()=>{const{default:t}=await import("./de-B4p3brce.js");return{default:t}},[])).default;case"ko_KR":return(await c(async()=>{const{default:t}=await import("./kr-l36CKqHK.js");return{default:t}},[])).default;case"fr_FR":return(await c(async()=>{const{default:t}=await import("./fr-DIyoT90O.js");return{default:t}},[])).default;default:return(await c(async()=>{const{default:t}=await import("./en-ihCLWX_K.js");return{default:t}},[])).default}}function Oe(e){const[t,n]=_.useState(void 0);return _.useEffect(()=>{ve(e).then(l=>{n(l)})},[e]),t}export{We as C,be as o,Oe as u};
