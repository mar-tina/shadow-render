(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$"] = factory();
	else
		root["$"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/core.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! exports provided: html, init, Shadow, createShadowElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return Shadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShadowElement", function() { return createShadowElement; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Solution from https://stackoverflow.com/questions/10585029/parse-an-html-string-with-js
var parseRange = document.createRange();
var html = Range.prototype.createContextualFragment.bind(parseRange);
/**
 * Initializes the application .
 * @param {string} selector
 * @param {html-template} component
 * @param {doc} document - Passing in the document for testing purposes
 * @returns {void}
 */

var init = function init(selector, component, doc) {
  var el = {};

  if (doc !== undefined) {
    el = doc.querySelector(selector);
  } else {
    el = document.querySelector(selector);
  }

  el.attachShadow({
    mode: "open"
  });
  el.shadowRoot.appendChild(component);
};

var addListener = function addListener(type, elem, f, args) {
  elem["".concat(type)] = function (e) {
    if (args.defaultAction === "true") {
      e.preventDefault();
    }

    f(e, args);
  };
}; //Solution from MDN DOCS


function is_all_ws(nod) {
  // Use ECMA-262 Edition 3 String and RegExp features
  return !/[^\t\n\r ]/.test(nod.textContent);
}
/**
 * Passes the 'this' object to all the executing functions when node is mounted or unmounted
 * @param {THIS} elem - object that has reference to the current execution context
 * @param {function} f - onmount function to be called in the connectedCallback function
 */


var bindCycle = function bindCycle(elem, f) {
  if (typeof f !== "undefined") {
    f(elem);
  } else {
    console.log("Onmount function is undefined");
  }
};

var Shadow;

(function (Shadow) {
  (function (Base) {
    var BaseElement = function () {
      function BaseElement() {}

      BaseElement.prototype.clone = function (args) {
        var _temp;

        var clone = (_temp =
        /*#__PURE__*/
        function (_HTMLElement) {
          _inherits(clone, _HTMLElement);

          _createClass(clone, [{
            key: "connectedCallback",
            value: function connectedCallback() {
              bindCycle(this, args.lifecycle.onMount);
            }
          }]);

          function clone() {
            var _this;

            _classCallCheck(this, clone);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(clone).call(this));

            _defineProperty(_assertThisInitialized(_this), "setPassedAttribute", function (item) {
              var attrArray = Array.from(item.attributes);
              var allattributes = new Map();
              attrArray.map(function (attr) {
                allattributes.set("".concat(attr.nodeName), "".concat(attr.nodeValue));
              }, "");

              var component = _this._shadowRoot.getElementById(allattributes.get("id"));

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = allattributes.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _step$value = _slicedToArray(_step.value, 2),
                      key = _step$value[0],
                      value = _step$value[1];

                  if (key.startsWith("@")) {
                    key = key.substr(1);
                    addListener("".concat(key), component, _this.methods["".concat(value)], {
                      defaultAction: allattributes.get("default"),
                      ctx: _assertThisInitialized(_this),
                      bound: allattributes.get("bind")
                    });
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            });

            _defineProperty(_assertThisInitialized(_this), "recursivelyCheckForNodes", function (node, type) {
              if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                  _this.nestedNodes["".concat(type)].push(node);

                  _this.recursivelyCheckForNodes(node.childNodes[i], type);
                }
              } else {
                _this.nestedNodes["".concat(type)].push(node);
              }
            });

            _this.state = args.state;
            _this.methods = args.methods;
            _this.nestedNodes = {
              attrNodes: [],
              cleanNodes: []
            };
            _this.renderTemplate = document.createElement("template");
            _this._shadowRoot = _this.attachShadow({
              mode: "open"
            });

            _this._render();

            return _this;
          }

          _createClass(clone, [{
            key: "setState",
            value: function setState(props) {
              for (var key in props) {
                if (props.hasOwnProperty(key)) {
                  this.state[key] = props[key];
                }
              } // Solution inspired by https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
              //clearing all the nodes in the shadow root


              var i = 0;

              for (; i < this._shadowRoot.childNodes.length;) {
                this._shadowRoot.removeChild(this.shadowRoot.childNodes[i]);

                i = +1;
              }

              this._render();
            }
          }, {
            key: "clean",
            value: function clean(node) {
              var i = 0;

              for (; i < node.childNodes.length;) {
                if (node.childNodes[i].nodeType === 8 || node.childNodes[i].nodeType === 3 && is_all_ws(node.childNodes[i])) {
                  node.removeChild(node.childNodes[i]);
                } else if (node.childNodes[i].nodeType === 1) {
                  this.clean(node.childNodes[i]);
                }

                i += 1;
              }

              return node;
            }
          }, {
            key: "_render",
            value: function _render() {
              var newTemplate = args.template(this);
              var tempDiv = document.createElement("div");
              tempDiv.appendChild(newTemplate);
              this.renderTemplate.innerHTML = tempDiv.innerHTML;
              tempDiv.innerHTML = "";
              var cloned = this.clean(this.renderTemplate.content.cloneNode(true));
              tempDiv.appendChild(cloned);

              this._shadowRoot.appendChild(tempDiv.cloneNode(true));

              this._handleAttributes(this._shadowRoot.childNodes[0].childNodes);
            }
          }, {
            key: "_handleAttributes",
            value: function _handleAttributes(newTemplate) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = newTemplate[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var node = _step2.value;
                  this.recursivelyCheckForNodes(node, "attrNodes");
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              var filteredNodes = this.nestedNodes["attrNodes"].filter(function (elem) {
                return elem.id !== undefined && elem.id !== "";
              }); //empty nested nodes after every page refresh

              this.nestedNodes["attrNodes"] = [];
              filteredNodes.forEach(this.setPassedAttribute);
            }
          }]);

          return clone;
        }(_wrapNativeSuper(HTMLElement)), _temp);
        return clone;
      };

      return BaseElement;
    }();

    Base.BaseElement = BaseElement;
  })(Shadow.Base || (Shadow.Base = {}));
})(Shadow || (Shadow = {}));

var createShadowElement = function createShadowElement(args) {
  var newClass = new Shadow.Base.BaseElement.prototype.clone(args);
  return newClass;
};

/***/ })

/******/ });
});