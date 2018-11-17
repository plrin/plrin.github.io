(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor"],{

/***/ "../node_modules/better-scroll/dist/bscroll.esm.js":
/*!*********************************************************!*\
  !*** ../node_modules/better-scroll/dist/bscroll.esm.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
 * better-normal-scroll v1.13.2
 * (c) 2016-2018 ustbhuangyi
 * Released under the MIT License.
 */
var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function eventMixin(BScroll) {
  BScroll.prototype.on = function (type, fn) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    if (!this._events[type]) {
      this._events[type] = [];
    }

    this._events[type].push([fn, context]);
  };

  BScroll.prototype.once = function (type, fn) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    function magic() {
      this.off(type, magic);
      fn.apply(context, arguments);
    } // To expose the corresponding function method in order to execute the off method


    magic.fn = fn;
    this.on(type, magic);
  };

  BScroll.prototype.off = function (type, fn) {
    var _events = this._events[type];

    if (!_events) {
      return;
    }

    var count = _events.length;

    while (count--) {
      if (_events[count][0] === fn || _events[count][0] && _events[count][0].fn === fn) {
        _events[count][0] = undefined;
      }
    }
  };

  BScroll.prototype.trigger = function (type) {
    var events = this._events[type];

    if (!events) {
      return;
    }

    var len = events.length;
    var eventsCopy = [].concat(toConsumableArray(events));

    for (var i = 0; i < len; i++) {
      var event = eventsCopy[i];

      var _event = slicedToArray(event, 2),
          fn = _event[0],
          context = _event[1];

      if (fn) {
        fn.apply(context, [].slice.call(arguments, 1));
      }
    }
  };
} // ssr support


var inBrowser = typeof window !== 'undefined';
var ua = inBrowser && navigator.userAgent.toLowerCase();
var isWeChatDevTools = ua && /wechatdevtools/.test(ua);
var isAndroid = ua && ua.indexOf('android') > 0;

function getNow() {
  return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
}

function extend(target) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < rest.length; i++) {
    var source = rest[i];

    for (var key in source) {
      target[key] = source[key];
    }
  }

  return target;
}

function isUndef(v) {
  return v === undefined || v === null;
}

function getDistance(x, y) {
  return Math.sqrt(x * x + y * y);
}

var elementStyle = inBrowser && document.createElement('div').style;

var vendor = function () {
  if (!inBrowser) {
    return false;
  }

  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (var key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
}();

function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend';
    }

    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

function addEvent(el, type, fn, capture) {
  el.addEventListener(type, fn, {
    passive: false,
    capture: !!capture
  });
}

function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {
    passive: false,
    capture: !!capture
  });
}

function offset(el) {
  var left = 0;
  var top = 0;

  while (el) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
    el = el.offsetParent;
  }

  return {
    left: left,
    top: top
  };
}

function offsetToBody(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: -(rect.left + window.pageXOffset),
    top: -(rect.top + window.pageYOffset)
  };
}

var cssVendor = vendor && vendor !== 'standard' ? '-' + vendor.toLowerCase() + '-' : '';
var transform = prefixStyle('transform');
var transition = prefixStyle('transition');
var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle; // fix issue #361

var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
var hasTransform = transform !== false;
var hasTransition = inBrowser && transition in elementStyle;
var style = {
  transform: transform,
  transition: transition,
  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
  transitionDuration: prefixStyle('transitionDuration'),
  transitionDelay: prefixStyle('transitionDelay'),
  transformOrigin: prefixStyle('transformOrigin'),
  transitionEnd: prefixStyle('transitionEnd')
};
var TOUCH_EVENT = 1;
var MOUSE_EVENT = 2;
var eventType = {
  touchstart: TOUCH_EVENT,
  touchmove: TOUCH_EVENT,
  touchend: TOUCH_EVENT,
  mousedown: MOUSE_EVENT,
  mousemove: MOUSE_EVENT,
  mouseup: MOUSE_EVENT
};

function getRect(el) {
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}

function preventDefaultException(el, exceptions) {
  for (var i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }

  return false;
}

function tap(e, eventName) {
  var ev = document.createEvent('Event');
  ev.initEvent(eventName, true, true);
  ev.pageX = e.pageX;
  ev.pageY = e.pageY;
  e.target.dispatchEvent(ev);
}

function click(e) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var eventSource = void 0;

  if (e.type === 'mouseup' || e.type === 'mousecancel') {
    eventSource = e;
  } else if (e.type === 'touchend' || e.type === 'touchcancel') {
    eventSource = e.changedTouches[0];
  }

  var posSrc = {};

  if (eventSource) {
    posSrc.screenX = eventSource.screenX || 0;
    posSrc.screenY = eventSource.screenY || 0;
    posSrc.clientX = eventSource.clientX || 0;
    posSrc.clientY = eventSource.clientY || 0;
  }

  var ev = void 0;
  var bubbles = true;
  var cancelable = true;

  if (typeof MouseEvent !== 'undefined') {
    try {
      ev = new MouseEvent(event, extend({
        bubbles: bubbles,
        cancelable: cancelable
      }, posSrc));
    } catch (e) {
      createEvent();
    }
  } else {
    createEvent();
  }

  function createEvent() {
    ev = document.createEvent('Event');
    ev.initEvent(event, bubbles, cancelable);
    extend(ev, posSrc);
  } // forwardedTouchEvent set to true in case of the conflict with fastclick


  ev.forwardedTouchEvent = true;
  ev._constructed = true;
  e.target.dispatchEvent(ev);
}

function dblclick(e) {
  click(e, 'dblclick');
}

function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

function before(el, target) {
  target.parentNode.insertBefore(el, target);
}

function removeChild(el, child) {
  el.removeChild(child);
}

var DEFAULT_OPTIONS = {
  startX: 0,
  startY: 0,
  scrollX: false,
  scrollY: true,
  freeScroll: false,
  directionLockThreshold: 5,
  eventPassthrough: '',
  click: false,
  tap: false,

  /**
   * support any side
   * bounce: {
   *   top: true,
   *   bottom: true,
   *   left: true,
   *   right: true
   * }
   */
  bounce: true,
  bounceTime: 800,
  momentum: true,
  momentumLimitTime: 300,
  momentumLimitDistance: 15,
  swipeTime: 2500,
  swipeBounceTime: 500,
  deceleration: 0.0015,
  flickLimitTime: 200,
  flickLimitDistance: 100,
  resizePolling: 60,
  probeType: 0,
  preventDefault: true,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
  },
  HWCompositing: true,
  useTransition: true,
  useTransform: true,
  bindToWrapper: false,
  disableMouse: hasTouch,
  disableTouch: !hasTouch,
  observeDOM: true,
  autoBlur: true,

  /**
   * for picker
   * wheel: {
   *   selectedIndex: 0,
   *   rotate: 25,
   *   adjustTime: 400
   *   wheelWrapperClass: 'wheel-scroll',
   *   wheelItemClass: 'wheel-item'
   * }
   */
  wheel: false,

  /**
   * for slide
   * snap: {
   *   loop: false,
   *   el: domEl,
   *   threshold: 0.1,
   *   stepX: 100,
   *   stepY: 100,
   *   speed: 400,
   *   easing: {
   *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
   *     fn: function (t) {
   *       return t * (2 - t)
   *     }
   *   }
   *   listenFlick: true
   * }
   */
  snap: false,

  /**
   * for scrollbar
   * scrollbar: {
   *   fade: true,
   *   interactive: false
   * }
   */
  scrollbar: false,

  /**
   * for pull down and refresh
   * pullDownRefresh: {
   *   threshold: 50,
   *   stop: 20
   * }
   */
  pullDownRefresh: false,

  /**
   * for pull up and load
   * pullUpLoad: {
   *   threshold: 50
   * }
   */
  pullUpLoad: false,

  /**
   * for mouse wheel
   * mouseWheel: {
   *   speed: 20,
   *   invert: false,
   *   easeTime: 300
   * }
   */
  mouseWheel: false,
  stopPropagation: false,

  /**
   * for zoom
   * zoom: {
   *   start: 1,
   *   min: 1,
   *   max: 4
   * }
   */
  zoom: false,

  /**
   * for infinity
   * infinity: {
   *   render(item, div) {
   *   },
   *   createTombstone() {
   *   },
   *   fetch(count) {
   *   }
   * }
   */
  infinity: false,

  /**
   * for double click
   * dblclick: {
   *   delay: 300
   * }
   */
  dblclick: false
};

function initMixin(BScroll) {
  BScroll.prototype._init = function (el, options) {
    this._handleOptions(options); // init private custom events


    this._events = {};
    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.setScale(1);

    this._addDOMEvents();

    this._initExtFeatures();

    this._watchTransition();

    if (this.options.observeDOM) {
      this._initDOMObserver();
    }

    if (this.options.autoBlur) {
      this._handleAutoBlur();
    }

    this.refresh();

    if (!this.options.snap) {
      this.scrollTo(this.options.startX, this.options.startY);
    }

    this.enable();
  };

  BScroll.prototype.setScale = function (scale) {
    this.lastScale = isUndef(this.scale) ? scale : this.scale;
    this.scale = scale;
  };

  BScroll.prototype._handleOptions = function (options) {
    this.options = extend({}, DEFAULT_OPTIONS, options);
    this.translateZ = this.options.HWCompositing && hasPerspective ? ' translateZ(0)' : '';
    this.options.useTransition = this.options.useTransition && hasTransition;
    this.options.useTransform = this.options.useTransform && hasTransform;
    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault; // If you want eventPassthrough I have to lock one of the axes

    this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;
    this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY; // With eventPassthrough we also need lockDirection mechanism

    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

    if (this.options.tap === true) {
      this.options.tap = 'tap';
    }
  };

  BScroll.prototype._addDOMEvents = function () {
    var eventOperation = addEvent;

    this._handleDOMEvents(eventOperation);
  };

  BScroll.prototype._removeDOMEvents = function () {
    var eventOperation = removeEvent;

    this._handleDOMEvents(eventOperation);
  };

  BScroll.prototype._handleDOMEvents = function (eventOperation) {
    var target = this.options.bindToWrapper ? this.wrapper : window;
    eventOperation(window, 'orientationchange', this);
    eventOperation(window, 'resize', this);

    if (this.options.click) {
      eventOperation(this.wrapper, 'click', this, true);
    }

    if (!this.options.disableMouse) {
      eventOperation(this.wrapper, 'mousedown', this);
      eventOperation(target, 'mousemove', this);
      eventOperation(target, 'mousecancel', this);
      eventOperation(target, 'mouseup', this);
    }

    if (hasTouch && !this.options.disableTouch) {
      eventOperation(this.wrapper, 'touchstart', this);
      eventOperation(target, 'touchmove', this);
      eventOperation(target, 'touchcancel', this);
      eventOperation(target, 'touchend', this);
    }

    eventOperation(this.scroller, style.transitionEnd, this);
  };

  BScroll.prototype._initExtFeatures = function () {
    if (this.options.snap) {
      this._initSnap();
    }

    if (this.options.scrollbar) {
      this._initScrollbar();
    }

    if (this.options.pullUpLoad) {
      this._initPullUp();
    }

    if (this.options.pullDownRefresh) {
      this._initPullDown();
    }

    if (this.options.wheel) {
      this._initWheel();
    }

    if (this.options.mouseWheel) {
      this._initMouseWheel();
    }

    if (this.options.zoom) {
      this._initZoom();
    }

    if (this.options.infinity) {
      this._initInfinite();
    }
  };

  BScroll.prototype._watchTransition = function () {
    if (typeof Object.defineProperty !== 'function') {
      return;
    }

    var me = this;
    var isInTransition = false;
    var key = this.useTransition ? 'isInTransition' : 'isAnimating';
    Object.defineProperty(this, key, {
      get: function get() {
        return isInTransition;
      },
      set: function set(newVal) {
        isInTransition = newVal; // fix issue #359

        var el = me.scroller.children.length ? me.scroller.children : [me.scroller];
        var pointerEvents = isInTransition && !me.pulling ? 'none' : 'auto';

        for (var i = 0; i < el.length; i++) {
          el[i].style.pointerEvents = pointerEvents;
        }
      }
    });
  };

  BScroll.prototype._handleAutoBlur = function () {
    this.on('scrollStart', function () {
      var activeElement = document.activeElement;

      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        activeElement.blur();
      }
    });
  };

  BScroll.prototype._initDOMObserver = function () {
    var _this = this;

    if (typeof MutationObserver !== 'undefined') {
      var timer = void 0;
      var observer = new MutationObserver(function (mutations) {
        // don't do any refresh during the transition, or outside of the boundaries
        if (_this._shouldNotRefresh()) {
          return;
        }

        var immediateRefresh = false;
        var deferredRefresh = false;

        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];

          if (mutation.type !== 'attributes') {
            immediateRefresh = true;
            break;
          } else {
            if (mutation.target !== _this.scroller) {
              deferredRefresh = true;
              break;
            }
          }
        }

        if (immediateRefresh) {
          _this.refresh();
        } else if (deferredRefresh) {
          // attributes changes too often
          clearTimeout(timer);
          timer = setTimeout(function () {
            if (!_this._shouldNotRefresh()) {
              _this.refresh();
            }
          }, 60);
        }
      });
      var config = {
        attributes: true,
        childList: true,
        subtree: true
      };
      observer.observe(this.scroller, config);
      this.on('destroy', function () {
        observer.disconnect();
      });
    } else {
      this._checkDOMUpdate();
    }
  };

  BScroll.prototype._shouldNotRefresh = function () {
    var outsideBoundaries = this.x > this.minScrollX || this.x < this.maxScrollX || this.y > this.minScrollY || this.y < this.maxScrollY;
    return this.isInTransition || this.stopFromTransition || outsideBoundaries;
  };

  BScroll.prototype._checkDOMUpdate = function () {
    var scrollerRect = getRect(this.scroller);
    var oldWidth = scrollerRect.width;
    var oldHeight = scrollerRect.height;

    function check() {
      if (this.destroyed) {
        return;
      }

      scrollerRect = getRect(this.scroller);
      var newWidth = scrollerRect.width;
      var newHeight = scrollerRect.height;

      if (oldWidth !== newWidth || oldHeight !== newHeight) {
        this.refresh();
      }

      oldWidth = newWidth;
      oldHeight = newHeight;
      next.call(this);
    }

    function next() {
      var _this2 = this;

      setTimeout(function () {
        check.call(_this2);
      }, 1000);
    }

    next.call(this);
  };

  BScroll.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this._start(e);

        if (this.options.zoom && e.touches && e.touches.length > 1) {
          this._zoomStart(e);
        }

        break;

      case 'touchmove':
      case 'mousemove':
        if (this.options.zoom && e.touches && e.touches.length > 1) {
          this._zoom(e);
        } else {
          this._move(e);
        }

        break;

      case 'touchend':
      case 'mouseup':
      case 'touchcancel':
      case 'mousecancel':
        if (this.scaled) {
          this._zoomEnd(e);
        } else {
          this._end(e);
        }

        break;

      case 'orientationchange':
      case 'resize':
        this._resize();

        break;

      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this._transitionEnd(e);

        break;

      case 'click':
        if (this.enabled && !e._constructed) {
          if (!preventDefaultException(e.target, this.options.preventDefaultException)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }

        break;

      case 'wheel':
      case 'DOMMouseScroll':
      case 'mousewheel':
        this._onMouseWheel(e);

        break;
    }
  };

  BScroll.prototype.refresh = function () {
    var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
    var wrapperRect = getRect(this.wrapper);
    this.wrapperWidth = wrapperRect.width;
    this.wrapperHeight = wrapperRect.height;
    var scrollerRect = getRect(this.scroller);
    this.scrollerWidth = Math.round(scrollerRect.width * this.scale);
    this.scrollerHeight = Math.round(scrollerRect.height * this.scale);
    this.relativeX = scrollerRect.left;
    this.relativeY = scrollerRect.top;

    if (isWrapperStatic) {
      this.relativeX -= wrapperRect.left;
      this.relativeY -= wrapperRect.top;
    }

    this.minScrollX = 0;
    this.minScrollY = 0;
    var wheel = this.options.wheel;

    if (wheel) {
      this.items = this.scroller.children;
      this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0;

      if (this.selectedIndex === undefined) {
        this.selectedIndex = wheel.selectedIndex || 0;
      }

      this.options.startY = -this.selectedIndex * this.itemHeight;
      this.maxScrollX = 0;
      this.maxScrollY = -this.itemHeight * (this.items.length - 1);
    } else {
      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;

      if (!this.options.infinity) {
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
      }

      if (this.maxScrollX < 0) {
        this.maxScrollX -= this.relativeX;
        this.minScrollX = -this.relativeX;
      } else if (this.scale > 1) {
        this.maxScrollX = this.maxScrollX / 2 - this.relativeX;
        this.minScrollX = this.maxScrollX;
      }

      if (this.maxScrollY < 0) {
        this.maxScrollY -= this.relativeY;
        this.minScrollY = -this.relativeY;
      } else if (this.scale > 1) {
        this.maxScrollY = this.maxScrollY / 2 - this.relativeY;
        this.minScrollY = this.maxScrollY;
      }
    }

    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX;
    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY;

    if (!this.hasHorizontalScroll) {
      this.maxScrollX = this.minScrollX;
      this.scrollerWidth = this.wrapperWidth;
    }

    if (!this.hasVerticalScroll) {
      this.maxScrollY = this.minScrollY;
      this.scrollerHeight = this.wrapperHeight;
    }

    this.endTime = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.wrapperOffset = offset(this.wrapper);
    this.trigger('refresh');
    !this.scaled && this.resetPosition();
  };

  BScroll.prototype.enable = function () {
    this.enabled = true;
  };

  BScroll.prototype.disable = function () {
    this.enabled = false;
  };
}

var ease = {
  // easeOutQuint
  swipe: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function fn(t) {
      return 1 + --t * t * t * t * t;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn: function fn(t) {
      return t * (2 - t);
    }
  },
  // easeOutQuart
  bounce: {
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn: function fn(t) {
      return 1 - --t * t * t * t;
    }
  }
};

function momentum(current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
  var distance = current - start;
  var speed = Math.abs(distance) / time;
  var deceleration = options.deceleration,
      itemHeight = options.itemHeight,
      swipeBounceTime = options.swipeBounceTime,
      wheel = options.wheel,
      swipeTime = options.swipeTime;
  var duration = swipeTime;
  var rate = wheel ? 4 : 15;
  var destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

  if (wheel && itemHeight) {
    destination = Math.round(destination / itemHeight) * itemHeight;
  }

  if (destination < lowerMargin) {
    destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - wrapperSize / rate * speed) : lowerMargin;
    duration = swipeBounceTime;
  } else if (destination > upperMargin) {
    destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / rate * speed) : upperMargin;
    duration = swipeBounceTime;
  }

  return {
    destination: Math.round(destination),
    duration: duration
  };
}

var DEFAULT_INTERVAL = 100 / 60;

function noop() {}

var requestAnimationFrame = function () {
  if (!inBrowser) {
    /* istanbul ignore if */
    return noop;
  }

  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
  function (callback) {
    return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.
  };
}();

var cancelAnimationFrame = function () {
  if (!inBrowser) {
    /* istanbul ignore if */
    return noop;
  }

  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
}();

var DIRECTION_UP = 1;
var DIRECTION_DOWN = -1;
var DIRECTION_LEFT = 1;
var DIRECTION_RIGHT = -1;
var PROBE_DEBOUNCE = 1;
var PROBE_REALTIME = 3;

function warn(msg) {
  console.error('[BScroll warn]: ' + msg);
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error('[BScroll] ' + msg);
  }
}

function coreMixin(BScroll) {
  BScroll.prototype._start = function (e) {
    var _eventType = eventType[e.type];

    if (_eventType !== TOUCH_EVENT) {
      if (e.button !== 0) {
        return;
      }
    }

    if (!this.enabled || this.destroyed || this.initiated && this.initiated !== _eventType) {
      return;
    }

    this.initiated = _eventType;

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.moved = false;
    this.distX = 0;
    this.distY = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.movingDirectionX = 0;
    this.movingDirectionY = 0;
    this.directionLocked = 0;

    this._transitionTime();

    this.startTime = getNow();

    if (this.options.wheel) {
      this.target = e.target;
    }

    this.stop();
    var point = e.touches ? e.touches[0] : e;
    this.startX = this.x;
    this.startY = this.y;
    this.absStartX = this.x;
    this.absStartY = this.y;
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    this.trigger('beforeScrollStart');
  };

  BScroll.prototype._move = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    var point = e.touches ? e.touches[0] : e;
    var deltaX = point.pageX - this.pointX;
    var deltaY = point.pageY - this.pointY;
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    this.distX += deltaX;
    this.distY += deltaY;
    var absDistX = Math.abs(this.distX);
    var absDistY = Math.abs(this.distY);
    var timestamp = getNow(); // We need to move at least momentumLimitDistance pixels for the scrolling to initiate

    if (timestamp - this.endTime > this.options.momentumLimitTime && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance) {
      return;
    } // If you are scrolling in one direction lock the other


    if (!this.directionLocked && !this.options.freeScroll) {
      if (absDistX > absDistY + this.options.directionLockThreshold) {
        this.directionLocked = 'h'; // lock horizontally
      } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
        this.directionLocked = 'v'; // lock vertically
      } else {
        this.directionLocked = 'n'; // no lock
      }
    }

    if (this.directionLocked === 'h') {
      if (this.options.eventPassthrough === 'vertical') {
        e.preventDefault();
      } else if (this.options.eventPassthrough === 'horizontal') {
        this.initiated = false;
        return;
      }

      deltaY = 0;
    } else if (this.directionLocked === 'v') {
      if (this.options.eventPassthrough === 'horizontal') {
        e.preventDefault();
      } else if (this.options.eventPassthrough === 'vertical') {
        this.initiated = false;
        return;
      }

      deltaX = 0;
    }

    deltaX = this.hasHorizontalScroll ? deltaX : 0;
    deltaY = this.hasVerticalScroll ? deltaY : 0;
    this.movingDirectionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
    this.movingDirectionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;
    var newX = this.x + deltaX;
    var newY = this.y + deltaY;
    var top = false;
    var bottom = false;
    var left = false;
    var right = false; // Slow down or stop if outside of the boundaries

    var bounce = this.options.bounce;

    if (bounce !== false) {
      top = bounce.top === undefined ? true : bounce.top;
      bottom = bounce.bottom === undefined ? true : bounce.bottom;
      left = bounce.left === undefined ? true : bounce.left;
      right = bounce.right === undefined ? true : bounce.right;
    }

    if (newX > this.minScrollX || newX < this.maxScrollX) {
      if (newX > this.minScrollX && left || newX < this.maxScrollX && right) {
        newX = this.x + deltaX / 3;
      } else {
        newX = newX > this.minScrollX ? this.minScrollX : this.maxScrollX;
      }
    }

    if (newY > this.minScrollY || newY < this.maxScrollY) {
      if (newY > this.minScrollY && top || newY < this.maxScrollY && bottom) {
        newY = this.y + deltaY / 3;
      } else {
        newY = newY > this.minScrollY ? this.minScrollY : this.maxScrollY;
      }
    }

    if (!this.moved) {
      this.moved = true;
      this.trigger('scrollStart');
    }

    this._translate(newX, newY);

    if (timestamp - this.startTime > this.options.momentumLimitTime) {
      this.startTime = timestamp;
      this.startX = this.x;
      this.startY = this.y;

      if (this.options.probeType === PROBE_DEBOUNCE) {
        this.trigger('scroll', {
          x: this.x,
          y: this.y
        });
      }
    }

    if (this.options.probeType > PROBE_DEBOUNCE) {
      this.trigger('scroll', {
        x: this.x,
        y: this.y
      });
    }

    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var pX = this.pointX - scrollLeft;
    var pY = this.pointY - scrollTop;

    if (pX > document.documentElement.clientWidth - this.options.momentumLimitDistance || pX < this.options.momentumLimitDistance || pY < this.options.momentumLimitDistance || pY > document.documentElement.clientHeight - this.options.momentumLimitDistance) {
      this._end(e);
    }
  };

  BScroll.prototype._end = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    this.initiated = false;

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.trigger('touchEnd', {
      x: this.x,
      y: this.y
    });
    this.isInTransition = false; // ensures that the last position is rounded

    var newX = Math.round(this.x);
    var newY = Math.round(this.y);
    var deltaX = newX - this.absStartX;
    var deltaY = newY - this.absStartY;
    this.directionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
    this.directionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0; // if configure pull down refresh, check it first

    if (this.options.pullDownRefresh && this._checkPullDown()) {
      return;
    } // check if it is a click operation


    if (this._checkClick(e)) {
      this.trigger('scrollCancel');
      return;
    } // reset if we are outside of the boundaries


    if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
      return;
    }

    this._translate(newX, newY);

    this.endTime = getNow();
    var duration = this.endTime - this.startTime;
    var absDistX = Math.abs(newX - this.startX);
    var absDistY = Math.abs(newY - this.startY); // flick

    if (this._events.flick && duration < this.options.flickLimitTime && absDistX < this.options.flickLimitDistance && absDistY < this.options.flickLimitDistance) {
      this.trigger('flick');
      return;
    }

    var time = 0; // start momentum animation if needed

    if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {
      var top = false;
      var bottom = false;
      var left = false;
      var right = false;
      var bounce = this.options.bounce;

      if (bounce !== false) {
        top = bounce.top === undefined ? true : bounce.top;
        bottom = bounce.bottom === undefined ? true : bounce.bottom;
        left = bounce.left === undefined ? true : bounce.left;
        right = bounce.right === undefined ? true : bounce.right;
      }

      var wrapperWidth = this.directionX === DIRECTION_RIGHT && left || this.directionX === DIRECTION_LEFT && right ? this.wrapperWidth : 0;
      var wrapperHeight = this.directionY === DIRECTION_DOWN && top || this.directionY === DIRECTION_UP && bottom ? this.wrapperHeight : 0;
      var momentumX = this.hasHorizontalScroll ? momentum(this.x, this.startX, duration, this.maxScrollX, this.minScrollX, wrapperWidth, this.options) : {
        destination: newX,
        duration: 0
      };
      var momentumY = this.hasVerticalScroll ? momentum(this.y, this.startY, duration, this.maxScrollY, this.minScrollY, wrapperHeight, this.options) : {
        destination: newY,
        duration: 0
      };
      newX = momentumX.destination;
      newY = momentumY.destination;
      time = Math.max(momentumX.duration, momentumY.duration);
      this.isInTransition = true;
    } else {
      if (this.options.wheel) {
        newY = Math.round(newY / this.itemHeight) * this.itemHeight;
        time = this.options.wheel.adjustTime || 400;
      }
    }

    var easing = ease.swipe;

    if (this.options.snap) {
      var snap = this._nearestSnap(newX, newY);

      this.currentPage = snap;
      time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
      newX = snap.x;
      newY = snap.y;
      this.directionX = 0;
      this.directionY = 0;
      easing = this.options.snap.easing || ease.bounce;
    }

    if (newX !== this.x || newY !== this.y) {
      // change easing function when scroller goes out of the boundaries
      if (newX > this.minScrollX || newX < this.maxScrollX || newY > this.minScrollY || newY < this.maxScrollY) {
        easing = ease.swipeBounce;
      }

      this.scrollTo(newX, newY, time, easing);
      return;
    }

    if (this.options.wheel) {
      this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight));
    }

    this.trigger('scrollEnd', {
      x: this.x,
      y: this.y
    });
  };

  BScroll.prototype._checkClick = function (e) {
    // when in the process of pulling down, it should not prevent click
    var preventClick = this.stopFromTransition && !this.pulling;
    this.stopFromTransition = false; // we scrolled less than 15 pixels

    if (!this.moved) {
      if (this.options.wheel) {
        if (this.target && this.target.classList.contains(this.options.wheel.wheelWrapperClass)) {
          var index = Math.abs(Math.round(this.y / this.itemHeight));

          var _offset = Math.round((this.pointY + offsetToBody(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);

          this.target = this.items[index + _offset];
        }

        this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, true, true, ease.swipe);
        return true;
      } else {
        if (!preventClick) {
          var _dblclick = this.options.dblclick;
          var dblclickTrigged = false;

          if (_dblclick && this.lastClickTime) {
            var _dblclick$delay = _dblclick.delay,
                delay = _dblclick$delay === undefined ? 300 : _dblclick$delay;

            if (getNow() - this.lastClickTime < delay) {
              dblclickTrigged = true;
              dblclick(e);
            }
          }

          if (this.options.tap) {
            tap(e, this.options.tap);
          }

          if (this.options.click && !preventDefaultException(e.target, this.options.preventDefaultException)) {
            click(e);
          }

          this.lastClickTime = dblclickTrigged ? null : getNow();
          return true;
        }

        return false;
      }
    }

    return false;
  };

  BScroll.prototype._resize = function () {
    var _this = this;

    if (!this.enabled) {
      return;
    } // fix a scroll problem under Android condition


    if (isAndroid) {
      this.wrapper.scrollTop = 0;
    }

    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(function () {
      _this.refresh();
    }, this.options.resizePolling);
  };

  BScroll.prototype._startProbe = function () {
    cancelAnimationFrame(this.probeTimer);
    this.probeTimer = requestAnimationFrame(probe);
    var me = this;

    function probe() {
      var pos = me.getComputedPosition();
      me.trigger('scroll', pos);

      if (!me.isInTransition) {
        me.trigger('scrollEnd', pos);
        return;
      }

      me.probeTimer = requestAnimationFrame(probe);
    }
  };

  BScroll.prototype._transitionTime = function () {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    this.scrollerStyle[style.transitionDuration] = time + 'ms';

    if (this.options.wheel) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].style[style.transitionDuration] = time + 'ms';
      }
    }

    if (this.indicators) {
      for (var _i = 0; _i < this.indicators.length; _i++) {
        this.indicators[_i].transitionTime(time);
      }
    }
  };

  BScroll.prototype._transitionTimingFunction = function (easing) {
    this.scrollerStyle[style.transitionTimingFunction] = easing;

    if (this.options.wheel) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].style[style.transitionTimingFunction] = easing;
      }
    }

    if (this.indicators) {
      for (var _i2 = 0; _i2 < this.indicators.length; _i2++) {
        this.indicators[_i2].transitionTimingFunction(easing);
      }
    }
  };

  BScroll.prototype._transitionEnd = function (e) {
    if (e.target !== this.scroller || !this.isInTransition) {
      return;
    }

    this._transitionTime();

    var needReset = !this.pulling || this.movingDirectionY === DIRECTION_UP;

    if (needReset && !this.resetPosition(this.options.bounceTime, ease.bounce)) {
      this.isInTransition = false;

      if (this.options.probeType !== PROBE_REALTIME) {
        this.trigger('scrollEnd', {
          x: this.x,
          y: this.y
        });
      }
    }
  };

  BScroll.prototype._translate = function (x, y, scale) {
    assert(!isUndef(x) && !isUndef(y), 'Translate x or y is null or undefined.');

    if (isUndef(scale)) {
      scale = this.scale;
    }

    if (this.options.useTransform) {
      this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')' + this.translateZ;
    } else {
      x = Math.round(x);
      y = Math.round(y);
      this.scrollerStyle.left = x + 'px';
      this.scrollerStyle.top = y + 'px';
    }

    if (this.options.wheel) {
      var _options$wheel$rotate = this.options.wheel.rotate,
          rotate = _options$wheel$rotate === undefined ? 25 : _options$wheel$rotate;

      for (var i = 0; i < this.items.length; i++) {
        var deg = rotate * (y / this.itemHeight + i);
        this.items[i].style[style.transform] = 'rotateX(' + deg + 'deg)';
      }
    }

    this.x = x;
    this.y = y;
    this.setScale(scale);

    if (this.indicators) {
      for (var _i3 = 0; _i3 < this.indicators.length; _i3++) {
        this.indicators[_i3].updatePosition();
      }
    }
  };

  BScroll.prototype._animate = function (destX, destY, duration, easingFn) {
    var me = this;
    var startX = this.x;
    var startY = this.y;
    var startScale = this.lastScale;
    var destScale = this.scale;
    var startTime = getNow();
    var destTime = startTime + duration;

    function step() {
      var now = getNow();

      if (now >= destTime) {
        me.isAnimating = false;

        me._translate(destX, destY, destScale);

        me.trigger('scroll', {
          x: me.x,
          y: me.y
        });

        if (!me.pulling && !me.resetPosition(me.options.bounceTime)) {
          me.trigger('scrollEnd', {
            x: me.x,
            y: me.y
          });
        }

        return;
      }

      now = (now - startTime) / duration;
      var easing = easingFn(now);
      var newX = (destX - startX) * easing + startX;
      var newY = (destY - startY) * easing + startY;
      var newScale = (destScale - startScale) * easing + startScale;

      me._translate(newX, newY, newScale);

      if (me.isAnimating) {
        me.animateTimer = requestAnimationFrame(step);
      }

      if (me.options.probeType === PROBE_REALTIME) {
        me.trigger('scroll', {
          x: me.x,
          y: me.y
        });
      }
    }

    this.isAnimating = true;
    cancelAnimationFrame(this.animateTimer);
    step();
  };

  BScroll.prototype.scrollBy = function (x, y) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;
    x = this.x + x;
    y = this.y + y;
    this.scrollTo(x, y, time, easing);
  };

  BScroll.prototype.scrollTo = function (x, y) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;
    this.isInTransition = this.options.useTransition && time > 0 && (x !== this.x || y !== this.y);

    if (!time || this.options.useTransition) {
      this._transitionTimingFunction(easing.style);

      this._transitionTime(time);

      this._translate(x, y);

      if (time && this.options.probeType === PROBE_REALTIME) {
        this._startProbe();
      }

      if (!time && (x !== this.x || y !== this.y)) {
        this.trigger('scroll', {
          x: x,
          y: y
        }); // force reflow to put everything in position

        this._reflow = document.body.offsetHeight;

        if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
          this.trigger('scrollEnd', {
            x: x,
            y: y
          });
        }
      }

      if (this.options.wheel) {
        if (y > this.minScrollY) {
          this.selectedIndex = 0;
        } else if (y < this.maxScrollY) {
          this.selectedIndex = this.items.length - 1;
        } else {
          this.selectedIndex = Math.round(Math.abs(y / this.itemHeight));
        }
      }
    } else {
      this._animate(x, y, time, easing.fn);
    }
  };

  BScroll.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
    if (!el) {
      return;
    }

    el = el.nodeType ? el : this.scroller.querySelector(el);

    if (this.options.wheel && !el.classList.contains(this.options.wheel.wheelItemClass)) {
      return;
    }

    var pos = offset(el);
    pos.left -= this.wrapperOffset.left;
    pos.top -= this.wrapperOffset.top; // if offsetX/Y are true we center the element to the screen

    if (offsetX === true) {
      offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
    }

    if (offsetY === true) {
      offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
    }

    pos.left -= offsetX || 0;
    pos.top -= offsetY || 0;
    pos.left = pos.left > this.minScrollX ? this.minScrollX : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
    pos.top = pos.top > this.minScrollY ? this.minScrollY : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

    if (this.options.wheel) {
      pos.top = Math.round(pos.top / this.itemHeight) * this.itemHeight;
    }

    this.scrollTo(pos.left, pos.top, time, easing);
  };

  BScroll.prototype.resetPosition = function () {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var easeing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ease.bounce;
    var x = this.x;
    var roundX = Math.round(x);

    if (!this.hasHorizontalScroll || roundX > this.minScrollX) {
      x = this.minScrollX;
    } else if (roundX < this.maxScrollX) {
      x = this.maxScrollX;
    }

    var y = this.y;
    var roundY = Math.round(y);

    if (!this.hasVerticalScroll || roundY > this.minScrollY) {
      y = this.minScrollY;
    } else if (roundY < this.maxScrollY) {
      y = this.maxScrollY;
    }

    if (x === this.x && y === this.y) {
      return false;
    }

    this.scrollTo(x, y, time, easeing);
    return true;
  };

  BScroll.prototype.getComputedPosition = function () {
    var matrix = window.getComputedStyle(this.scroller, null);
    var x = void 0;
    var y = void 0;

    if (this.options.useTransform) {
      matrix = matrix[style.transform].split(')')[0].split(', ');
      x = +(matrix[12] || matrix[4]);
      y = +(matrix[13] || matrix[5]);
    } else {
      x = +matrix.left.replace(/[^-\d.]/g, '');
      y = +matrix.top.replace(/[^-\d.]/g, '');
    }

    return {
      x: x,
      y: y
    };
  };

  BScroll.prototype.stop = function () {
    if (this.options.useTransition && this.isInTransition) {
      this.isInTransition = false;
      cancelAnimationFrame(this.probeTimer);
      var pos = this.getComputedPosition();

      this._translate(pos.x, pos.y);

      if (this.options.wheel) {
        this.target = this.items[Math.round(-pos.y / this.itemHeight)];
      } else {
        this.trigger('scrollEnd', {
          x: this.x,
          y: this.y
        });
      }

      this.stopFromTransition = true;
    } else if (!this.options.useTransition && this.isAnimating) {
      this.isAnimating = false;
      cancelAnimationFrame(this.animateTimer);
      this.trigger('scrollEnd', {
        x: this.x,
        y: this.y
      });
      this.stopFromTransition = true;
    }
  };

  BScroll.prototype.destroy = function () {
    this.destroyed = true;
    this.trigger('destroy');

    if (this.options.useTransition) {
      cancelAnimationFrame(this.probeTimer);
    } else {
      cancelAnimationFrame(this.animateTimer);
    }

    this._removeDOMEvents(); // remove custom events


    this._events = {};
  };
}

function snapMixin(BScroll) {
  BScroll.prototype._initSnap = function () {
    var _this = this;

    this.currentPage = {};
    var snap = this.options.snap;

    if (snap.loop) {
      var children = this.scroller.children;

      if (children.length > 1) {
        prepend(children[children.length - 1].cloneNode(true), this.scroller);
        this.scroller.appendChild(children[1].cloneNode(true));
      } else {
        // Loop does not make any sense if there is only one child.
        snap.loop = false;
      }
    }

    var el = snap.el;

    if (typeof el === 'string') {
      el = this.scroller.querySelectorAll(el);
    }

    this.on('refresh', function () {
      _this.pages = [];

      if (!_this.wrapperWidth || !_this.wrapperHeight || !_this.scrollerWidth || !_this.scrollerHeight) {
        return;
      }

      var stepX = snap.stepX || _this.wrapperWidth;
      var stepY = snap.stepY || _this.wrapperHeight;
      var x = 0;
      var y = void 0;
      var cx = void 0;
      var cy = void 0;
      var i = 0;
      var l = void 0;
      var m = 0;
      var n = void 0;
      var rect = void 0;

      if (!el) {
        cx = Math.round(stepX / 2);
        cy = Math.round(stepY / 2);

        while (x > -_this.scrollerWidth) {
          _this.pages[i] = [];
          l = 0;
          y = 0;

          while (y > -_this.scrollerHeight) {
            _this.pages[i][l] = {
              x: Math.max(x, _this.maxScrollX),
              y: Math.max(y, _this.maxScrollY),
              width: stepX,
              height: stepY,
              cx: x - cx,
              cy: y - cy
            };
            y -= stepY;
            l++;
          }

          x -= stepX;
          i++;
        }
      } else {
        l = el.length;
        n = -1;

        for (; i < l; i++) {
          rect = getRect(el[i]);

          if (i === 0 || rect.left <= getRect(el[i - 1]).left) {
            m = 0;
            n++;
          }

          if (!_this.pages[m]) {
            _this.pages[m] = [];
          }

          x = Math.max(-rect.left, _this.maxScrollX);
          y = Math.max(-rect.top, _this.maxScrollY);
          cx = x - Math.round(rect.width / 2);
          cy = y - Math.round(rect.height / 2);
          _this.pages[m][n] = {
            x: x,
            y: y,
            width: rect.width,
            height: rect.height,
            cx: cx,
            cy: cy
          };

          if (x > _this.maxScrollX) {
            m++;
          }
        }
      }

      _this._checkSnapLoop();

      var initPageX = snap._loopX ? 1 : 0;
      var initPageY = snap._loopY ? 1 : 0;

      _this._goToPage(_this.currentPage.pageX || initPageX, _this.currentPage.pageY || initPageY, 0); // Update snap threshold if needed.


      var snapThreshold = snap.threshold;

      if (snapThreshold % 1 === 0) {
        _this.snapThresholdX = snapThreshold;
        _this.snapThresholdY = snapThreshold;
      } else {
        _this.snapThresholdX = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].width * snapThreshold);
        _this.snapThresholdY = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].height * snapThreshold);
      }
    });
    this.on('scrollEnd', function () {
      if (snap.loop) {
        if (snap._loopX) {
          if (_this.currentPage.pageX === 0) {
            _this._goToPage(_this.pages.length - 2, _this.currentPage.pageY, 0);
          }

          if (_this.currentPage.pageX === _this.pages.length - 1) {
            _this._goToPage(1, _this.currentPage.pageY, 0);
          }
        } else {
          if (_this.currentPage.pageY === 0) {
            _this._goToPage(_this.currentPage.pageX, _this.pages[0].length - 2, 0);
          }

          if (_this.currentPage.pageY === _this.pages[0].length - 1) {
            _this._goToPage(_this.currentPage.pageX, 1, 0);
          }
        }
      }
    });

    if (snap.listenFlick !== false) {
      this.on('flick', function () {
        var time = snap.speed || Math.max(Math.max(Math.min(Math.abs(_this.x - _this.startX), 1000), Math.min(Math.abs(_this.y - _this.startY), 1000)), 300);

        _this._goToPage(_this.currentPage.pageX + _this.directionX, _this.currentPage.pageY + _this.directionY, time);
      });
    }

    this.on('destroy', function () {
      if (snap.loop) {
        var _children = _this.scroller.children;

        if (_children.length > 2) {
          removeChild(_this.scroller, _children[_children.length - 1]);
          removeChild(_this.scroller, _children[0]);
        }
      }
    });
  };

  BScroll.prototype._checkSnapLoop = function () {
    var snap = this.options.snap;

    if (!snap.loop || !this.pages || !this.pages.length) {
      return;
    }

    if (this.pages.length > 1) {
      snap._loopX = true;
    }

    if (this.pages[0] && this.pages[0].length > 1) {
      snap._loopY = true;
    }

    if (snap._loopX && snap._loopY) {
      warn('Loop does not support two direction at the same time.');
    }
  };

  BScroll.prototype._nearestSnap = function (x, y) {
    if (!this.pages.length) {
      return {
        x: 0,
        y: 0,
        pageX: 0,
        pageY: 0
      };
    }

    var i = 0; // Check if we exceeded the snap threshold

    if (Math.abs(x - this.absStartX) <= this.snapThresholdX && Math.abs(y - this.absStartY) <= this.snapThresholdY) {
      return this.currentPage;
    }

    if (x > this.minScrollX) {
      x = this.minScrollX;
    } else if (x < this.maxScrollX) {
      x = this.maxScrollX;
    }

    if (y > this.minScrollY) {
      y = this.minScrollY;
    } else if (y < this.maxScrollY) {
      y = this.maxScrollY;
    }

    var l = this.pages.length;

    for (; i < l; i++) {
      if (x >= this.pages[i][0].cx) {
        x = this.pages[i][0].x;
        break;
      }
    }

    l = this.pages[i].length;
    var m = 0;

    for (; m < l; m++) {
      if (y >= this.pages[0][m].cy) {
        y = this.pages[0][m].y;
        break;
      }
    }

    if (i === this.currentPage.pageX) {
      i += this.directionX;

      if (i < 0) {
        i = 0;
      } else if (i >= this.pages.length) {
        i = this.pages.length - 1;
      }

      x = this.pages[i][0].x;
    }

    if (m === this.currentPage.pageY) {
      m += this.directionY;

      if (m < 0) {
        m = 0;
      } else if (m >= this.pages[0].length) {
        m = this.pages[0].length - 1;
      }

      y = this.pages[0][m].y;
    }

    return {
      x: x,
      y: y,
      pageX: i,
      pageY: m
    };
  };

  BScroll.prototype._goToPage = function (x) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var time = arguments[2];
    var easing = arguments[3];
    var snap = this.options.snap;

    if (!snap || !this.pages || !this.pages.length) {
      return;
    }

    easing = easing || snap.easing || ease.bounce;

    if (x >= this.pages.length) {
      x = this.pages.length - 1;
    } else if (x < 0) {
      x = 0;
    }

    if (!this.pages[x]) {
      return;
    }

    if (y >= this.pages[x].length) {
      y = this.pages[x].length - 1;
    } else if (y < 0) {
      y = 0;
    }

    var posX = this.pages[x][y].x;
    var posY = this.pages[x][y].y;
    time = time === undefined ? snap.speed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;
    this.currentPage = {
      x: posX,
      y: posY,
      pageX: x,
      pageY: y
    };
    this.scrollTo(posX, posY, time, easing);
  };

  BScroll.prototype.goToPage = function (x, y, time, easing) {
    var snap = this.options.snap;

    if (!snap || !this.pages || !this.pages.length) {
      return;
    }

    if (snap.loop) {
      var len = void 0;

      if (snap._loopX) {
        len = this.pages.length - 2;

        if (x >= len) {
          x = len - 1;
        } else if (x < 0) {
          x = 0;
        }

        x += 1;
      } else {
        len = this.pages[0].length - 2;

        if (y >= len) {
          y = len - 1;
        } else if (y < 0) {
          y = 0;
        }

        y += 1;
      }
    }

    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.next = function (time, easing) {
    var snap = this.options.snap;

    if (!snap) {
      return;
    }

    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;
    x++;

    if (x >= this.pages.length && this.hasVerticalScroll) {
      x = 0;
      y++;
    }

    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.prev = function (time, easing) {
    var snap = this.options.snap;

    if (!snap) {
      return;
    }

    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;
    x--;

    if (x < 0 && this.hasVerticalScroll) {
      x = 0;
      y--;
    }

    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.getCurrentPage = function () {
    var snap = this.options.snap;

    if (!snap) {
      return null;
    }

    if (snap.loop) {
      var currentPage = void 0;

      if (snap._loopX) {
        currentPage = extend({}, this.currentPage, {
          pageX: this.currentPage.pageX - 1
        });
      } else {
        currentPage = extend({}, this.currentPage, {
          pageY: this.currentPage.pageY - 1
        });
      }

      return currentPage;
    }

    return this.currentPage;
  };
}

function wheelMixin(BScroll) {
  BScroll.prototype.wheelTo = function () {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (this.options.wheel) {
      this.y = -index * this.itemHeight;
      this.scrollTo(0, this.y);
    }
  };

  BScroll.prototype.getSelectedIndex = function () {
    return this.options.wheel && this.selectedIndex;
  };

  BScroll.prototype._initWheel = function () {
    var wheel = this.options.wheel;

    if (!wheel.wheelWrapperClass) {
      wheel.wheelWrapperClass = 'wheel-scroll';
    }

    if (!wheel.wheelItemClass) {
      wheel.wheelItemClass = 'wheel-item';
    }

    if (wheel.selectedIndex === undefined) {
      wheel.selectedIndex = 0;
      warn('wheel option selectedIndex is required!');
    }
  };
}

var INDICATOR_MIN_LEN = 8;

function scrollbarMixin(BScroll) {
  BScroll.prototype._initScrollbar = function () {
    var _this = this;

    var _options$scrollbar = this.options.scrollbar,
        _options$scrollbar$fa = _options$scrollbar.fade,
        fade = _options$scrollbar$fa === undefined ? true : _options$scrollbar$fa,
        _options$scrollbar$in = _options$scrollbar.interactive,
        interactive = _options$scrollbar$in === undefined ? false : _options$scrollbar$in;
    this.indicators = [];
    var indicator = void 0;

    if (this.options.scrollX) {
      indicator = {
        el: createScrollbar('horizontal'),
        direction: 'horizontal',
        fade: fade,
        interactive: interactive
      };

      this._insertScrollBar(indicator.el);

      this.indicators.push(new Indicator(this, indicator));
    }

    if (this.options.scrollY) {
      indicator = {
        el: createScrollbar('vertical'),
        direction: 'vertical',
        fade: fade,
        interactive: interactive
      };

      this._insertScrollBar(indicator.el);

      this.indicators.push(new Indicator(this, indicator));
    }

    this.on('refresh', function () {
      for (var i = 0; i < _this.indicators.length; i++) {
        _this.indicators[i].refresh();
      }
    });

    if (fade) {
      this.on('scrollEnd', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade();
        }
      });
      this.on('scrollCancel', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade();
        }
      });
      this.on('scrollStart', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade(true);
        }
      });
      this.on('beforeScrollStart', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade(true, true);
        }
      });
    }

    this.on('destroy', function () {
      _this._removeScrollBars();
    });
  };

  BScroll.prototype._insertScrollBar = function (scrollbar) {
    this.wrapper.appendChild(scrollbar);
  };

  BScroll.prototype._removeScrollBars = function () {
    for (var i = 0; i < this.indicators.length; i++) {
      this.indicators[i].destroy();
    }
  };
}

function createScrollbar(direction) {
  var scrollbar = document.createElement('div');
  var indicator = document.createElement('div');
  scrollbar.style.cssText = 'position:absolute;z-index:9999;pointerEvents:none';
  indicator.style.cssText = 'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';
  indicator.className = 'bscroll-indicator';

  if (direction === 'horizontal') {
    scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
    indicator.style.height = '100%';
    scrollbar.className = 'bscroll-horizontal-scrollbar';
  } else {
    scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
    indicator.style.width = '100%';
    scrollbar.className = 'bscroll-vertical-scrollbar';
  }

  scrollbar.style.cssText += ';overflow:hidden';
  scrollbar.appendChild(indicator);
  return scrollbar;
}

function Indicator(scroller, options) {
  this.wrapper = options.el;
  this.wrapperStyle = this.wrapper.style;
  this.indicator = this.wrapper.children[0];
  this.indicatorStyle = this.indicator.style;
  this.scroller = scroller;
  this.direction = options.direction;

  if (options.fade) {
    this.visible = 0;
    this.wrapperStyle.opacity = '0';
  } else {
    this.visible = 1;
  }

  this.sizeRatioX = 1;
  this.sizeRatioY = 1;
  this.maxPosX = 0;
  this.maxPosY = 0;
  this.x = 0;
  this.y = 0;

  if (options.interactive) {
    this._addDOMEvents();
  }
}

Indicator.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'touchstart':
    case 'mousedown':
      this._start(e);

      break;

    case 'touchmove':
    case 'mousemove':
      this._move(e);

      break;

    case 'touchend':
    case 'mouseup':
    case 'touchcancel':
    case 'mousecancel':
      this._end(e);

      break;
  }
};

Indicator.prototype.refresh = function () {
  if (this._shouldShow()) {
    this.transitionTime();

    this._calculate();

    this.updatePosition();
  }
};

Indicator.prototype.fade = function (visible, hold) {
  var _this2 = this;

  if (hold && !this.visible) {
    return;
  }

  var time = visible ? 250 : 500;
  visible = visible ? '1' : '0';
  this.wrapperStyle[style.transitionDuration] = time + 'ms';
  clearTimeout(this.fadeTimeout);
  this.fadeTimeout = setTimeout(function () {
    _this2.wrapperStyle.opacity = visible;
    _this2.visible = +visible;
  }, 0);
};

Indicator.prototype.updatePosition = function () {
  if (this.direction === 'vertical') {
    var y = Math.round(this.sizeRatioY * this.scroller.y);

    if (y < 0) {
      this.transitionTime(500);
      var height = Math.max(this.indicatorHeight + y * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.height = height + 'px';
      y = 0;
    } else if (y > this.maxPosY) {
      this.transitionTime(500);

      var _height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, INDICATOR_MIN_LEN);

      this.indicatorStyle.height = _height + 'px';
      y = this.maxPosY + this.indicatorHeight - _height;
    } else {
      this.indicatorStyle.height = this.indicatorHeight + 'px';
    }

    this.y = y;

    if (this.scroller.options.useTransform) {
      this.indicatorStyle[style.transform] = 'translateY(' + y + 'px)' + this.scroller.translateZ;
    } else {
      this.indicatorStyle.top = y + 'px';
    }
  } else {
    var x = Math.round(this.sizeRatioX * this.scroller.x);

    if (x < 0) {
      this.transitionTime(500);
      var width = Math.max(this.indicatorWidth + x * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.width = width + 'px';
      x = 0;
    } else if (x > this.maxPosX) {
      this.transitionTime(500);

      var _width = Math.max(this.indicatorWidth - (x - this.maxPosX) * 3, INDICATOR_MIN_LEN);

      this.indicatorStyle.width = _width + 'px';
      x = this.maxPosX + this.indicatorWidth - _width;
    } else {
      this.indicatorStyle.width = this.indicatorWidth + 'px';
    }

    this.x = x;

    if (this.scroller.options.useTransform) {
      this.indicatorStyle[style.transform] = 'translateX(' + x + 'px)' + this.scroller.translateZ;
    } else {
      this.indicatorStyle.left = x + 'px';
    }
  }
};

Indicator.prototype.transitionTime = function () {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.indicatorStyle[style.transitionDuration] = time + 'ms';
};

Indicator.prototype.transitionTimingFunction = function (easing) {
  this.indicatorStyle[style.transitionTimingFunction] = easing;
};

Indicator.prototype.destroy = function () {
  this._removeDOMEvents();

  this.wrapper.parentNode.removeChild(this.wrapper);
};

Indicator.prototype._start = function (e) {
  var point = e.touches ? e.touches[0] : e;
  e.preventDefault();
  e.stopPropagation();
  this.transitionTime();
  this.initiated = true;
  this.moved = false;
  this.lastPointX = point.pageX;
  this.lastPointY = point.pageY;
  this.startTime = getNow();

  this._handleMoveEvents(addEvent);

  this.scroller.trigger('beforeScrollStart');
};

Indicator.prototype._move = function (e) {
  var point = e.touches ? e.touches[0] : e;
  e.preventDefault();
  e.stopPropagation();

  if (!this.moved) {
    this.scroller.trigger('scrollStart');
  }

  this.moved = true;
  var deltaX = point.pageX - this.lastPointX;
  this.lastPointX = point.pageX;
  var deltaY = point.pageY - this.lastPointY;
  this.lastPointY = point.pageY;
  var newX = this.x + deltaX;
  var newY = this.y + deltaY;

  this._pos(newX, newY);
};

Indicator.prototype._end = function (e) {
  if (!this.initiated) {
    return;
  }

  this.initiated = false;
  e.preventDefault();
  e.stopPropagation();

  this._handleMoveEvents(removeEvent);

  var snapOption = this.scroller.options.snap;

  if (snapOption) {
    var speed = snapOption.speed,
        _snapOption$easing = snapOption.easing,
        easing = _snapOption$easing === undefined ? ease.bounce : _snapOption$easing;

    var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

    var time = speed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

    if (this.scroller.x !== snap.x || this.scroller.y !== snap.y) {
      this.scroller.directionX = 0;
      this.scroller.directionY = 0;
      this.scroller.currentPage = snap;
      this.scroller.scrollTo(snap.x, snap.y, time, easing);
    }
  }

  if (this.moved) {
    this.scroller.trigger('scrollEnd', {
      x: this.scroller.x,
      y: this.scroller.y
    });
  }
};

Indicator.prototype._pos = function (x, y) {
  if (x < 0) {
    x = 0;
  } else if (x > this.maxPosX) {
    x = this.maxPosX;
  }

  if (y < 0) {
    y = 0;
  } else if (y > this.maxPosY) {
    y = this.maxPosY;
  }

  x = Math.round(x / this.sizeRatioX);
  y = Math.round(y / this.sizeRatioY);
  this.scroller.scrollTo(x, y);
  this.scroller.trigger('scroll', {
    x: this.scroller.x,
    y: this.scroller.y
  });
};

Indicator.prototype._shouldShow = function () {
  if (this.direction === 'vertical' && this.scroller.hasVerticalScroll || this.direction === 'horizontal' && this.scroller.hasHorizontalScroll) {
    this.wrapper.style.display = '';
    return true;
  }

  this.wrapper.style.display = 'none';
  return false;
};

Indicator.prototype._calculate = function () {
  if (this.direction === 'vertical') {
    var wrapperHeight = this.wrapper.clientHeight;
    this.indicatorHeight = Math.max(Math.round(wrapperHeight * wrapperHeight / (this.scroller.scrollerHeight || wrapperHeight || 1)), INDICATOR_MIN_LEN);
    this.indicatorStyle.height = this.indicatorHeight + 'px';
    this.maxPosY = wrapperHeight - this.indicatorHeight;
    this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY;
  } else {
    var wrapperWidth = this.wrapper.clientWidth;
    this.indicatorWidth = Math.max(Math.round(wrapperWidth * wrapperWidth / (this.scroller.scrollerWidth || wrapperWidth || 1)), INDICATOR_MIN_LEN);
    this.indicatorStyle.width = this.indicatorWidth + 'px';
    this.maxPosX = wrapperWidth - this.indicatorWidth;
    this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX;
  }
};

Indicator.prototype._addDOMEvents = function () {
  var eventOperation = addEvent;

  this._handleDOMEvents(eventOperation);
};

Indicator.prototype._removeDOMEvents = function () {
  var eventOperation = removeEvent;

  this._handleDOMEvents(eventOperation);

  this._handleMoveEvents(eventOperation);
};

Indicator.prototype._handleMoveEvents = function (eventOperation) {
  if (!this.scroller.options.disableTouch) {
    eventOperation(window, 'touchmove', this);
  }

  if (!this.scroller.options.disableMouse) {
    eventOperation(window, 'mousemove', this);
  }
};

Indicator.prototype._handleDOMEvents = function (eventOperation) {
  if (!this.scroller.options.disableTouch) {
    eventOperation(this.indicator, 'touchstart', this);
    eventOperation(window, 'touchend', this);
  }

  if (!this.scroller.options.disableMouse) {
    eventOperation(this.indicator, 'mousedown', this);
    eventOperation(window, 'mouseup', this);
  }
};

function pullDownMixin(BScroll) {
  BScroll.prototype._initPullDown = function () {
    // must watch scroll in real time
    this.options.probeType = PROBE_REALTIME;
  };

  BScroll.prototype._checkPullDown = function () {
    var _options$pullDownRefr = this.options.pullDownRefresh,
        _options$pullDownRefr2 = _options$pullDownRefr.threshold,
        threshold = _options$pullDownRefr2 === undefined ? 90 : _options$pullDownRefr2,
        _options$pullDownRefr3 = _options$pullDownRefr.stop,
        stop = _options$pullDownRefr3 === undefined ? 40 : _options$pullDownRefr3; // check if a real pull down action

    if (this.directionY !== DIRECTION_DOWN || this.y < threshold) {
      return false;
    }

    if (!this.pulling) {
      this.pulling = true;
      this.trigger('pullingDown');
    }

    this.scrollTo(this.x, stop, this.options.bounceTime, ease.bounce);
    return this.pulling;
  };

  BScroll.prototype.finishPullDown = function () {
    this.pulling = false;
    this.resetPosition(this.options.bounceTime, ease.bounce);
  };

  BScroll.prototype.openPullDown = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.options.pullDownRefresh = config;

    this._initPullDown();
  };

  BScroll.prototype.closePullDown = function () {
    this.options.pullDownRefresh = false;
  };
}

function pullUpMixin(BScroll) {
  BScroll.prototype._initPullUp = function () {
    // must watch scroll in real time
    this.options.probeType = PROBE_REALTIME;
    this.pullupWatching = false;

    this._watchPullUp();
  };

  BScroll.prototype._watchPullUp = function () {
    if (this.pullupWatching) {
      return;
    }

    this.pullupWatching = true;
    this.on('scroll', this._checkToEnd);
  };

  BScroll.prototype._checkToEnd = function (pos) {
    var _this = this;

    var _options$pullUpLoad$t = this.options.pullUpLoad.threshold,
        threshold = _options$pullUpLoad$t === undefined ? 0 : _options$pullUpLoad$t;

    if (this.movingDirectionY === DIRECTION_UP && pos.y <= this.maxScrollY + threshold) {
      // reset pullupWatching status after scroll end.
      this.once('scrollEnd', function () {
        _this.pullupWatching = false;
      });
      this.trigger('pullingUp');
      this.off('scroll', this._checkToEnd);
    }
  };

  BScroll.prototype.finishPullUp = function () {
    var _this2 = this;

    if (this.pullupWatching) {
      this.once('scrollEnd', function () {
        _this2._watchPullUp();
      });
    } else {
      this._watchPullUp();
    }
  };

  BScroll.prototype.openPullUp = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.options.pullUpLoad = config;

    this._initPullUp();
  };

  BScroll.prototype.closePullUp = function () {
    this.options.pullUpLoad = false;

    if (!this.pullupWatching) {
      return;
    }

    this.pullupWatching = false;
    this.off('scroll', this._checkToEnd);
  };
}

function mouseWheelMixin(BScroll) {
  BScroll.prototype._initMouseWheel = function () {
    var _this = this;

    this._handleMouseWheelEvent(addEvent);

    this.on('destroy', function () {
      clearTimeout(_this.mouseWheelTimer);
      clearTimeout(_this.mouseWheelEndTimer);

      _this._handleMouseWheelEvent(removeEvent);
    });
    this.firstWheelOpreation = true;
  };

  BScroll.prototype._handleMouseWheelEvent = function (eventOperation) {
    eventOperation(this.wrapper, 'wheel', this);
    eventOperation(this.wrapper, 'mousewheel', this);
    eventOperation(this.wrapper, 'DOMMouseScroll', this);
  };

  BScroll.prototype._onMouseWheel = function (e) {
    var _this2 = this;

    if (!this.enabled) {
      return;
    }

    e.preventDefault();

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    if (this.firstWheelOpreation) {
      this.trigger('scrollStart');
    }

    this.firstWheelOpreation = false;
    var _options$mouseWheel = this.options.mouseWheel,
        _options$mouseWheel$s = _options$mouseWheel.speed,
        speed = _options$mouseWheel$s === undefined ? 20 : _options$mouseWheel$s,
        _options$mouseWheel$i = _options$mouseWheel.invert,
        invert = _options$mouseWheel$i === undefined ? false : _options$mouseWheel$i,
        _options$mouseWheel$e = _options$mouseWheel.easeTime,
        easeTime = _options$mouseWheel$e === undefined ? 300 : _options$mouseWheel$e;
    clearTimeout(this.mouseWheelTimer);
    this.mouseWheelTimer = setTimeout(function () {
      if (!_this2.options.snap && !easeTime) {
        _this2.trigger('scrollEnd', {
          x: _this2.x,
          y: _this2.y
        });
      }

      _this2.firstWheelOpreation = true;
    }, 400);
    var wheelDeltaX = void 0;
    var wheelDeltaY = void 0;

    switch (true) {
      case 'deltaX' in e:
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * speed;
          wheelDeltaY = -e.deltaY * speed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }

        break;

      case 'wheelDeltaX' in e:
        wheelDeltaX = e.wheelDeltaX / 120 * speed;
        wheelDeltaY = e.wheelDeltaY / 120 * speed;
        break;

      case 'wheelDelta' in e:
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;
        break;

      case 'detail' in e:
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;
        break;

      default:
        return;
    }

    var direction = invert ? -1 : 1;
    wheelDeltaX *= direction;
    wheelDeltaY *= direction;

    if (!this.hasVerticalScroll) {
      wheelDeltaX = wheelDeltaY;
      wheelDeltaY = 0;
    }

    var newX = void 0;
    var newY = void 0;

    if (this.options.snap) {
      newX = this.currentPage.pageX;
      newY = this.currentPage.pageY;

      if (wheelDeltaX > 0) {
        newX--;
      } else if (wheelDeltaX < 0) {
        newX++;
      }

      if (wheelDeltaY > 0) {
        newY--;
      } else if (wheelDeltaY < 0) {
        newY++;
      }

      this._goToPage(newX, newY);

      return;
    }

    newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
    newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
    this.movingDirectionX = this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
    this.movingDirectionY = this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

    if (newX > this.minScrollX) {
      newX = this.minScrollX;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > this.minScrollY) {
      newY = this.minScrollY;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    var needTriggerEnd = this.y === newY;
    this.scrollTo(newX, newY, easeTime, ease.swipe);
    this.trigger('scroll', {
      x: this.x,
      y: this.y
    });
    clearTimeout(this.mouseWheelEndTimer);

    if (needTriggerEnd) {
      this.mouseWheelEndTimer = setTimeout(function () {
        _this2.trigger('scrollEnd', {
          x: _this2.x,
          y: _this2.y
        });
      }, easeTime);
    }
  };
}

function zoomMixin(BScroll) {
  BScroll.prototype._initZoom = function () {
    var _options$zoom = this.options.zoom,
        _options$zoom$start = _options$zoom.start,
        start = _options$zoom$start === undefined ? 1 : _options$zoom$start,
        _options$zoom$min = _options$zoom.min,
        min = _options$zoom$min === undefined ? 1 : _options$zoom$min,
        _options$zoom$max = _options$zoom.max,
        max = _options$zoom$max === undefined ? 4 : _options$zoom$max;
    this.scale = Math.min(Math.max(start, min), max);
    this.setScale(this.scale);
    this.scrollerStyle[style.transformOrigin] = '0 0';
  };

  BScroll.prototype._zoomTo = function (scale, originX, originY, startScale) {
    this.scaled = true;
    var lastScale = scale / (startScale || this.scale);
    this.setScale(scale);
    this.refresh();
    var newX = Math.round(this.startX - (originX - this.relativeX) * (lastScale - 1));
    var newY = Math.round(this.startY - (originY - this.relativeY) * (lastScale - 1));

    if (newX > this.minScrollX) {
      newX = this.minScrollX;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > this.minScrollY) {
      newY = this.minScrollY;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    if (this.x !== newX || this.y !== newY) {
      this.scrollTo(newX, newY, this.options.bounceTime);
    }

    this.scaled = false;
  };

  BScroll.prototype.zoomTo = function (scale, x, y) {
    var _offsetToBody = offsetToBody(this.wrapper),
        left = _offsetToBody.left,
        top = _offsetToBody.top;

    var originX = x + left - this.x;
    var originY = y + top - this.y;

    this._zoomTo(scale, originX, originY);
  };

  BScroll.prototype._zoomStart = function (e) {
    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
    this.startDistance = getDistance(deltaX, deltaY);
    this.startScale = this.scale;

    var _offsetToBody2 = offsetToBody(this.wrapper),
        left = _offsetToBody2.left,
        top = _offsetToBody2.top;

    this.originX = Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 + left - this.x;
    this.originY = Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 + top - this.y;
    this.trigger('zoomStart');
  };

  BScroll.prototype._zoom = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
    var distance = getDistance(deltaX, deltaY);
    var scale = distance / this.startDistance * this.startScale;
    this.scaled = true;
    var _options$zoom2 = this.options.zoom,
        _options$zoom2$min = _options$zoom2.min,
        min = _options$zoom2$min === undefined ? 1 : _options$zoom2$min,
        _options$zoom2$max = _options$zoom2.max,
        max = _options$zoom2$max === undefined ? 4 : _options$zoom2$max;

    if (scale < min) {
      scale = 0.5 * min * Math.pow(2.0, scale / min);
    } else if (scale > max) {
      scale = 2.0 * max * Math.pow(0.5, max / scale);
    }

    var lastScale = scale / this.startScale;
    var x = this.startX - (this.originX - this.relativeX) * (lastScale - 1);
    var y = this.startY - (this.originY - this.relativeY) * (lastScale - 1);
    this.setScale(scale);
    this.scrollTo(x, y, 0);
  };

  BScroll.prototype._zoomEnd = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.isInTransition = false;
    this.isAnimating = false;
    this.initiated = 0;
    var _options$zoom3 = this.options.zoom,
        _options$zoom3$min = _options$zoom3.min,
        min = _options$zoom3$min === undefined ? 1 : _options$zoom3$min,
        _options$zoom3$max = _options$zoom3.max,
        max = _options$zoom3$max === undefined ? 4 : _options$zoom3$max;
    var scale = this.scale > max ? max : this.scale < min ? min : this.scale;

    this._zoomTo(scale, this.originX, this.originY, this.startScale);

    this.trigger('zoomEnd');
  };
} // import { ease } from '../util/ease'
// Number of items to instantiate beyond current view in the scroll direction.


var RUNWAY_ITEMS = 30; // Number of items to instantiate beyond current view in the opposite direction.

var RUNWAY_ITEMS_OPPOSITE = 10; // The animation interval (in ms) for fading in content from tombstones.

var ANIMATION_DURATION_MS = 200; // The number of pixels of default additional length to allow scrolling to.

var DEFAULT_SCROLL_RUNWAY = 2000;

function infiniteMixin(BScroll) {
  BScroll.prototype._initInfinite = function () {
    this.options.probeType = 3;
    this.maxScrollY = -DEFAULT_SCROLL_RUNWAY;
    this.infiniteScroller = new InfiniteScroller(this, this.options.infinity);
  };
}

function isTombstoneNode(node) {
  if (node && node.classList) {
    return node.classList.contains('tombstone');
  }
}

function InfiniteScroller(scroller, options) {
  var _this = this;

  this.options = options;
  assert(typeof this.options.createTombstone === 'function', 'Infinite scroll need createTombstone Function to create tombstone');
  assert(typeof this.options.fetch === 'function', 'Infinite scroll need fetch Function to fetch new data.');
  assert(typeof this.options.render === 'function', 'Infinite scroll need render Function to render each item.');
  this.firstAttachedItem = 0;
  this.lastAttachedItem = 0;
  this.anchorScrollTop = 0;
  this.anchorItem = {
    index: 0,
    offset: 0
  };
  this.tombstoneHeight = 0;
  this.tombstoneWidth = 0;
  this.tombstones = [];
  this.tombstonesAnimationHandlers = [];
  this.items = [];
  this.loadedItems = 0;
  this.requestInProgress = false;
  this.hasMore = true;
  this.scroller = scroller;
  this.wrapperEl = this.scroller.wrapper;
  this.scrollerEl = this.scroller.scroller;
  this.scroller.on('scroll', function () {
    _this.onScroll();
  });
  this.scroller.on('resize', function () {
    _this.onResize();
  });
  this.scroller.on('destroy', function () {
    _this.destroy();
  }); // wait scroll core init

  this._onResizeHandler = setTimeout(function () {
    _this.onResize();
  });
}

InfiniteScroller.prototype.destroy = function () {
  var _this2 = this; // In extreme scene, destroy is triggered before _onResizeHandler


  clearTimeout(this._onResizeHandler);
  this.tombstonesAnimationHandlers.forEach(function (handler) {
    clearTimeout(handler);
  });
  this.tombstonesAnimationHandlers = null;
  this.items.forEach(function (item) {
    if (item.node) {
      _this2.scrollerEl.removeChild(item.node);

      item.node = null;
    }
  });
  this.scroller.infiniteScroller = null;
  this.scroller = null;
  this.wrapperEl = null;
  this.scrollerEl = null;
  this.items = null;
  this.tombstones = null;
};

InfiniteScroller.prototype.onScroll = function () {
  var scrollTop = -this.scroller.y;
  var delta = scrollTop - this.anchorScrollTop;

  if (scrollTop === 0) {
    this.anchorItem = {
      index: 0,
      offset: 0
    };
  } else {
    this.anchorItem = this._calculateAnchoredItem(this.anchorItem, delta);
  }

  this.anchorScrollTop = scrollTop;

  var lastScreenItem = this._calculateAnchoredItem(this.anchorItem, this.scroller.wrapperHeight);

  var start = this.anchorItem.index;
  var end = lastScreenItem.index;

  if (delta < 0) {
    start -= RUNWAY_ITEMS;
    end += RUNWAY_ITEMS_OPPOSITE;
  } else {
    start -= RUNWAY_ITEMS_OPPOSITE;
    end += RUNWAY_ITEMS;
  }

  this.fill(start, end);
  this.maybeRequestContent();
};

InfiniteScroller.prototype.onResize = function () {
  var tombstone = this.options.createTombstone();
  tombstone.style.position = 'absolute';
  this.scrollerEl.appendChild(tombstone);
  tombstone.style.display = '';
  this.tombstoneHeight = tombstone.offsetHeight;
  this.tombstoneWidth = tombstone.offsetWidth;
  this.scrollerEl.removeChild(tombstone);

  for (var i = 0; i < this.items.length; i++) {
    this.items[i].height = this.items[i].width = 0;
  }

  this.onScroll();
};

InfiniteScroller.prototype.fill = function (start, end) {
  this.firstAttachedItem = Math.max(0, start);

  if (!this.hasMore) {
    end = Math.min(end, this.items.length);
  }

  this.lastAttachedItem = end;
  this.attachContent();
};

InfiniteScroller.prototype.maybeRequestContent = function () {
  var _this3 = this;

  if (this.requestInProgress || !this.hasMore) {
    return;
  }

  var itemsNeeded = this.lastAttachedItem - this.loadedItems;

  if (itemsNeeded <= 0) {
    return;
  }

  this.requestInProgress = true;
  this.options.fetch(itemsNeeded).then(function (items) {
    _this3.requestInProgress = false;

    if (items) {
      _this3.addContent(items);
    } else {
      _this3.hasMore = false;

      var tombstoneLen = _this3._removeTombstones();

      var curPos = 0;

      if (_this3.anchorItem.index <= _this3.items.length) {
        curPos = _this3._fixScrollPosition();

        _this3._setupAnimations({}, curPos);

        _this3.scroller.resetPosition(_this3.scroller.options.bounceTime);
      } else {
        _this3.anchorItem.index -= tombstoneLen;
        curPos = _this3._fixScrollPosition();

        _this3._setupAnimations({}, curPos);

        _this3.scroller.stop();

        _this3.scroller.resetPosition();

        _this3.onScroll();
      }
    }
  });
};

InfiniteScroller.prototype.addContent = function (items) {
  for (var i = 0; i < items.length; i++) {
    if (this.items.length <= this.loadedItems) {
      this._addItem();
    }

    this.items[this.loadedItems++].data = items[i];
  }

  this.attachContent();
  this.maybeRequestContent();
};

InfiniteScroller.prototype.attachContent = function () {
  var unusedNodes = this._collectUnusedNodes();

  var tombstoneAnimations = this._createDOMNodes(unusedNodes);

  this._cleanupUnusedNodes(unusedNodes);

  this._cacheNodeSize();

  var curPos = this._fixScrollPosition();

  this._setupAnimations(tombstoneAnimations, curPos);
};

InfiniteScroller.prototype.resetMore = function () {
  this.hasMore = true;
};

InfiniteScroller.prototype._removeTombstones = function () {
  var markIndex = void 0;
  var tombstoneLen = 0;
  var itemLen = this.items.length;

  for (var i = 0; i < itemLen; i++) {
    var currentNode = this.items[i].node;
    var currentData = this.items[i].data;

    if ((!currentNode || isTombstoneNode(currentNode)) && !currentData) {
      // 0 should be excluded
      if (markIndex === void 0) {
        markIndex = i;
      }

      if (currentNode) {
        this.scrollerEl.removeChild(currentNode);
      }
    }
  }

  tombstoneLen = itemLen - markIndex;
  this.items.splice(markIndex);
  this.lastAttachedItem = Math.min(this.lastAttachedItem, this.items.length);
  return tombstoneLen;
};

InfiniteScroller.prototype._collectUnusedNodes = function () {
  var unusedNodes = [];

  for (var i = 0; i < this.items.length; i++) {
    // Skip the items which should be visible.
    if (i === this.firstAttachedItem) {
      i = this.lastAttachedItem - 1;
      continue;
    }

    var currentNode = this.items[i].node;

    if (currentNode) {
      if (isTombstoneNode(currentNode)) {
        // Cache tombstones for reuse
        this.tombstones.push(currentNode);
        this.tombstones[this.tombstones.length - 1].style.display = 'none';
      } else {
        unusedNodes.push(currentNode);
      }
    }

    this.items[i].node = null;
  }

  return unusedNodes;
};

InfiniteScroller.prototype._createDOMNodes = function (unusedNodes) {
  var tombstoneAnimations = {};

  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
    while (this.items.length <= i) {
      this._addItem();
    }

    var currentNode = this.items[i].node;
    var currentData = this.items[i].data;

    if (currentNode) {
      if (isTombstoneNode(currentNode) && currentData) {
        currentNode.style.zIndex = 1;
        tombstoneAnimations[i] = [currentNode, this.items[i].top - this.anchorScrollTop];
        this.items[i].node = null;
      } else {
        continue;
      }
    }

    var node = currentData ? this.options.render(currentData, unusedNodes.pop()) : this._getTombStone();
    node.style.position = 'absolute';
    this.items[i].top = -1;
    this.scrollerEl.appendChild(node);
    this.items[i].node = node;
  }

  return tombstoneAnimations;
};

InfiniteScroller.prototype._cleanupUnusedNodes = function (unusedNodes) {
  while (unusedNodes.length) {
    this.scrollerEl.removeChild(unusedNodes.pop());
  }
};

InfiniteScroller.prototype._cacheNodeSize = function () {
  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
    var item = this.items[i]; // Only cache the height if we have the real contents, not a placeholder.

    if (item.data && !item.height) {
      var isTombstone = isTombstoneNode(item.node);
      item.height = isTombstone ? this.tombstoneHeight : item.node.offsetHeight;
      item.width = isTombstone ? this.tombstoneWidth : item.node.offsetWidth;
    }
  }
};

InfiniteScroller.prototype._fixScrollPosition = function () {
  this.anchorScrollTop = 0;

  for (var _i = 0; _i < this.anchorItem.index; _i++) {
    this.anchorScrollTop += this.items[_i].height || this.tombstoneHeight;
  }

  this.anchorScrollTop += this.anchorItem.offset; // Position all nodes.

  var curPos = this.anchorScrollTop - this.anchorItem.offset;
  var i = this.anchorItem.index;

  while (i > this.firstAttachedItem) {
    curPos -= this.items[i - 1].height || this.tombstoneHeight;
    i--;
  }

  return curPos;
};

InfiniteScroller.prototype._setupAnimations = function (tombstoneAnimations, curPos) {
  var _this4 = this;

  for (var i in tombstoneAnimations) {
    var animation = tombstoneAnimations[i];
    this.items[i].node.style[style.transform] = 'translateY(' + (this.anchorScrollTop + animation[1]) + 'px) scale(' + this.tombstoneWidth / this.items[i].width + ', ' + this.tombstoneHeight / this.items[i].height + ')'; // Call offsetTop on the nodes to be animated to force them to apply current transforms.

    /* eslint-disable no-unused-expressions */

    this.items[i].node.offsetTop;
    animation[0].offsetTop;
    this.items[i].node.style[style.transition] = cssVendor + 'transform ' + ANIMATION_DURATION_MS + 'ms';
  }

  for (var _i2 = this.firstAttachedItem; _i2 < this.lastAttachedItem; _i2++) {
    var _animation = tombstoneAnimations[_i2];

    if (_animation) {
      var tombstoneNode = _animation[0];
      tombstoneNode.style[style.transition] = cssVendor + 'transform ' + ANIMATION_DURATION_MS + 'ms, opacity ' + ANIMATION_DURATION_MS + 'ms';
      tombstoneNode.style[style.transform] = 'translateY(' + curPos + 'px) scale(' + this.items[_i2].width / this.tombstoneWidth + ', ' + this.items[_i2].height / this.tombstoneHeight + ')';
      tombstoneNode.style.opacity = 0;
    }

    if (curPos !== this.items[_i2].top) {
      if (!_animation) {
        this.items[_i2].node.style[style.transition] = '';
      }

      this.items[_i2].node.style[style.transform] = 'translateY(' + curPos + 'px)';
    }

    this.items[_i2].top = curPos;
    curPos += this.items[_i2].height || this.tombstoneHeight;
  }

  this.scroller.maxScrollY = -(curPos - this.scroller.wrapperHeight + (this.hasMore ? DEFAULT_SCROLL_RUNWAY : 0));
  var tombstoneAnimationsHandler = setTimeout(function () {
    for (var _i3 in tombstoneAnimations) {
      var _animation2 = tombstoneAnimations[_i3];
      _animation2[0].style.display = 'none'; // Tombstone can be recycled now.

      _this4.tombstones.push(_animation2[0]);
    }
  }, ANIMATION_DURATION_MS);
  this.tombstonesAnimationHandlers.push(tombstoneAnimationsHandler);
};

InfiniteScroller.prototype._getTombStone = function () {
  var tombstone = this.tombstones.pop();

  if (tombstone) {
    tombstone.style.display = '';
    tombstone.style.opacity = 1;
    tombstone.style[style.transform] = '';
    tombstone.style[style.transition] = '';
    return tombstone;
  }

  return this.options.createTombstone();
};

InfiniteScroller.prototype._addItem = function () {
  this.items.push({
    data: null,
    node: null,
    height: 0,
    width: 0,
    top: 0
  });
};

InfiniteScroller.prototype._calculateAnchoredItem = function (initialAnchor, delta) {
  if (delta === 0) {
    return initialAnchor;
  }

  var i = initialAnchor.index;
  var tombstones = 0;
  delta += initialAnchor.offset;

  if (delta < 0) {
    while (delta < 0 && i > 0 && this.items[i - 1].height) {
      delta += this.items[i - 1].height;
      i--;
    }

    tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneHeight));
  } else {
    while (delta > 0 && i < this.items.length && this.items[i].height && this.items[i].height < delta) {
      delta -= this.items[i].height;
      i++;
    }

    if (i >= this.items.length || !this.items[i].height) {
      tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneHeight);
    }
  }

  i += tombstones;
  delta -= tombstones * this.tombstoneHeight;
  return {
    index: i,
    offset: delta
  };
};

function BScroll(el, options) {
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;

  if (!this.wrapper) {
    warn('Can not resolve the wrapper DOM.');
  }

  this.scroller = this.wrapper.children[0];

  if (!this.scroller) {
    warn('The wrapper need at least one child element to be scroller.');
  } // cache style for better performance


  this.scrollerStyle = this.scroller.style;

  this._init(el, options);
}

initMixin(BScroll);
coreMixin(BScroll);
eventMixin(BScroll);
snapMixin(BScroll);
wheelMixin(BScroll);
scrollbarMixin(BScroll);
pullDownMixin(BScroll);
pullUpMixin(BScroll);
mouseWheelMixin(BScroll);
zoomMixin(BScroll);
infiniteMixin(BScroll);
BScroll.Version = '1.13.2';
/* harmony default export */ __webpack_exports__["default"] = (BScroll);

/***/ }),

/***/ "../node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js":
/*!***************************************************************************!*\
  !*** ../node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!function (e, t) {
   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  "use strict";

  var e = function () {};

  e.version = "2.0.5", window.addEventListener("mousewheel", function () {});
  var t = "data-scrollmagic-pin-spacer";

  e.Controller = function (r) {
    var o,
        s,
        a = "ScrollMagic.Controller",
        l = "FORWARD",
        c = "REVERSE",
        u = "PAUSED",
        f = n.defaults,
        d = this,
        h = i.extend({}, f, r),
        g = [],
        p = !1,
        v = 0,
        m = u,
        w = !0,
        y = 0,
        S = !0,
        b = function () {
      for (var e in h) f.hasOwnProperty(e) || delete h[e];

      if (h.container = i.get.elements(h.container)[0], !h.container) throw a + " init failed.";
      w = h.container === window || h.container === document.body || !document.body.contains(h.container), w && (h.container = window), y = z(), h.container.addEventListener("resize", T), h.container.addEventListener("scroll", T), h.refreshInterval = parseInt(h.refreshInterval) || f.refreshInterval, E();
    },
        E = function () {
      h.refreshInterval > 0 && (s = window.setTimeout(A, h.refreshInterval));
    },
        x = function () {
      return h.vertical ? i.get.scrollTop(h.container) : i.get.scrollLeft(h.container);
    },
        z = function () {
      return h.vertical ? i.get.height(h.container) : i.get.width(h.container);
    },
        C = this._setScrollPos = function (e) {
      h.vertical ? w ? window.scrollTo(i.get.scrollLeft(), e) : h.container.scrollTop = e : w ? window.scrollTo(e, i.get.scrollTop()) : h.container.scrollLeft = e;
    },
        F = function () {
      if (S && p) {
        var e = i.type.Array(p) ? p : g.slice(0);
        p = !1;
        var t = v;
        v = d.scrollPos();
        var n = v - t;
        0 !== n && (m = n > 0 ? l : c), m === c && e.reverse(), e.forEach(function (e) {
          e.update(!0);
        });
      }
    },
        L = function () {
      o = i.rAF(F);
    },
        T = function (e) {
      "resize" == e.type && (y = z(), m = u), p !== !0 && (p = !0, L());
    },
        A = function () {
      if (!w && y != z()) {
        var e;

        try {
          e = new Event("resize", {
            bubbles: !1,
            cancelable: !1
          });
        } catch (t) {
          e = document.createEvent("Event"), e.initEvent("resize", !1, !1);
        }

        h.container.dispatchEvent(e);
      }

      g.forEach(function (e) {
        e.refresh();
      }), E();
    };

    this._options = h;

    var O = function (e) {
      if (e.length <= 1) return e;
      var t = e.slice(0);
      return t.sort(function (e, t) {
        return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
      }), t;
    };

    return this.addScene = function (t) {
      if (i.type.Array(t)) t.forEach(function (e) {
        d.addScene(e);
      });else if (t instanceof e.Scene) if (t.controller() !== d) t.addTo(d);else if (g.indexOf(t) < 0) {
        g.push(t), g = O(g), t.on("shift.controller_sort", function () {
          g = O(g);
        });

        for (var n in h.globalSceneOptions) t[n] && t[n].call(t, h.globalSceneOptions[n]);
      }
      return d;
    }, this.removeScene = function (e) {
      if (i.type.Array(e)) e.forEach(function (e) {
        d.removeScene(e);
      });else {
        var t = g.indexOf(e);
        t > -1 && (e.off("shift.controller_sort"), g.splice(t, 1), e.remove());
      }
      return d;
    }, this.updateScene = function (t, n) {
      return i.type.Array(t) ? t.forEach(function (e) {
        d.updateScene(e, n);
      }) : n ? t.update(!0) : p !== !0 && t instanceof e.Scene && (p = p || [], -1 == p.indexOf(t) && p.push(t), p = O(p), L()), d;
    }, this.update = function (e) {
      return T({
        type: "resize"
      }), e && F(), d;
    }, this.scrollTo = function (n, r) {
      if (i.type.Number(n)) C.call(h.container, n, r);else if (n instanceof e.Scene) n.controller() === d && d.scrollTo(n.scrollOffset(), r);else if (i.type.Function(n)) C = n;else {
        var o = i.get.elements(n)[0];

        if (o) {
          for (; o.parentNode.hasAttribute(t);) o = o.parentNode;

          var s = h.vertical ? "top" : "left",
              a = i.get.offset(h.container),
              l = i.get.offset(o);
          w || (a[s] -= d.scrollPos()), d.scrollTo(l[s] - a[s], r);
        }
      }
      return d;
    }, this.scrollPos = function (e) {
      return arguments.length ? (i.type.Function(e) && (x = e), d) : x.call(d);
    }, this.info = function (e) {
      var t = {
        size: y,
        vertical: h.vertical,
        scrollPos: v,
        scrollDirection: m,
        container: h.container,
        isDocument: w
      };
      return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t;
    }, this.loglevel = function () {
      return d;
    }, this.enabled = function (e) {
      return arguments.length ? (S != e && (S = !!e, d.updateScene(g, !0)), d) : S;
    }, this.destroy = function (e) {
      window.clearTimeout(s);

      for (var t = g.length; t--;) g[t].destroy(e);

      return h.container.removeEventListener("resize", T), h.container.removeEventListener("scroll", T), i.cAF(o), null;
    }, b(), d;
  };

  var n = {
    defaults: {
      container: window,
      vertical: !0,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100
    }
  };
  e.Controller.addOption = function (e, t) {
    n.defaults[e] = t;
  }, e.Controller.extend = function (t) {
    var n = this;
    e.Controller = function () {
      return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this;
    }, i.extend(e.Controller, n), e.Controller.prototype = n.prototype, e.Controller.prototype.constructor = e.Controller;
  }, e.Scene = function (n) {
    var o,
        s,
        a = "BEFORE",
        l = "DURING",
        c = "AFTER",
        u = r.defaults,
        f = this,
        d = i.extend({}, u, n),
        h = a,
        g = 0,
        p = {
      start: 0,
      end: 0
    },
        v = 0,
        m = !0,
        w = function () {
      for (var e in d) u.hasOwnProperty(e) || delete d[e];

      for (var t in u) L(t);

      C();
    },
        y = {};

    this.on = function (e, t) {
      return i.type.Function(t) && (e = e.trim().split(" "), e.forEach(function (e) {
        var n = e.split("."),
            r = n[0],
            i = n[1];
        "*" != r && (y[r] || (y[r] = []), y[r].push({
          namespace: i || "",
          callback: t
        }));
      })), f;
    }, this.off = function (e, t) {
      return e ? (e = e.trim().split(" "), e.forEach(function (e) {
        var n = e.split("."),
            r = n[0],
            i = n[1] || "",
            o = "*" === r ? Object.keys(y) : [r];
        o.forEach(function (e) {
          for (var n = y[e] || [], r = n.length; r--;) {
            var o = n[r];
            !o || i !== o.namespace && "*" !== i || t && t != o.callback || n.splice(r, 1);
          }

          n.length || delete y[e];
        });
      }), f) : f;
    }, this.trigger = function (t, n) {
      if (t) {
        var r = t.trim().split("."),
            i = r[0],
            o = r[1],
            s = y[i];
        s && s.forEach(function (t) {
          o && o !== t.namespace || t.callback.call(f, new e.Event(i, t.namespace, f, n));
        });
      }

      return f;
    }, f.on("change.internal", function (e) {
      "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? E() : "reverse" === e.what && f.update());
    }).on("shift.internal", function () {
      S(), f.update();
    }), this.addTo = function (t) {
      return t instanceof e.Controller && s != t && (s && s.removeScene(f), s = t, C(), b(!0), E(!0), S(), s.info("container").addEventListener("resize", x), t.addScene(f), f.trigger("add", {
        controller: s
      }), f.update()), f;
    }, this.enabled = function (e) {
      return arguments.length ? (m != e && (m = !!e, f.update(!0)), f) : m;
    }, this.remove = function () {
      if (s) {
        s.info("container").removeEventListener("resize", x);
        var e = s;
        s = void 0, e.removeScene(f), f.trigger("remove");
      }

      return f;
    }, this.destroy = function (e) {
      return f.trigger("destroy", {
        reset: e
      }), f.remove(), f.off("*.*"), null;
    }, this.update = function (e) {
      if (s) if (e) {
        if (s.enabled() && m) {
          var t,
              n = s.info("scrollPos");
          t = d.duration > 0 ? (n - p.start) / (p.end - p.start) : n >= p.start ? 1 : 0, f.trigger("update", {
            startPos: p.start,
            endPos: p.end,
            scrollPos: n
          }), f.progress(t);
        } else T && h === l && O(!0);
      } else s.updateScene(f, !1);
      return f;
    }, this.refresh = function () {
      return b(), E(), f;
    }, this.progress = function (e) {
      if (arguments.length) {
        var t = !1,
            n = h,
            r = s ? s.info("scrollDirection") : "PAUSED",
            i = d.reverse || e >= g;

        if (0 === d.duration ? (t = g != e, g = 1 > e && i ? 0 : 1, h = 0 === g ? a : l) : 0 > e && h !== a && i ? (g = 0, h = a, t = !0) : e >= 0 && 1 > e && i ? (g = e, h = l, t = !0) : e >= 1 && h !== c ? (g = 1, h = c, t = !0) : h !== l || i || O(), t) {
          var o = {
            progress: g,
            state: h,
            scrollDirection: r
          },
              u = h != n,
              p = function (e) {
            f.trigger(e, o);
          };

          u && n !== l && (p("enter"), p(n === a ? "start" : "end")), p("progress"), u && h !== l && (p(h === a ? "start" : "end"), p("leave"));
        }

        return f;
      }

      return g;
    };

    var S = function () {
      p = {
        start: v + d.offset
      }, s && d.triggerElement && (p.start -= s.info("size") * d.triggerHook), p.end = p.start + d.duration;
    },
        b = function (e) {
      if (o) {
        var t = "duration";
        F(t, o.call(f)) && !e && (f.trigger("change", {
          what: t,
          newval: d[t]
        }), f.trigger("shift", {
          reason: t
        }));
      }
    },
        E = function (e) {
      var n = 0,
          r = d.triggerElement;

      if (s && r) {
        for (var o = s.info(), a = i.get.offset(o.container), l = o.vertical ? "top" : "left"; r.parentNode.hasAttribute(t);) r = r.parentNode;

        var c = i.get.offset(r);
        o.isDocument || (a[l] -= s.scrollPos()), n = c[l] - a[l];
      }

      var u = n != v;
      v = n, u && !e && f.trigger("shift", {
        reason: "triggerElementPosition"
      });
    },
        x = function () {
      d.triggerHook > 0 && f.trigger("shift", {
        reason: "containerResize"
      });
    },
        z = i.extend(r.validate, {
      duration: function (e) {
        if (i.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
          var t = parseFloat(e) / 100;

          e = function () {
            return s ? s.info("size") * t : 0;
          };
        }

        if (i.type.Function(e)) {
          o = e;

          try {
            e = parseFloat(o());
          } catch (t) {
            e = -1;
          }
        }

        if (e = parseFloat(e), !i.type.Number(e) || 0 > e) throw o ? (o = void 0, 0) : 0;
        return e;
      }
    }),
        C = function (e) {
      e = arguments.length ? [e] : Object.keys(z), e.forEach(function (e) {
        var t;
        if (z[e]) try {
          t = z[e](d[e]);
        } catch (n) {
          t = u[e];
        } finally {
          d[e] = t;
        }
      });
    },
        F = function (e, t) {
      var n = !1,
          r = d[e];
      return d[e] != t && (d[e] = t, C(e), n = r != d[e]), n;
    },
        L = function (e) {
      f[e] || (f[e] = function (t) {
        return arguments.length ? ("duration" === e && (o = void 0), F(e, t) && (f.trigger("change", {
          what: e,
          newval: d[e]
        }), r.shifts.indexOf(e) > -1 && f.trigger("shift", {
          reason: e
        })), f) : d[e];
      });
    };

    this.controller = function () {
      return s;
    }, this.state = function () {
      return h;
    }, this.scrollOffset = function () {
      return p.start;
    }, this.triggerPosition = function () {
      var e = d.offset;
      return s && (e += d.triggerElement ? v : s.info("size") * f.triggerHook()), e;
    };
    var T, A;
    f.on("shift.internal", function (e) {
      var t = "duration" === e.reason;
      (h === c && t || h === l && 0 === d.duration) && O(), t && _();
    }).on("progress.internal", function () {
      O();
    }).on("add.internal", function () {
      _();
    }).on("destroy.internal", function (e) {
      f.removePin(e.reset);
    });

    var O = function (e) {
      if (T && s) {
        var t = s.info(),
            n = A.spacer.firstChild;

        if (e || h !== l) {
          var r = {
            position: A.inFlow ? "relative" : "absolute",
            top: 0,
            left: 0
          },
              o = i.css(n, "position") != r.position;
          A.pushFollowers ? d.duration > 0 && (h === c && 0 === parseFloat(i.css(A.spacer, "padding-top")) ? o = !0 : h === a && 0 === parseFloat(i.css(A.spacer, "padding-bottom")) && (o = !0)) : r[t.vertical ? "top" : "left"] = d.duration * g, i.css(n, r), o && _();
        } else {
          "fixed" != i.css(n, "position") && (i.css(n, {
            position: "fixed"
          }), _());
          var u = i.get.offset(A.spacer, !0),
              f = d.reverse || 0 === d.duration ? t.scrollPos - p.start : Math.round(g * d.duration * 10) / 10;
          u[t.vertical ? "top" : "left"] += f, i.css(A.spacer.firstChild, {
            top: u.top,
            left: u.left
          });
        }
      }
    },
        _ = function () {
      if (T && s && A.inFlow) {
        var e = h === l,
            t = s.info("vertical"),
            n = A.spacer.firstChild,
            r = i.isMarginCollapseType(i.css(A.spacer, "display")),
            o = {};
        A.relSize.width || A.relSize.autoFullWidth ? e ? i.css(T, {
          width: i.get.width(A.spacer)
        }) : i.css(T, {
          width: "100%"
        }) : (o["min-width"] = i.get.width(t ? T : n, !0, !0), o.width = e ? o["min-width"] : "auto"), A.relSize.height ? e ? i.css(T, {
          height: i.get.height(A.spacer) - (A.pushFollowers ? d.duration : 0)
        }) : i.css(T, {
          height: "100%"
        }) : (o["min-height"] = i.get.height(t ? n : T, !0, !r), o.height = e ? o["min-height"] : "auto"), A.pushFollowers && (o["padding" + (t ? "Top" : "Left")] = d.duration * g, o["padding" + (t ? "Bottom" : "Right")] = d.duration * (1 - g)), i.css(A.spacer, o);
      }
    },
        N = function () {
      s && T && h === l && !s.info("isDocument") && O();
    },
        P = function () {
      s && T && h === l && ((A.relSize.width || A.relSize.autoFullWidth) && i.get.width(window) != i.get.width(A.spacer.parentNode) || A.relSize.height && i.get.height(window) != i.get.height(A.spacer.parentNode)) && _();
    },
        D = function (e) {
      s && T && h === l && !s.info("isDocument") && (e.preventDefault(), s._setScrollPos(s.info("scrollPos") - ((e.wheelDelta || e[s.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)));
    };

    this.setPin = function (e, n) {
      var r = {
        pushFollowers: !0,
        spacerClass: "scrollmagic-pin-spacer"
      };
      if (n = i.extend({}, r, n), e = i.get.elements(e)[0], !e) return f;
      if ("fixed" === i.css(e, "position")) return f;

      if (T) {
        if (T === e) return f;
        f.removePin();
      }

      T = e;
      var o = T.parentNode.style.display,
          s = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
      T.parentNode.style.display = "none";
      var a = "absolute" != i.css(T, "position"),
          l = i.css(T, s.concat(["display"])),
          c = i.css(T, ["width", "height"]);
      T.parentNode.style.display = o, !a && n.pushFollowers && (n.pushFollowers = !1);
      var u = T.parentNode.insertBefore(document.createElement("div"), T),
          d = i.extend(l, {
        position: a ? "relative" : "absolute",
        boxSizing: "content-box",
        mozBoxSizing: "content-box",
        webkitBoxSizing: "content-box"
      });

      if (a || i.extend(d, i.css(T, ["width", "height"])), i.css(u, d), u.setAttribute(t, ""), i.addClass(u, n.spacerClass), A = {
        spacer: u,
        relSize: {
          width: "%" === c.width.slice(-1),
          height: "%" === c.height.slice(-1),
          autoFullWidth: "auto" === c.width && a && i.isMarginCollapseType(l.display)
        },
        pushFollowers: n.pushFollowers,
        inFlow: a
      }, !T.___origStyle) {
        T.___origStyle = {};
        var h = T.style,
            g = s.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
        g.forEach(function (e) {
          T.___origStyle[e] = h[e] || "";
        });
      }

      return A.relSize.width && i.css(u, {
        width: c.width
      }), A.relSize.height && i.css(u, {
        height: c.height
      }), u.appendChild(T), i.css(T, {
        position: a ? "relative" : "absolute",
        margin: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto"
      }), (A.relSize.width || A.relSize.autoFullWidth) && i.css(T, {
        boxSizing: "border-box",
        mozBoxSizing: "border-box",
        webkitBoxSizing: "border-box"
      }), window.addEventListener("scroll", N), window.addEventListener("resize", N), window.addEventListener("resize", P), T.addEventListener("mousewheel", D), T.addEventListener("DOMMouseScroll", D), O(), f;
    }, this.removePin = function (e) {
      if (T) {
        if (h === l && O(!0), e || !s) {
          var n = A.spacer.firstChild;

          if (n.hasAttribute(t)) {
            var r = A.spacer.style,
                o = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            margins = {}, o.forEach(function (e) {
              margins[e] = r[e] || "";
            }), i.css(n, margins);
          }

          A.spacer.parentNode.insertBefore(n, A.spacer), A.spacer.parentNode.removeChild(A.spacer), T.parentNode.hasAttribute(t) || (i.css(T, T.___origStyle), delete T.___origStyle);
        }

        window.removeEventListener("scroll", N), window.removeEventListener("resize", N), window.removeEventListener("resize", P), T.removeEventListener("mousewheel", D), T.removeEventListener("DOMMouseScroll", D), T = void 0;
      }

      return f;
    };
    var R,
        k = [];
    return f.on("destroy.internal", function (e) {
      f.removeClassToggle(e.reset);
    }), this.setClassToggle = function (e, t) {
      var n = i.get.elements(e);
      return 0 !== n.length && i.type.String(t) ? (k.length > 0 && f.removeClassToggle(), R = t, k = n, f.on("enter.internal_class leave.internal_class", function (e) {
        var t = "enter" === e.type ? i.addClass : i.removeClass;
        k.forEach(function (e) {
          t(e, R);
        });
      }), f) : f;
    }, this.removeClassToggle = function (e) {
      return e && k.forEach(function (e) {
        i.removeClass(e, R);
      }), f.off("start.internal_class end.internal_class"), R = void 0, k = [], f;
    }, w(), f;
  };
  var r = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: void 0,
      triggerHook: .5,
      reverse: !0,
      loglevel: 2
    },
    validate: {
      offset: function (e) {
        if (e = parseFloat(e), !i.type.Number(e)) throw 0;
        return e;
      },
      triggerElement: function (e) {
        if (e = e || void 0) {
          var t = i.get.elements(e)[0];
          if (!t) throw 0;
          e = t;
        }

        return e;
      },
      triggerHook: function (e) {
        var t = {
          onCenter: .5,
          onEnter: 1,
          onLeave: 0
        };
        if (i.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));else {
          if (!(e in t)) throw 0;
          e = t[e];
        }
        return e;
      },
      reverse: function (e) {
        return !!e;
      }
    },
    shifts: ["duration", "offset", "triggerHook"]
  };
  e.Scene.addOption = function (e, t, n, i) {
    e in r.defaults || (r.defaults[e] = t, r.validate[e] = n, i && r.shifts.push(e));
  }, e.Scene.extend = function (t) {
    var n = this;
    e.Scene = function () {
      return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this;
    }, i.extend(e.Scene, n), e.Scene.prototype = n.prototype, e.Scene.prototype.constructor = e.Scene;
  }, e.Event = function (e, t, n, r) {
    r = r || {};

    for (var i in r) this[i] = r[i];

    return this.type = e, this.target = this.currentTarget = n, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this;
  };

  var i = e._util = function (e) {
    var t,
        n = {},
        r = function (e) {
      return parseFloat(e) || 0;
    },
        i = function (t) {
      return t.currentStyle ? t.currentStyle : e.getComputedStyle(t);
    },
        o = function (t, n, o, s) {
      if (n = n === document ? e : n, n === e) s = !1;else if (!f.DomElement(n)) return 0;
      t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
      var a = (o ? n["offset" + t] || n["outer" + t] : n["client" + t] || n["inner" + t]) || 0;

      if (o && s) {
        var l = i(n);
        a += "Height" === t ? r(l.marginTop) + r(l.marginBottom) : r(l.marginLeft) + r(l.marginRight);
      }

      return a;
    },
        s = function (e) {
      return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function (e) {
        return e[1].toUpperCase();
      });
    };

    n.extend = function (e) {
      for (e = e || {}, t = 1; t < arguments.length; t++) if (arguments[t]) for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);

      return e;
    }, n.isMarginCollapseType = function (e) {
      return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1;
    };
    var a = 0,
        l = ["ms", "moz", "webkit", "o"],
        c = e.requestAnimationFrame,
        u = e.cancelAnimationFrame;

    for (t = 0; !c && t < l.length; ++t) c = e[l[t] + "RequestAnimationFrame"], u = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"];

    c || (c = function (t) {
      var n = new Date().getTime(),
          r = Math.max(0, 16 - (n - a)),
          i = e.setTimeout(function () {
        t(n + r);
      }, r);
      return a = n + r, i;
    }), u || (u = function (t) {
      e.clearTimeout(t);
    }), n.rAF = c.bind(e), n.cAF = u.bind(e);

    var f = n.type = function (e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    };

    f.String = function (e) {
      return "string" === f(e);
    }, f.Function = function (e) {
      return "function" === f(e);
    }, f.Array = function (e) {
      return Array.isArray(e);
    }, f.Number = function (e) {
      return !f.Array(e) && e - parseFloat(e) + 1 >= 0;
    }, f.DomElement = function (e) {
      return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
    };
    var d = n.get = {};
    return d.elements = function (t) {
      var n = [];
      if (f.String(t)) try {
        t = document.querySelectorAll(t);
      } catch (e) {
        return n;
      }
      if ("nodelist" === f(t) || f.Array(t)) for (var r = 0, i = n.length = t.length; i > r; r++) {
        var o = t[r];
        n[r] = f.DomElement(o) ? o : d.elements(o);
      } else (f.DomElement(t) || t === document || t === e) && (n = [t]);
      return n;
    }, d.scrollTop = function (t) {
      return t && "number" == typeof t.scrollTop ? t.scrollTop : e.pageYOffset || 0;
    }, d.scrollLeft = function (t) {
      return t && "number" == typeof t.scrollLeft ? t.scrollLeft : e.pageXOffset || 0;
    }, d.width = function (e, t, n) {
      return o("width", e, t, n);
    }, d.height = function (e, t, n) {
      return o("height", e, t, n);
    }, d.offset = function (e, t) {
      var n = {
        top: 0,
        left: 0
      };

      if (e && e.getBoundingClientRect) {
        var r = e.getBoundingClientRect();
        n.top = r.top, n.left = r.left, t || (n.top += d.scrollTop(), n.left += d.scrollLeft());
      }

      return n;
    }, n.addClass = function (e, t) {
      t && (e.classList ? e.classList.add(t) : e.className += " " + t);
    }, n.removeClass = function (e, t) {
      t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "));
    }, n.css = function (e, t) {
      if (f.String(t)) return i(e)[s(t)];

      if (f.Array(t)) {
        var n = {},
            r = i(e);
        return t.forEach(function (e) {
          n[e] = r[s(e)];
        }), n;
      }

      for (var o in t) {
        var a = t[o];
        a == parseFloat(a) && (a += "px"), e.style[s(o)] = a;
      }
    }, n;
  }(window || {});

  return e;
});

/***/ })

}]);
//# sourceMappingURL=vendor.js.map