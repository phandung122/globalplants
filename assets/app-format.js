/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app-format.js":
/*!******************************!*\
  !*** ./src/js/app-format.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _custom_format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-format.js */ "./src/js/custom-format.js");
/* harmony import */ var _custom_format_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_custom_format_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./src/js/custom-format.js":
/*!*********************************!*\
  !*** ./src/js/custom-format.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener("DOMContentLoaded", function () {
  console.log('hello Format');
});

//hide menu item content
var menuElements = document.querySelectorAll('.main-format-guide-body-menu-item:not(.active) .main-format-guide-body-menu-content');
menuElements.forEach(function (element) {
  element.classList.add('collapse');
});
//hide tab content
var tabElements = document.querySelectorAll('.main-format-guide-body-tab:not(.active)');
tabElements.forEach(function (element) {
  element.classList.add('collapse');
});
//mobile menu content 
document.querySelector('.main-format-guide-body-menu-mobile-content').innerHTML = document.querySelector('.main-format-guide-body-menu-item.active .main-format-guide-body-menu-content-inner').innerHTML;
var formatMenuItems = document.querySelectorAll('.main-format-guide-body-menu-item-title');
formatMenuItems.forEach(function (formatMenuItem) {
  formatMenuItem.addEventListener('click', showFormatTab, false);
});
function showFormatTab() {
  var item = this.parentElement;
  var target = item.getAttribute('model-type');
  var formatMenuContent = this.nextElementSibling;
  if (item.classList.contains('active')) {
    //item.classList.remove('active');
    //formatMenuContent.style.height = 0+'px';
  } else {
    //deactive others menu
    var menuItems = document.querySelectorAll('.main-format-guide-body-menu-item');
    menuItems.forEach(function (element) {
      element.classList.remove('active');
      element.querySelector('.main-format-guide-body-menu-content').style.height = 0 + 'px';
    });
    //deactive others tab
    var tabItems = document.querySelectorAll('.main-format-guide-body-tab');
    tabItems.forEach(function (element) {
      element.classList.remove('active');
      element.style.height = 0 + 'px';
    });
    //active new menu
    item.classList.add('active');
    var height = formatMenuContent.querySelector('.main-format-guide-body-menu-content-inner').scrollHeight;
    formatMenuContent.style.height = height + 'px';
    //active new tab
    var activeTab = document.querySelector('.main-format-guide-body-tab[model-type="' + target + '"]');
    activeTab.classList.remove('active');
    var tabHeight = activeTab.querySelector('.main-format-guide-body-tab-inner').scrollHeight;
    activeTab.style.height = tabHeight + 'px';
    //mobile menu content 
    document.querySelector('.main-format-guide-body-menu-mobile-content').innerHTML = item.querySelector('.main-format-guide-body-menu-content-inner').innerHTML;
  }
}
;

//hide all file content
var elements = document.querySelectorAll('.format__file-content');
elements.forEach(function (element) {
  element.classList.add('collapse');
});
var formatFileLabels = document.querySelectorAll('.format__file-label');
formatFileLabels.forEach(function (formatFileLabel) {
  formatFileLabel.addEventListener('click', showFormatFile, false);
});
function showFormatFile() {
  //toggle item state
  var item = this.parentElement;
  var formatFileContent = this.nextElementSibling;
  if (item.classList.contains('active')) {
    item.classList.remove('active');
    formatFileContent.style.height = 0 + 'px';
  } else {
    item.classList.add('active');
    var height = formatFileContent.querySelector('.format__file-content-inner').scrollHeight;
    formatFileContent.style.height = height + 'px';
  }
}
;

/***/ }),

/***/ 2:
/*!************************************!*\
  !*** multi ./src/js/app-format.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/phandung122/Desktop/ThemeKit/GlobePlants/Phan Dung/globalplants/src/js/app-format.js */"./src/js/app-format.js");


/***/ })

/******/ });