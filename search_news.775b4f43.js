parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ewl2":[function(require,module,exports) {
"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,o(n.key),n)}}function n(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(t){var r=i(t,"string");return"symbol"===e(r)?r:String(r)}function i(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,r||"default");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var u="https://newsapi.org/v2/everything",a="af0e766a1ccf475588965f28a4346fe4",c=function(){function e(){t(this,e),this.queryPage=1,this.serchQuery=""}return n(e,[{key:"getNews",value:function(){var e=this,t="".concat(u,"?q=").concat(this.serchQuery,"&pageSize=5&page=").concat(this.queryPage);return fetch(t,{headers:{"X-Api-Key":a}}).then(function(e){return e.json()}).then(function(t){return e.incrementPage(),t})}},{key:"resetPage",value:function(){this.queryPage=1}},{key:"incrementPage",value:function(){this.queryPage+=1}}]),e}();exports.default=c;
},{}],"aXmE":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,r(o.key),o)}}function o(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}function r(e){var n=i(e,"string");return"symbol"===t(n)?n:String(n)}function i(e,n){if("object"!==t(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,n||"default");if("object"!==t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var u=function(){function t(n){var o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e(this,t),this.button=this.getButton(n),o&&this.hide()}return o(t,[{key:"getButton",value:function(){return document.querySelector(selector)}},{key:"enable",value:function(){this.button.disabled=!1,this.button.textContent="Load More"}},{key:"disable",value:function(){this.button.disabled=!0,this.button.textContent="Loading..."}},{key:"hide",value:function(){this.button.classList.add("hidden")}},{key:"show",value:function(){this.button.classList.remove("hidden")}}]),t}();exports.default=u;
},{}],"kK6b":[function(require,module,exports) {
"use strict";var e=n(require("./NewsApi")),t=n(require("./components/LoadMoreBtn"));function n(e){return e&&e.__esModule?e:{default:e}}var r=document.getElementById("form"),c=new t.default("#loadMoreBtn");r.addEventListener("submit",i),c.button.addEventListener("click",o);var a=new e.default;function i(e){e.preventDefault();var t=e.currentTarget;a.serchQuery=t.elements.news.value.trim(),s(),a.resetPage(),c.show(),o().finally(function(){return t.reset()})}function o(){a.getNews().then(function(e){var t=e.articles;if(0===t.length)throw new Error("No data");return t.reduce(function(e,t){return l(t)+e},"")}).then(u).catch(d)}function l(e){var t=e.author,n=e.title,r=e.description,c=e.url,a=e.urlToImage;return'\n    <div class="aricle-card">\n        <img src="'.concat(a,'" class="article-img">\n        <h2 class="aricle-title">').concat(n,'</h2>\n        <h3 class="aricle-author">').concat(t||"Anonym",'</h3>\n        <p class="article-description">').concat(r,'</p>\n        <a href="').concat(c,'" class="article-link" target="_blank">Read more</a>\n    </div>\n    ')}function u(e){document.getElementById("articlesWrapper").insertAdjacentHTML("beforeend",e)}function s(){document.getElementById("articlesWrapper").innerHTML=""}function d(e){console.error(e),u("<h1>Articles not foude</h1>")}
},{"./NewsApi":"Ewl2","./components/LoadMoreBtn":"aXmE"}]},{},["kK6b"], null)
//# sourceMappingURL=/JS-CW-10/search_news.775b4f43.js.map