!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=function(){var t=document.querySelector(".popup-dialog-menu"),e=function(t){0!=t.style.right&&(document.documentElement.clientWidth<576?(t.style.transition="0",t.style.cssText="top: -".concat(t.clientHeight,"px; right: ").concat(t.clientWidth,"px"),t.style.transition="1s"):t.style.cssText="")};e(t),window.addEventListener("resize",(function(){e(t)})),document.addEventListener("click",(function(n){var r=n.target;r.closest(".menu")?t.style.cssText="top: 0px; \n                                       right: ".concat(t.clientWidth,"px;\n                                       ").concat(document.documentElement.clientWidth<576?"transform: translate3d(0,0,0)":""):(!r.closest(".popup-dialog-menu")||r.closest(".popup-menu-nav")||r.closest(".close-menu"))&&e(t)}))},o=function(){document.querySelector("html").style.scrollBehavior="smooth"},i=function(){document.addEventListener("click",(function(t){var e,n=document.querySelector(".popup-repair-types");t.target.closest(".link-list-menu")||t.target.closest(".link-list-repair")?(n.style.visibility="visible",0!=e.style.right&&(document.documentElement.clientWidth<576?(e.style.transition="0",e.style.cssText="top: -".concat(e.clientHeight,"px; right: ").concat(e.clientWidth,"px"),e.style.transition="1s"):e.style.cssText="")):t.target.closest(".popup-dialog-repair-types")||(n.style.visibility="hidden")}))};function l(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return l=t.done,t},e:function(t){s=!0,i=t},f:function(){try{l||null==n.return||n.return()}finally{if(s)throw i}}}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var s=function(){!function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"+7 (___) ___-__-__",n=document.querySelectorAll(t);function r(t){var n=t.keyCode,r=e,o=r.replace(/\D/g,""),i=this.value.replace(/\D/g,"");console.log(r);var l=0,c=r.replace(/[_\d]/g,(function(t){return l<i.length?i.charAt(l++)||o.charAt(l):t}));-1!=(l=c.indexOf("_"))&&(c=c.slice(0,l));var s=r.substr(0,this.value.length).replace(/_+/g,(function(t){return"\\d{1,"+t.length+"}"})).replace(/[+()]/g,"\\$&");(!(s=new RegExp("^"+s+"$")).test(this.value)||this.value.length<5||n>47&&n<58)&&(this.value=c),"blur"==t.type&&this.value.length<5&&(this.value="")}var o,i=l(n);try{for(i.s();!(o=i.n()).done;){var c=o.value;c.addEventListener("input",r),c.addEventListener("focus",r),c.addEventListener("blur",r)}}catch(t){i.e(t)}finally{i.f()}}('[name="phone"]')},u=function(){document.addEventListener("click",(function(t){var e=document.querySelector(".popup-privacy");t.target.closest(".link-privacy")?e.style.visibility="visible":t.target.closest(".popup-dialog-privacy")||(e.style.visibility="hidden")}))};(function(){var t=document.querySelector(".header-contacts__arrow");t.addEventListener("click",(function(){var e=document.querySelector(".header-contacts__phone-number-accord"),n=e.querySelector(".header-contacts__phone-number");""===e.style.position||"absolute"===e.style.position?(e.style.position="static",n.style.opacity=1,t.querySelector("img").style.cssText="transform: rotateX(180deg)",t.style.cssText="\n                display: flex;\n                flex-direction: column;\n                justify-content: flex-start;\n            "):(e.style.position="absolute",n.style.opacity=0,t.querySelector("img").style.cssText="transform: rotateX(0deg)")}))})(),r(),o(),i(),s(),u()}]);