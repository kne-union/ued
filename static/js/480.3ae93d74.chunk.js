(self.webpackChunkued=self.webpackChunkued||[]).push([[480],{19724:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>g});var n=t(46964),o=t(85036),u=t(7520),a=t.n(u),i=t(48428),s=t(58564),c=t.n(s),l=t(79483),f=t.n(l),v=t(84768),p=t(62484),b=t.n(p),d=(t(29140),t(82496));const m=a().Example,h=b()(v.withFetch,(0,o.createWithRemoteLoader)({modules:["Filter@fields","Filter@getFilterValue"]}))((e=>{let{remoteModules:r,data:t}=e;const{libs:u,libsMap:a}=(0,n.useMemo)((()=>{const e=t.libs.map((e=>({label:e.name,value:e.name,version:Object.keys(e.versions).sort(((r,t)=>new Date(e.versions[t].time)-new Date(e.versions[r].time))).map((e=>({label:"v".concat(e),value:e})))}))),r=new Map(e.map((e=>[e.value,e])));return{libs:e,libsMap:r}}),[t]),[s,l]=r,[v,p]=(0,n.useState)([]),{id:b}=(0,i.useParams)(),h=l(v),g=(0,n.useRef)(null),x=(0,n.useRef)(null),y=h.version,j=(0,n.useMemo)((()=>u.map((e=>{let{value:r,version:t}=e;return g.current===r?"".concat(r,"/").concat(y||c()(t,"[0].value"),":components"):"".concat(r,"/").concat(c()(t,"[0].value"),":components")}))),[u,y]),{loading:_,error:w,remoteModules:O}=(0,o.useLoader)({modules:j}),{components:k,currentComponentName:M}=(0,n.useMemo)((()=>{if(_||w)return{};const e=Array.from(a.keys()),r=f()(O,((r,t,n)=>{Object.assign(r,f()(t,((r,t,o)=>{r[o]=Object.assign({},t,{libKey:e[n]})}),{}))}),{}),t=b&&r[b]?(g.current=r[b].libKey,b):(g.current=c()(Object.values(r),"[0].libKey"),c()(Object.keys(r),"[0]")),n=x.current!==t?(p((e=>e.filter((e=>{let{name:r}=e;return"version"!==r})))),x.current=t,c()(a.get(r[t].libKey),"version[0].value")):y||c()(a.get(r[t].libKey),"version[0].value");return{components:r,currentComponentName:t,version:n}}),[_,w,O,y,b,a]);if(_)return null;if(w)return(0,d.jsx)(i.Navigate,{to:"/error?msg=\u52a0\u8f7d\u8fdc\u7a0b\u7ec4\u4ef6\u5e93\u53ef\u80fd\u4e0d\u7b26\u5408\u89c4\u8303\uff0c\u60a8\u53ef\u4ee5\u5411\u5f00\u53d1\u8005\u62a5\u544a\u8be5\u95ee\u9898",replace:!0});const{AdvancedSelectFilterItem:A}=s;c()(k,"".concat(M,".libKey"));return(0,d.jsx)(m,{baseUrl:"/libs",readme:k,pageProps:{}})})),g=(0,o.createWithRemoteLoader)({modules:["Global@usePreset"]})((e=>{let{remoteModules:r}=e;const[t]=r,{apis:n}=t();return(0,d.jsx)(h,{...Object.assign({},n.manifest.getDetail)})}))},87520:(e,r,t)=>{var n=t(50448),o=t(22480),u=t(35496);function a(e){var r=-1,t=null==e?0:e.length;for(this.__data__=new n;++r<t;)this.add(e[r])}a.prototype.add=a.prototype.push=o,a.prototype.has=u,e.exports=a},50328:e=>{e.exports=function(e,r){for(var t=-1,n=null==e?0:e.length;++t<n&&!1!==r(e[t],t,e););return e}},83840:e=>{e.exports=function(e,r){for(var t=-1,n=null==e?0:e.length;++t<n;)if(r(e[t],t,e))return!0;return!1}},82928:(e,r,t)=>{var n=t(16328),o=t(87360);e.exports=function(e,r){return e&&n(e,r,o)}},17840:e=>{e.exports=function(e,r){return null!=e&&r in Object(e)}},29852:(e,r,t)=>{var n=t(81788),o=t(26920);e.exports=function e(r,t,u,a,i){return r===t||(null==r||null==t||!o(r)&&!o(t)?r!==r&&t!==t:n(r,t,u,a,e,i))}},81788:(e,r,t)=>{var n=t(83288),o=t(51304),u=t(17704),a=t(56664),i=t(51284),s=t(42336),c=t(95933),l=t(26660),f="[object Arguments]",v="[object Array]",p="[object Object]",b=Object.prototype.hasOwnProperty;e.exports=function(e,r,t,d,m,h){var g=s(e),x=s(r),y=g?v:i(e),j=x?v:i(r),_=(y=y==f?p:y)==p,w=(j=j==f?p:j)==p,O=y==j;if(O&&c(e)){if(!c(r))return!1;g=!0,_=!1}if(O&&!_)return h||(h=new n),g||l(e)?o(e,r,t,d,m,h):u(e,r,y,t,d,m,h);if(!(1&t)){var k=_&&b.call(e,"__wrapped__"),M=w&&b.call(r,"__wrapped__");if(k||M){var A=k?e.value():e,L=M?r.value():r;return h||(h=new n),m(A,L,t,d,h)}}return!!O&&(h||(h=new n),a(e,r,t,d,m,h))}},18304:(e,r,t)=>{var n=t(83288),o=t(29852);e.exports=function(e,r,t,u){var a=t.length,i=a,s=!u;if(null==e)return!i;for(e=Object(e);a--;){var c=t[a];if(s&&c[2]?c[1]!==e[c[0]]:!(c[0]in e))return!1}for(;++a<i;){var l=(c=t[a])[0],f=e[l],v=c[1];if(s&&c[2]){if(void 0===f&&!(l in e))return!1}else{var p=new n;if(u)var b=u(f,v,l,e,r,p);if(!(void 0===b?o(v,f,3,u,p):b))return!1}}return!0}},15908:(e,r,t)=>{var n=t(53828),o=t(30436),u=t(12208),a=t(42336),i=t(39072);e.exports=function(e){return"function"==typeof e?e:null==e?u:"object"==typeof e?a(e)?o(e[0],e[1]):n(e):i(e)}},53828:(e,r,t)=>{var n=t(18304),o=t(16152),u=t(1364);e.exports=function(e){var r=o(e);return 1==r.length&&r[0][2]?u(r[0][0],r[0][1]):function(t){return t===e||n(t,e,r)}}},30436:(e,r,t)=>{var n=t(29852),o=t(58564),u=t(37552),a=t(27424),i=t(10668),s=t(1364),c=t(13088);e.exports=function(e,r){return a(e)&&i(r)?s(c(e),r):function(t){var a=o(t,e);return void 0===a&&a===r?u(t,e):n(r,a,3)}}},50040:e=>{e.exports=function(e){return function(r){return null==r?void 0:r[e]}}},29480:(e,r,t)=>{var n=t(56016);e.exports=function(e){return function(r){return n(r,e)}}},46029:e=>{e.exports=function(e,r){return e.has(r)}},51304:(e,r,t)=>{var n=t(87520),o=t(83840),u=t(46029);e.exports=function(e,r,t,a,i,s){var c=1&t,l=e.length,f=r.length;if(l!=f&&!(c&&f>l))return!1;var v=s.get(e),p=s.get(r);if(v&&p)return v==r&&p==e;var b=-1,d=!0,m=2&t?new n:void 0;for(s.set(e,r),s.set(r,e);++b<l;){var h=e[b],g=r[b];if(a)var x=c?a(g,h,b,r,e,s):a(h,g,b,e,r,s);if(void 0!==x){if(x)continue;d=!1;break}if(m){if(!o(r,(function(e,r){if(!u(m,r)&&(h===e||i(h,e,t,a,s)))return m.push(r)}))){d=!1;break}}else if(h!==g&&!i(h,g,t,a,s)){d=!1;break}}return s.delete(e),s.delete(r),d}},17704:(e,r,t)=>{var n=t(31728),o=t(83764),u=t(60016),a=t(51304),i=t(83728),s=t(61860),c=n?n.prototype:void 0,l=c?c.valueOf:void 0;e.exports=function(e,r,t,n,c,f,v){switch(t){case"[object DataView]":if(e.byteLength!=r.byteLength||e.byteOffset!=r.byteOffset)return!1;e=e.buffer,r=r.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=r.byteLength||!f(new o(e),new o(r)));case"[object Boolean]":case"[object Date]":case"[object Number]":return u(+e,+r);case"[object Error]":return e.name==r.name&&e.message==r.message;case"[object RegExp]":case"[object String]":return e==r+"";case"[object Map]":var p=i;case"[object Set]":var b=1&n;if(p||(p=s),e.size!=r.size&&!b)return!1;var d=v.get(e);if(d)return d==r;n|=2,v.set(e,r);var m=a(p(e),p(r),n,c,f,v);return v.delete(e),m;case"[object Symbol]":if(l)return l.call(e)==l.call(r)}return!1}},56664:(e,r,t)=>{var n=t(772),o=Object.prototype.hasOwnProperty;e.exports=function(e,r,t,u,a,i){var s=1&t,c=n(e),l=c.length;if(l!=n(r).length&&!s)return!1;for(var f=l;f--;){var v=c[f];if(!(s?v in r:o.call(r,v)))return!1}var p=i.get(e),b=i.get(r);if(p&&b)return p==r&&b==e;var d=!0;i.set(e,r),i.set(r,e);for(var m=s;++f<l;){var h=e[v=c[f]],g=r[v];if(u)var x=s?u(g,h,v,r,e,i):u(h,g,v,e,r,i);if(!(void 0===x?h===g||a(h,g,t,u,i):x)){d=!1;break}m||(m="constructor"==v)}if(d&&!m){var y=e.constructor,j=r.constructor;y==j||!("constructor"in e)||!("constructor"in r)||"function"==typeof y&&y instanceof y&&"function"==typeof j&&j instanceof j||(d=!1)}return i.delete(e),i.delete(r),d}},16152:(e,r,t)=>{var n=t(10668),o=t(87360);e.exports=function(e){for(var r=o(e),t=r.length;t--;){var u=r[t],a=e[u];r[t]=[u,a,n(a)]}return r}},57712:(e,r,t)=>{var n=t(76284),o=t(8820),u=t(42336),a=t(7828),i=t(67184),s=t(13088);e.exports=function(e,r,t){for(var c=-1,l=(r=n(r,e)).length,f=!1;++c<l;){var v=s(r[c]);if(!(f=null!=e&&t(e,v)))break;e=e[v]}return f||++c!=l?f:!!(l=null==e?0:e.length)&&i(l)&&a(v,l)&&(u(e)||o(e))}},10668:(e,r,t)=>{var n=t(31792);e.exports=function(e){return e===e&&!n(e)}},83728:e=>{e.exports=function(e){var r=-1,t=Array(e.size);return e.forEach((function(e,n){t[++r]=[n,e]})),t}},1364:e=>{e.exports=function(e,r){return function(t){return null!=t&&(t[e]===r&&(void 0!==r||e in Object(t)))}}},22480:e=>{e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},35496:e=>{e.exports=function(e){return this.__data__.has(e)}},61860:e=>{e.exports=function(e){var r=-1,t=Array(e.size);return e.forEach((function(e){t[++r]=e})),t}},37552:(e,r,t)=>{var n=t(17840),o=t(57712);e.exports=function(e,r){return null!=e&&o(e,r,n)}},39072:(e,r,t)=>{var n=t(50040),o=t(29480),u=t(27424),a=t(13088);e.exports=function(e){return u(e)?n(a(e)):o(e)}},79483:(e,r,t)=>{var n=t(50328),o=t(65280),u=t(82928),a=t(15908),i=t(62420),s=t(42336),c=t(95933),l=t(64600),f=t(31792),v=t(26660);e.exports=function(e,r,t){var p=s(e),b=p||c(e)||v(e);if(r=a(r,4),null==t){var d=e&&e.constructor;t=b?p?new d:[]:f(e)&&l(d)?o(i(e)):{}}return(b?n:u)(e,(function(e,n,o){return r(t,e,n,o)})),t}}}]);
//# sourceMappingURL=480.3ae93d74.chunk.js.map