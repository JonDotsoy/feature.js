/*!
 * FEATURE.JS 1.0.1, A Fast, simple and lightweight browser feature
 * detection library in just 1kb.
 *
 * http://featurejs.com
 *
 * CSS 3D Transform, CSS Transform, CSS Transition, Canvas, SVG,
 * addEventListener, querySelectorAll, matchMedia, classList API,
 * placeholder, localStorage, History API, Viewport Units, REM Units,
 * CORS, WebGL, Service Worker, Context Menu, Geolocation,
 * Device Motion, Device Orientation, Touch, Async, Defer,
 * Srcset, Sizes & Picture Element.
 *
 *
 * USAGE EXAMPLE:
 * if (feature.webGL) {
 *   console.log("webGL supported!");
 * }
 *
 * Author: @viljamis, https://viljamis.com
 */


/* globals DocumentTouch */
// ;(function (window, document, undefined) {
"use strict";

var Platform = {
  isNode: ((function () {
    return (typeof (process) === 'object' && typeof(module.exports) === 'object' && Object.prototype.toString.call(process) === '[object process]');
  })()),
  isBrowser: ((function () {
    return (typeof(window) === 'object' && typeof(document) === 'object' && Object.prototype.toString.call(window) === '[object global]');
  })()),
}

var Feature = {
  node: Platform.isNode,
  browser: Platform.isBrowser,
  async: false,
  addEventListener: false,
  canvas: false,
  classList: false,
  cors: false,
  contextMenu: false,
  css3Dtransform: false,
  cssTransform: false,
  cssTransition: false,
  defer: false,
  deviceMotion: false,
  deviceOrientation: false,
  geolocation: false,
  historyAPI: false,
  placeholder: false,
  localStorage: false,
  matchMedia: false,
  pictureElement: false,
  querySelectorAll: false,
  remUnit: false,
  serviceWorker: false,
  sizes: false,
  srcset: false,
  svg: false,
  touch: false,
  viewportUnit: false,
  webGL: false,
};


if (Feature.browser) {

  // For minification only
  var docEl = document.documentElement;


  /**
   * Utilities
   */
  var util = {

    /**
     * Simple create element method
     */
    create : function(el) {
      if (Platform.isBrowser) {
        return document.createElement(el);
      } else {
        return false;
      }
    },

    /**
     * Test if it's an old device that we want to filter out
     */
    old : !!(/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent)),

    /**
     * Function that takes a standard CSS property name as a parameter and
     * returns it's prefixed version valid for current browser it runs in
     */
    pfx : (function() {
      var style = document.createElement("dummy").style;
      var prefixes = ["Webkit", "Moz", "O", "ms"];
      var memory = {};
      return function(prop) {
        if (typeof memory[prop] === "undefined") {
          var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
            props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");
            memory[prop] = null;
          for (var i in props) {
            if (style[props[i]] !== undefined) {
              memory[prop] = props[i];
              break;
            }
          }
        }
        return memory[prop];
      };
    })()

  };


  /**
   * The Feature.js object
   */

  // Test if CSS 3D transforms are supported
  Feature.css3Dtransform= (function() {
    var test = (!util.old && util.pfx("perspective") !== null);
    return !!test;
  })();

  // Test if CSS transforms are supported
  Feature.cssTransform= (function() {
    var test = (!util.old && util.pfx("transformOrigin") !== null);
    return !!test;
  })();

  // Test if CSS transitions are supported
  Feature.cssTransition = (function() {
    var test = util.pfx("transition") !== null;
    return !!test;
  })();

  // Test if addEventListener is supported
  Feature.addEventListener = !!window.addEventListener;

  // Test if querySelectorAll is supported
  Feature.querySelectorAll = !!document.querySelectorAll;

  // Test if matchMedia is supported
  Feature.matchMedia = !!window.matchMedia;

  // Test if Device Motion is supported
  Feature.deviceMotion = ("DeviceMotionEvent" in window);

  // Test if Device Orientation is supported
  Feature.deviceOrientation = ("DeviceOrientationEvent" in window);

  // Test if Context Menu is supported
  Feature.contextMenu = ("contextMenu" in docEl && "HTMLMenuItemElement" in window);

  // Test if classList API is supported
  Feature.classList = ("classList" in docEl);

  // Test if placeholder attribute is supported
  Feature.placeholder = ("placeholder" in util.create("input"));

  // Test if localStorage is supported
  Feature.localStorage = (function() {
    var test = "x";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(err) {
      return false;
    }
  })();

  // Test if History API is supported
  Feature.historyAPI = (window.history && "pushState" in window.history);

  // Test if ServiceWorkers are supported
  Feature.serviceWorker = ("serviceWorker" in navigator);

  // Test if viewport units are supported
  Feature.viewportUnit = (function(el) {
    try {
      el.style.width = "1vw";
      var test = el.style.width !== "";
      return !!test;
    } catch(err) {
      return false;
    }
  })(util.create("dummy"));

  // Test if REM units are supported
  Feature.remUnit = (function(el) {
    try {
      el.style.width = "1rem";
      var test = el.style.width !== "";
      return !!test;
    } catch(err) {
      return false;
    }
  })(util.create("dummy"));

  // Test if Canvas is supported
  Feature.canvas = (function(el) {
    return !!(el.getContext && el.getContext("2d"));
  })(util.create("canvas"));

  // Test if SVG is supported
  Feature.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;

  // Test if WebGL is supported
  Feature.webGL = (function(el) {
    try {
      return !!(window.WebGLRenderingContext && (el.getContext("webgl") || el.getContext("experimental-webgl")));
    } catch(err) {
      return false;
    }
  })(util.create("canvas"));

  // Test if cors is supported
  Feature.cors = ("XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest());

  // Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
  Feature.touch = !!(("ontouchstart" in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch);

  // Test if async attribute is supported
  Feature.async = ("async" in util.create("script"));

  // Test if defer attribute is supported
  Feature.defer = ("defer" in util.create("script"));

  // Test if Geolocation is supported
  Feature.geolocation = ("geolocation" in navigator);

  // Test if img srcset attribute is supported
  Feature.srcset = ("srcset" in util.create("img"));

  // Test if img sizes attribute is supported
  Feature.sizes = ("sizes" in util.create("img"));

  // Test if Picture element is supported
  Feature.pictureElement = ("HTMLPictureElement" in window);

  // Run all the tests and add supported classes
  Feature.testAll = function() {
    var classes = " js";
    for (var test in this) {
      if (test !== "testAll" && test !== "constructor" && this[test]) {
        classes += " " + test;
      }
    }
    docEl.className += classes.toLowerCase();
  };

}



if (Feature.browser) {
  /**
   * Expose a public-facing API
   */
  window.feature = Feature;
}

if (Feature.node) {
  module.exports = Feature;
}
