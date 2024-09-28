import{dG as e,dH as o,bo as a,o as i}from"./index-DillEupA.js";const c=`Ethereum Signed Message:
`;function u(t,n){const r=typeof t=="string"?e(t):t.raw instanceof Uint8Array?t.raw:o(t.raw),s=e(`${c}${r.length}`);return a(i([s,r]),n)}export{u as hashMessage};
