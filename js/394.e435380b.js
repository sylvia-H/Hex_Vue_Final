(self["webpackChunkhealthy_diet"]=self["webpackChunkhealthy_diet"]||[]).push([[394],{5695:function(t,e,n){
/*!
  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(n(493),n(9286))})(0,(function(t,e){"use strict";const n=t=>t&&"object"===typeof t&&"default"in t?t:{default:t},s=n(t),o=n(e),i=1e3,a="transitionend",r=t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:n}=window.getComputedStyle(t);const s=Number.parseFloat(e),o=Number.parseFloat(n);return s||o?(e=e.split(",")[0],n=n.split(",")[0],(Number.parseFloat(e)+Number.parseFloat(n))*i):0},l=t=>{t.dispatchEvent(new Event(a))},c=t=>!(!t||"object"!==typeof t)&&("undefined"!==typeof t.jquery&&(t=t[0]),"undefined"!==typeof t.nodeType),d=t=>c(t)?t.jquery?t[0]:t:"string"===typeof t&&t.length>0?document.querySelector(t):null,u=t=>{"function"===typeof t&&t()},f=(t,e,n=!0)=>{if(!n)return void u(t);const s=5,o=r(e)+s;let i=!1;const c=({target:n})=>{n===e&&(i=!0,e.removeEventListener(a,c),u(t))};e.addEventListener(a,c),setTimeout((()=>{i||l(e)}),o)},h="5.1.3";class p{constructor(t){t=d(t),t&&(this._element=t,s.default.set(this._element,this.constructor.DATA_KEY,this))}dispose(){s.default.remove(this._element,this.constructor.DATA_KEY),o.default.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((t=>{this[t]=null}))}_queueCallback(t,e,n=!0){f(t,e,n)}static getInstance(t){return s.default.get(d(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"===typeof e?e:null)}static get VERSION(){return h}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}return p}))},3863:function(t,e,n){
/*!
  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,s){t.exports=s(n(493),n(9286),n(3175),n(8737),n(5695))})(0,(function(t,e,n,s,o){"use strict";const i=t=>t&&"object"===typeof t&&"default"in t?t:{default:t},a=i(t),r=i(e),l=i(n),c=i(s),d=i(o),u=t=>null===t||void 0===t?`${t}`:{}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase(),f=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let n=t.getAttribute("href");if(!n||!n.includes("#")&&!n.startsWith("."))return null;n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),e=n&&"#"!==n?n.trim():null}return e},h=t=>{const e=f(t);return e&&document.querySelector(e)?e:null},p=t=>{const e=f(t);return e?document.querySelector(e):null},g=t=>!(!t||"object"!==typeof t)&&("undefined"!==typeof t.jquery&&(t=t[0]),"undefined"!==typeof t.nodeType),m=t=>g(t)?t.jquery?t[0]:t:"string"===typeof t&&t.length>0?document.querySelector(t):null,b=(t,e,n)=>{Object.keys(n).forEach((s=>{const o=n[s],i=e[s],a=i&&g(i)?"element":u(i);if(!new RegExp(o).test(a))throw new TypeError(`${t.toUpperCase()}: Option "${s}" provided type "${a}" but expected type "${o}".`)}))},y=t=>{t.offsetHeight},_=()=>{const{jQuery:t}=window;return t&&!document.body.hasAttribute("data-bs-no-jquery")?t:null},v=[],w=t=>{"loading"===document.readyState?(v.length||document.addEventListener("DOMContentLoaded",(()=>{v.forEach((t=>t()))})),v.push(t)):t()},C=t=>{w((()=>{const e=_();if(e){const n=t.NAME,s=e.fn[n];e.fn[n]=t.jQueryInterface,e.fn[n].Constructor=t,e.fn[n].noConflict=()=>(e.fn[n]=s,t.jQueryInterface)}}))},k="collapse",E="bs.collapse",x=`.${E}`,A=".data-api",T={toggle:!0,parent:null},M={toggle:"boolean",parent:"(null|element)"},D=`show${x}`,I=`shown${x}`,L=`hide${x}`,$=`hidden${x}`,O=`click${x}${A}`,j="show",N="collapse",q="collapsing",S="collapsed",z=`:scope .${N} .${N}`,U="collapse-horizontal",P="width",H="height",Y=".collapse.show, .collapse.collapsing",Z='[data-bs-toggle="collapse"]';class B extends d.default{constructor(t,e){super(t),this._isTransitioning=!1,this._config=this._getConfig(e),this._triggerArray=[];const n=c.default.find(Z);for(let s=0,o=n.length;s<o;s++){const t=n[s],e=h(t),o=c.default.find(e).filter((t=>t===this._element));null!==e&&o.length&&(this._selector=e,this._triggerArray.push(t))}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return T}static get NAME(){return k}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t,e=[];if(this._config.parent){const t=c.default.find(z,this._config.parent);e=c.default.find(Y,this._config.parent).filter((e=>!t.includes(e)))}const n=c.default.findOne(this._selector);if(e.length){const s=e.find((t=>n!==t));if(t=s?B.getInstance(s):null,t&&t._isTransitioning)return}const s=r.default.trigger(this._element,D);if(s.defaultPrevented)return;e.forEach((e=>{n!==e&&B.getOrCreateInstance(e,{toggle:!1}).hide(),t||a.default.set(e,E,null)}));const o=this._getDimension();this._element.classList.remove(N),this._element.classList.add(q),this._element.style[o]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(q),this._element.classList.add(N,j),this._element.style[o]="",r.default.trigger(this._element,I)},l=o[0].toUpperCase()+o.slice(1),d=`scroll${l}`;this._queueCallback(i,this._element,!0),this._element.style[o]=`${this._element[d]}px`}hide(){if(this._isTransitioning||!this._isShown())return;const t=r.default.trigger(this._element,L);if(t.defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,y(this._element),this._element.classList.add(q),this._element.classList.remove(N,j);const n=this._triggerArray.length;for(let o=0;o<n;o++){const t=this._triggerArray[o],e=p(t);e&&!this._isShown(e)&&this._addAriaAndCollapsedClass([t],!1)}this._isTransitioning=!0;const s=()=>{this._isTransitioning=!1,this._element.classList.remove(q),this._element.classList.add(N),r.default.trigger(this._element,$)};this._element.style[e]="",this._queueCallback(s,this._element,!0)}_isShown(t=this._element){return t.classList.contains(j)}_getConfig(t){return t={...T,...l.default.getDataAttributes(this._element),...t},t.toggle=Boolean(t.toggle),t.parent=m(t.parent),b(k,t,M),t}_getDimension(){return this._element.classList.contains(U)?P:H}_initializeChildren(){if(!this._config.parent)return;const t=c.default.find(z,this._config.parent);c.default.find(Z,this._config.parent).filter((e=>!t.includes(e))).forEach((t=>{const e=p(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e))}))}_addAriaAndCollapsedClass(t,e){t.length&&t.forEach((t=>{e?t.classList.remove(S):t.classList.add(S),t.setAttribute("aria-expanded",e)}))}static jQueryInterface(t){return this.each((function(){const e={};"string"===typeof t&&/show|hide/.test(t)&&(e.toggle=!1);const n=B.getOrCreateInstance(this,e);if("string"===typeof t){if("undefined"===typeof n[t])throw new TypeError(`No method named "${t}"`);n[t]()}}))}}return r.default.on(document,O,Z,(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();const e=h(this),n=c.default.find(e);n.forEach((t=>{B.getOrCreateInstance(t,{toggle:!1}).toggle()}))})),C(B),B}))},493:function(t){
/*!
  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,n){t.exports=n()})(0,(function(){"use strict";const t=new Map,e={set(e,n,s){t.has(e)||t.set(e,new Map);const o=t.get(e);o.has(n)||0===o.size?o.set(n,s):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get(e,n){return t.has(e)&&t.get(e).get(n)||null},remove(e,n){if(!t.has(e))return;const s=t.get(e);s.delete(n),0===s.size&&t.delete(e)}};return e}))},9286:function(t){
/*!
  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,n){t.exports=n()})(0,(function(){"use strict";const t=()=>{const{jQuery:t}=window;return t&&!document.body.hasAttribute("data-bs-no-jquery")?t:null},e=/[^.]*(?=\..*)\.|.*/,n=/\..*/,s=/::\d+$/,o={};let i=1;const a={mouseenter:"mouseover",mouseleave:"mouseout"},r=/^(mouseenter|mouseleave)/i,l=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function c(t,e){return e&&`${e}::${i++}`||t.uidEvent||i++}function d(t){const e=c(t);return t.uidEvent=e,o[e]=o[e]||{},o[e]}function u(t,e){return function n(s){return s.delegateTarget=t,n.oneOff&&_.off(t,s.type,e),e.apply(t,[s])}}function f(t,e,n){return function s(o){const i=t.querySelectorAll(e);for(let{target:a}=o;a&&a!==this;a=a.parentNode)for(let r=i.length;r--;)if(i[r]===a)return o.delegateTarget=a,s.oneOff&&_.off(t,o.type,e,n),n.apply(a,[o]);return null}}function h(t,e,n=null){const s=Object.keys(t);for(let o=0,i=s.length;o<i;o++){const i=t[s[o]];if(i.originalHandler===e&&i.delegationSelector===n)return i}return null}function p(t,e,n){const s="string"===typeof e,o=s?n:e;let i=y(t);const a=l.has(i);return a||(i=t),[s,o,i]}function g(t,n,s,o,i){if("string"!==typeof n||!t)return;if(s||(s=o,o=null),r.test(n)){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};o?o=t(o):s=t(s)}const[a,l,g]=p(n,s,o),m=d(t),b=m[g]||(m[g]={}),y=h(b,l,a?s:null);if(y)return void(y.oneOff=y.oneOff&&i);const _=c(l,n.replace(e,"")),v=a?f(t,s,o):u(t,s);v.delegationSelector=a?s:null,v.originalHandler=l,v.oneOff=i,v.uidEvent=_,b[_]=v,t.addEventListener(g,v,a)}function m(t,e,n,s,o){const i=h(e[n],s,o);i&&(t.removeEventListener(n,i,Boolean(o)),delete e[n][i.uidEvent])}function b(t,e,n,s){const o=e[n]||{};Object.keys(o).forEach((i=>{if(i.includes(s)){const s=o[i];m(t,e,n,s.originalHandler,s.delegationSelector)}}))}function y(t){return t=t.replace(n,""),a[t]||t}const _={on(t,e,n,s){g(t,e,n,s,!1)},one(t,e,n,s){g(t,e,n,s,!0)},off(t,e,n,o){if("string"!==typeof e||!t)return;const[i,a,r]=p(e,n,o),l=r!==e,c=d(t),u=e.startsWith(".");if("undefined"!==typeof a){if(!c||!c[r])return;return void m(t,c,r,a,i?n:null)}u&&Object.keys(c).forEach((n=>{b(t,c,n,e.slice(1))}));const f=c[r]||{};Object.keys(f).forEach((n=>{const o=n.replace(s,"");if(!l||e.includes(o)){const e=f[n];m(t,c,r,e.originalHandler,e.delegationSelector)}}))},trigger(e,n,s){if("string"!==typeof n||!e)return null;const o=t(),i=y(n),a=n!==i,r=l.has(i);let c,d=!0,u=!0,f=!1,h=null;return a&&o&&(c=o.Event(n,s),o(e).trigger(c),d=!c.isPropagationStopped(),u=!c.isImmediatePropagationStopped(),f=c.isDefaultPrevented()),r?(h=document.createEvent("HTMLEvents"),h.initEvent(i,d,!0)):h=new CustomEvent(n,{bubbles:d,cancelable:!0}),"undefined"!==typeof s&&Object.keys(s).forEach((t=>{Object.defineProperty(h,t,{get(){return s[t]}})})),f&&h.preventDefault(),u&&e.dispatchEvent(h),h.defaultPrevented&&"undefined"!==typeof c&&c.preventDefault(),h}};return _}))},3175:function(t){
/*!
  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,n){t.exports=n()})(0,(function(){"use strict";function t(t){return"true"===t||"false"!==t&&(t===Number(t).toString()?Number(t):""===t||"null"===t?null:t)}function e(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}const n={setDataAttribute(t,n,s){t.setAttribute(`data-bs-${e(n)}`,s)},removeDataAttribute(t,n){t.removeAttribute(`data-bs-${e(n)}`)},getDataAttributes(e){if(!e)return{};const n={};return Object.keys(e.dataset).filter((t=>t.startsWith("bs"))).forEach((s=>{let o=s.replace(/^bs/,"");o=o.charAt(0).toLowerCase()+o.slice(1,o.length),n[o]=t(e.dataset[s])})),n},getDataAttribute(n,s){return t(n.getAttribute(`data-bs-${e(s)}`))},offset(t){const e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset}},position(t){return{top:t.offsetTop,left:t.offsetLeft}}};return n}))},8737:function(t){
/*!
  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(e,n){t.exports=n()})(0,(function(){"use strict";const t=t=>!(!t||"object"!==typeof t)&&("undefined"!==typeof t.jquery&&(t=t[0]),"undefined"!==typeof t.nodeType),e=e=>!(!t(e)||0===e.getClientRects().length)&&"visible"===getComputedStyle(e).getPropertyValue("visibility"),n=t=>!t||t.nodeType!==Node.ELEMENT_NODE||(!!t.classList.contains("disabled")||("undefined"!==typeof t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled"))),s=3,o={find(t,e=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(e,t))},findOne(t,e=document.documentElement){return Element.prototype.querySelector.call(e,t)},children(t,e){return[].concat(...t.children).filter((t=>t.matches(e)))},parents(t,e){const n=[];let o=t.parentNode;while(o&&o.nodeType===Node.ELEMENT_NODE&&o.nodeType!==s)o.matches(e)&&n.push(o),o=o.parentNode;return n},prev(t,e){let n=t.previousElementSibling;while(n){if(n.matches(e))return[n];n=n.previousElementSibling}return[]},next(t,e){let n=t.nextElementSibling;while(n){if(n.matches(e))return[n];n=n.nextElementSibling}return[]},focusableChildren(t){const s=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(", ");return this.find(s,t).filter((t=>!n(t)&&e(t)))}};return o}))},719:function(t,e,n){"use strict";n.d(e,{Z:function(){return vt}});var s=n(6252),o=n(3577);const i={ref:"cart_canvas",class:"offcanvas offcanvas-end bg-light",tabindex:"-1","aria-labelledby":"cartLabel"},a=(0,s._)("div",{class:"offcanvas-header p-6"},[(0,s._)("div"),(0,s._)("button",{type:"button",class:"btn-close text-reset","data-bs-dismiss":"offcanvas","aria-label":"Close"})],-1),r={class:"offcanvas-body fashion-scrollbar py-0 px-8 h-100"},l={key:0,class:"bg-white border p-4"},c={class:"mb-2"},d=(0,s.Uk)(" 您所選購的商品"),u=(0,s._)("span",{class:"fw-bold ms-2"},"總熱量",-1),f=(0,s._)("span",{class:"text-green1 fw-bold"},"碳水化合物",-1),h=(0,s._)("span",{class:"text-green1 fw-bold"},"粗蛋白質",-1),p=(0,s._)("span",{class:"text-green1 fw-bold"},"粗脂肪",-1),g={key:1,class:"d-flex flex-column align-items-center justify-content-center h-100"},m=(0,s._)("i",{class:"bi bi-cart4 text-gray fz-24"},null,-1),b=(0,s._)("p",{class:"text-gray fz-5 mb-6"},"把喜愛的美食加進來吧！",-1),y=(0,s._)("button",{type:"button",class:"btn btn-warning px-4 py-2"},"來去逛逛",-1),_={class:"row g-0"},v={class:"col-2 d-flex justify-content-center align-items-center"},w=["onClick"],C=(0,s._)("i",{class:"bi bi-trash3-fill fz-5"},null,-1),k=[C],E={class:"col-4 border"},x=["src","alt"],A={class:"col-6 ps-4"},T={class:"row"},M={class:"col-12 d-flex flex-column"},D={class:"mb-2"},I={class:"mb-2"},L=(0,s.Uk)(" NT "),$={key:0,class:"text-gray"},O={class:"w-75 btn-group d-flex justify-content-around align-items-center",role:"group","aria-label":"Basic"},j=["onClick","disabled"],N=["value"],q=["onClick"],S={key:0,class:"offcanvas-footer bg-cream3 border-2 border-top px-9"},z={class:"d-flex justify-content-end align-items-center py-4"},U=(0,s._)("p",{class:"h5 text-dark me-24"},"總計",-1),P={class:"h5 text-dark ms-2"},H=["disabled"],Y={class:"text-end"},Z=["disabled"];function B(t,e,n,C,B,K){const W=(0,s.up)("RouterLink"),F=(0,s.up)("ModalDelCart");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",i,[a,(0,s._)("div",r,[B.cartsTotal?((0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("h6",c,[d,u,(0,s.Uk)("："+(0,o.zw)(B.calorie)+" kcal(仟卡) ",1)]),(0,s._)("div",null,[f,(0,s.Uk)(" "+(0,o.zw)(B.carbohydrate)+" g、 ",1),h,(0,s.Uk)(" "+(0,o.zw)(B.protein)+" g、 ",1),p,(0,s.Uk)(" "+(0,o.zw)(B.crudeFat)+" g ",1)])])):((0,s.wg)(),(0,s.iD)("div",g,[m,b,(0,s.Wm)(W,{to:"/products",onClick:K.closeCanvas},{default:(0,s.w5)((()=>[y])),_:1},8,["onClick"])])),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(B.carts.carts,(t=>((0,s.wg)(),(0,s.iD)("div",{key:t.id,class:"py-6 px-4 mb-3 border-bottom"},[(0,s._)("div",_,[(0,s._)("div",v,[(0,s._)("button",{onClick:e=>K.openDelCartModal(t.id,t.product.title),class:"btn",type:"button"},k,8,w)]),(0,s._)("div",E,[(0,s._)("img",{class:"img-cover",src:t.product.imageUrl,alt:t.product.title},null,8,x)]),(0,s._)("div",A,[(0,s._)("div",T,[(0,s._)("div",M,[(0,s._)("h5",D,(0,o.zw)(t.product.title),1),(0,s._)("p",I,[L,t.product.origin_price!==t.product.price?((0,s.wg)(),(0,s.iD)("span",$,[(0,s._)("s",null,(0,o.zw)(t.product.origin_price),1)])):(0,s.kq)("",!0),(0,s.Uk)(" "+(0,o.zw)(t.product.price)+" 元 ",1)]),(0,s._)("div",O,[(0,s._)("button",{onClick:e=>K.editCart(t.id,t.qty-1),disabled:t.qty-1===0,type:"button",class:"btn btn-outline-dark fw-bold"}," － ",8,j),(0,s._)("input",{value:t.qty,type:"text",class:"border-dark form-control-plaintext fw-bold text-black text-center"},null,8,N),(0,s._)("button",{onClick:e=>K.editCart(t.id,t.qty+1),type:"button",class:"btn btn-outline-dark fw-bold"}," ＋ ",8,q)])])])])])])))),128))]),B.cartsTotal?((0,s.wg)(),(0,s.iD)("div",S,[(0,s._)("div",z,[U,(0,s._)("span",P,"NT$ "+(0,o.zw)(B.carts.total),1)]),(0,s.Wm)(W,{to:{name:"checkoutCart"},class:(0,o.C_)({"pe-none":!B.cartsTotal})},{default:(0,s.w5)((()=>[(0,s._)("button",{type:"button",class:"w-100 btn btn-green1 rounded-0 py-2 fw-bold",disabled:0===B.carts.carts?.length,onClick:e[0]||(e[0]=t=>K.closeCanvas())}," 前往結帳 ",8,H)])),_:1},8,["class"]),(0,s._)("div",Y,[(0,s._)("button",{type:"button",class:"btn text-gray py-4 px-0",disabled:0===B.carts.carts?.length,onClick:e[1]||(e[1]=t=>K.openDelCartModal())}," 清空購物車 ",8,Z)])])):(0,s.kq)("",!0)],512),(0,s.Wm)(F,{ref:"delCartModal"},null,512)],64)}var K=n(7244);const W={class:"modal fade border-0",id:"delCartModal",tabindex:"-1","aria-labelledby":"delCartModalLabel","aria-hidden":"true"},F={class:"modal-dialog modal-dialog-centered"},V={class:"modal-content"},Q={class:"modal-header bg-danger text-white"},R={class:"modal-title"},G={key:0},J={key:1},X={class:"modal-body fz-5"},tt={key:0},et=(0,s.Uk)(" 是否刪除 "),nt={class:"text-danger"},st=(0,s.Uk)(" ？"),ot=(0,s._)("br",null,null,-1),it=(0,s.Uk)(" (刪除後將無法恢復) "),at={key:1},rt=(0,s._)("strong",{class:"text-danger"},"確定要清空購物車嗎",-1),lt=(0,s.Uk)(" ？"),ct=(0,s._)("br",null,null,-1),dt=(0,s.Uk)(" (刪除後將無法恢復) "),ut=[rt,lt,ct,dt],ft={class:"modal-footer"};function ht(t,e,n,i,a,r){return(0,s.wg)(),(0,s.iD)("div",W,[(0,s._)("div",F,[(0,s._)("div",V,[(0,s._)("div",Q,[(0,s._)("h5",R,[a.itemInfo.title?((0,s.wg)(),(0,s.iD)("span",G," 刪除 "+(0,o.zw)(a.itemInfo.title),1)):((0,s.wg)(),(0,s.iD)("span",J," 清空購物車 "))]),(0,s._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:e[0]||(e[0]=t=>r.closeModal())})]),(0,s._)("div",X,[a.itemInfo.title?((0,s.wg)(),(0,s.iD)("p",tt,[et,(0,s._)("strong",nt,(0,o.zw)(a.itemInfo.title),1),st,ot,it])):((0,s.wg)(),(0,s.iD)("p",at,ut))]),(0,s._)("div",ft,[(0,s._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal",onClick:e[1]||(e[1]=t=>r.closeModal())}," 取消 "),(0,s._)("button",{type:"button",class:"btn btn-danger",onClick:e[2]||(e[2]=t=>{r.delCart()})}," 確認刪除 ")])])])])}var pt={name:"ModalDelCart",data(){return{modal:"",itemInfo:{}}},inject:["emitter"],methods:{openModal(t,e){t&&e&&(this.itemInfo.id=t,this.itemInfo.title=e),this.modal.show()},closeModal(){this.itemInfo={},this.modal.hide()},delCart(){let t="";this.itemInfo.id?(t=`https://vue3-course-api.hexschool.io/v2/api/sylviah/cart/${this.itemInfo.id}`,this.$http.delete(t).then((()=>{this.emitter.emit("toast-msg",{style:"success",content:`您已將${this.itemInfo.title}刪除了！`}),this.closeModal(),this.emitter.emit("get-cart"),this.itemInfo={}})).catch((t=>{const e=t.response.data.message||"刪除失敗，請再試一次！";this.emitter.emit("toast-msg",{style:"error",content:`${e}`}),this.closeModal(),this.itemInfo={}}))):(t="https://vue3-course-api.hexschool.io/v2/api/sylviah/carts",this.$http.delete(t).then((()=>{this.emitter.emit("toast-msg",{style:"success",content:"您已將購物車清空了！"}),this.closeModal(),this.emitter.emit("get-cart"),this.itemInfo={}})).catch((t=>{const e=t.response.data.message||"刪除失敗，請再試一次！";this.emitter.emit("toast-msg",{style:"error",content:`${e}`}),this.closeModal(),this.itemInfo={}})))}},mounted(){this.modal=new K.u_(document.getElementById("delCartModal"))}},gt=n(3744);const mt=(0,gt.Z)(pt,[["render",ht]]);var bt=mt,yt={name:"CanvasCart",components:{ModalDelCart:bt},data(){return{canvas:"",carts:[],cartsTotal:0,calorie:0,carbohydrate:0,protein:0,crudeFat:0,isLoading:!1}},inject:["emitter"],methods:{calcNutrients(){this.calorie=0,this.carbohydrate=0,this.protein=0,this.crudeFat=0,this.carts.carts.forEach((t=>{this.calorie+=Math.floor(t.product.calorie*(t.product.number/100)*t.qty),this.carbohydrate+=Math.floor(t.product.carbohydrate*(t.product.number/100)*t.qty),this.protein+=Math.floor(t.product.protein*(t.product.number/100)*t.qty),this.crudeFat+=Math.floor(t.product.crudeFat*(t.product.number/100)*t.qty)}))},getCart(){this.isLoading=!0,this.$http.get("https://vue3-course-api.hexschool.io/v2/api/sylviah/cart").then((t=>{this.carts=t.data.data,this.cartsTotal=this.calcCartsTotal(this.carts.carts),this.calcNutrients(),this.isLoading=!1})).catch((t=>{console.dir(t),this.isLoading=!1}))},calcCartsTotal(t){let e=0;return t.forEach((t=>{e+=t.qty})),e},openCanvas(){this.getCart(),this.canvas.show()},closeCanvas(){this.canvas.hide()},editCart(t,e){this.isLoading=!0;const n={product_id:t,qty:e};this.$http.put(`https://vue3-course-api.hexschool.io/v2/api/sylviah/cart/${t}`,{data:n}).then((()=>{this.getCart(),this.emitter.emit("get-cart"),this.isLoading=!1})).catch((()=>{this.isLoading=!1}))},openDelCartModal(t,e){this.$refs.delCartModal.openModal(t,e)}},mounted(){this.getCart(),this.canvas=new K.TB(this.$refs.cart_canvas),this.emitter.on("get-cart",(()=>{this.getCart()}))}};const _t=(0,gt.Z)(yt,[["render",B]]);var vt=_t},912:function(t,e,n){"use strict";n.d(e,{Z:function(){return g}});var s=n(6252);const o={ref:"footer",class:"bg-dark text-white"},i={class:"h-100 position-relative"},a={class:"d-flex justify-content-center align-items-center position-absolute top-0 start-0 bottom-0 end-0 m-auto fz-4"},r=(0,s._)("p",{class:"d-none d-md-block"}," HEALTHY DIET © 2022. All Rights Reserved. ",-1),l=(0,s._)("p",{class:"d-block d-md-none"}," HEALTHY DIET © 2022. ",-1),c=(0,s._)("span",{class:"mx-4"}," | ",-1);function d(t,e,n,d,u,f){const h=(0,s.up)("ModalLogin");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("footer",o,[(0,s._)("div",i,[(0,s._)("div",a,[r,l,c,(0,s._)("div",{class:"btn text-white fz-4 p-0 m-0",onClick:e[0]||(e[0]=t=>f.openLoginModel()),onKeydown:e[1]||(e[1]=(...e)=>t.enter&&t.enter(...e))}," 後台 ",32)])])],512),(0,s.Wm)(h,{ref:"loginModal"},null,512)],64)}var u=n(7071),f={name:"FrontFooter",components:{ModalLogin:u.Z},methods:{openLoginModel(){this.$refs.loginModal.openModal()}}},h=n(3744);const p=(0,h.Z)(f,[["render",d]]);var g=p},7071:function(t,e,n){"use strict";n.d(e,{Z:function(){return C}});var s=n(6252),o=n(9963);const i={class:"modal fade",id:"loginModal",tabindex:"-1","aria-labelledby":"loginModalLabel","aria-hidden":"true"},a={class:"modal-dialog modal-sm modal-dialog-centered"},r={class:"modal-content"},l={class:"modal-body text-center | py-8"},c=(0,s._)("h2",{class:"fw-bold text-green1 | mb-3"}," 好食遞 ",-1),d=(0,s._)("img",{src:"https://storage.googleapis.com/vue-course-api.appspot.com/sylviah/1649313622566.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=eaP3G7k7oveDkzEmK8P660klrEd0CkisflI1l63DLRmnAcfcAVGaWlgCN2MiN5%2Bfbrq77jpO5tLTrdk71OV6ZjKM2CqPIW6G2eeNT2OuG8V%2FW9CmrsfKdI%2BNOdKfsQPxt28oEJy2g5KQMIZA%2B81FcQCcUdUKbkUdudoPu8Bcr084Tln0OZgWU9W7uk8ZMQT8NTmmD%2BUq6HdrEpPdN8j0PttcHonogdikfeRZJJmVCXooeDC76AOOMIx2xYKxk%2BsAnzur2WIMZXIKCHf86eWUtUa3Oy2o3UOxkZYJGbayCki%2BAVZfGda5leYS8vyZmeroPrGO%2FUqnElfxpDmTaeh1hQ%3D%3D",alt:"Healthy-Diet LOGO",class:"mb-3"},null,-1),u=(0,s._)("h4",{class:"text-green1 | mb-4"}," HEALTHY DIET ",-1),f={id:"form"},h={class:"form-floating mb-4"},p=(0,s._)("label",{for:"username",class:"text-brown1 fw-bold"},"Email address",-1),g={class:"form-floating mb-4"},m=(0,s._)("label",{for:"password",class:"text-brown1 fw-bold"},"Password",-1);function b(t,e,n,b,y,_){return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("div",a,[(0,s._)("div",r,[(0,s._)("div",l,[c,d,u,(0,s._)("form",f,[(0,s._)("div",h,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>y.userInfo.username=t),type:"email",id:"username",class:"form-control",placeholder:"name@example.com",required:""},null,512),[[o.nr,y.userInfo.username]]),p]),(0,s._)("div",g,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>y.userInfo.password=t),type:"password",id:"password",class:"form-control",placeholder:"Password",required:""},null,512),[[o.nr,y.userInfo.password]]),m]),(0,s._)("button",{onClick:e[2]||(e[2]=(...t)=>_.loginIn&&_.loginIn(...t)),class:"btn btn-lg btn-green2 text-white fw-bold w-100 mt-4",type:"button"}," 登 入 ")])])])])])}var y=n(7244),_={name:"ModalLogin",data(){return{modal:"",userInfo:{username:"",password:""}}},methods:{openModal(){this.modal.show()},closeModal(){this.modal.hide()},loginIn(){this.$http.post("https://vue3-course-api.hexschool.io/v2/admin/signin",this.userInfo).then((t=>{const{token:e,expired:n}=t.data;document.cookie=`myToken=${e}; expires=${new Date(n)};`,this.closeModal(),this.$router.push({name:"dashboard_Products"})})).catch((t=>{const e=t.response.data.message,n=t.response.data.error.message;this.$swal.fire({icon:"error",title:`${e}！`,text:n})}))}},mounted(){this.modal=new y.u_(document.getElementById("loginModal"))}},v=n(3744);const w=(0,v.Z)(_,[["render",b]]);var C=w}}]);
//# sourceMappingURL=394.e435380b.js.map