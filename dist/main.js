!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var o=function(){var t=document.querySelector(".popup-dialog-menu"),e=function(t){0!=t.style.right&&(document.documentElement.clientWidth<576?(t.style.transition="0",t.style.cssText="top: -".concat(t.clientHeight,"px; right: ").concat(t.clientWidth,"px"),t.style.transition="1s"):t.style.cssText="")};e(t),window.addEventListener("resize",(function(){e(t)})),document.addEventListener("click",(function(n){var o=n.target;o.closest(".menu")?t.style.cssText="top: 0px; \n                                       right: ".concat(t.clientWidth,"px;\n                                       ").concat(document.documentElement.clientWidth<576?"transform: translate3d(0,0,0)":""):(!o.closest(".popup-dialog-menu")||o.closest(".popup-menu-nav")||o.closest(".close-menu"))&&e(t)}))},r=function(){document.querySelector("html").style.scrollBehavior="smooth"},i=function(){document.addEventListener("click",(function(t){var e,n=document.querySelector(".popup-repair-types");t.target.closest(".link-list-menu")||t.target.closest(".link-list-repair")?(n.style.visibility="visible",0!=e.style.right&&(document.documentElement.clientWidth<576?(e.style.transition="0",e.style.cssText="top: -".concat(e.clientHeight,"px; right: ").concat(e.clientWidth,"px"),e.style.transition="1s"):e.style.cssText="")):t.target.closest(".popup-dialog-repair-types")||(n.style.visibility="hidden")}))};(function(){var t=document.querySelector(".header-contacts__arrow");t.addEventListener("click",(function(){var e=document.querySelector(".header-contacts__phone-number-accord"),n=e.querySelector(".header-contacts__phone-number");""===e.style.position||"absolute"===e.style.position?(e.style.position="static",n.style.opacity=1,t.querySelector("img").style.cssText="transform: rotateX(180deg)",t.style.cssText="\n                display: flex;\n                flex-direction: column;\n                justify-content: flex-start;\n            "):(e.style.position="absolute",n.style.opacity=0,t.querySelector("img").style.cssText="transform: rotateX(0deg)")}))})(),o(),r(),i()}]);