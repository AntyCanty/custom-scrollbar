"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Utility = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("../assets/styles/index.css");

// FIXME: utility function This is not for prod
var Utility = /*#__PURE__*/function () {
  function Utility() {
    (0, _classCallCheck2["default"])(this, Utility);
  }

  (0, _createClass2["default"])(Utility, null, [{
    key: "mountItems",
    value: function mountItems(n, scroller) {
      var item = null; // generating content for scroll container

      for (var i = 0; i < n; i++) {
        item = document.createElement("div");
        item.classList.add("item");
        item.style.backgroundColor = this.colors[Utility.random(0, this.colors.length)];
        item.textContent = "hello world";
        scroller.appendChild(item);
      }
    }
  }, {
    key: "random",
    value: function random(min, max) {
      return Math.floor(Math.random() * max) + min;
    }
  }]);
  return Utility;
}();

exports.Utility = Utility;
(0, _defineProperty2["default"])(Utility, "colors", ["#f4a261", "#bde0fe", "#e5989b", "#cad2c5", "#2ec4b6", "#99d98c", "#6c757d", "#1985a1", "#fe5f55", "#61a5c2", "#ee4266"]);

var CustomScrollbar = /*#__PURE__*/function () {
  function CustomScrollbar(container) {
    (0, _classCallCheck2["default"])(this, CustomScrollbar);
    (0, _defineProperty2["default"])(this, "box", null);
    (0, _defineProperty2["default"])(this, "scroll", null);
    (0, _defineProperty2["default"])(this, "scrollDragger", null);
    (0, _defineProperty2["default"])(this, "scroller", null);
    var box = document.createElement('div');
    box.classList.add('box');
    if (!container) throw new Error("Pass the container of the scrollableArea");
    this.scroll = document.createElement('div');
    this.scroll.classList.add('scroll');
    this.scroller = document.createElement('div');
    this.scroller.classList.add('scroller');
    this.scrollerDragger = document.createElement('div');
    this.scrollerDragger.classList.add('scrollerDragger');
    this.scrollerDragger.appendChild(this.scroll);
    box.appendChild(this.scroller);
    box.appendChild(this.scrollerDragger);
    container.appendChild(box);
    this.attach = false;
  }

  (0, _createClass2["default"])(CustomScrollbar, [{
    key: "handleScrollerHeight",
    value: function handleScrollerHeight() {
      var factor = this.scroller.clientHeight / this.scroller.scrollHeight;
      var minHeight = this.scroller.clientHeight;
      var currentScrollerHeight = minHeight * factor;
      this.scroll.style.height = currentScrollerHeight + "px";
    }
  }, {
    key: "calcPercentage",
    value: function calcPercentage(e) {
      this.handleScrollerHeight(e.target, this.scroll);
      var maxPerc = (this.scroller.clientHeight - this.scroll.clientHeight) / this.scroller.clientHeight;
      var percentage = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight) * 100;
      return percentage * maxPerc;
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.scroller.addEventListener('scroll', function (e) {
        var percentage = _this.calcPercentage(e);

        if (!_this.attach) _this.scroll.style.top = percentage + "%";
      });
      this.scrollerDragger.addEventListener("mousemove", function (e) {
        if (_this.check(e)) {
          return;
        }

        if (_this.attach) {
          var max = (_this.scrollerDragger.clientHeight - _this.scroll.clientHeight) / _this.scrollerDragger.clientHeight;
          var percentage = 100 * (e.clientY - _this.scrollerDragger.offsetTop) / _this.scrollerDragger.clientHeight;
          var goTo = percentage / 100 * _this.scroller.scrollHeight;

          _this.scroller.scrollTo({
            top: goTo,
            behavior: "auto"
          });

          _this.scroll.style.top = e.clientY - scrollerDragger.offsetTop - scroll.clientHeight / 2 + "px";
        }
      });
      this.scroll.addEventListener("mousedown", function (e) {
        _this.attach = true;
      });
      this.scroll.addEventListener("mouseup", function (e) {
        _this.attach = false;
      });
      this.scrollerDragger.addEventListener("mouseup", function (e) {
        _this.attach = false;
      }); // return the reference to the scrollableContaier

      return this.scroller;
    }
  }, {
    key: "check",
    value: function check(e) {
      return e.clientY - this.scrollerDragger.offsetTop + this.scroll.clientHeight / 2 > this.scrollerDragger.clientHeight || e.clientY - this.scrollerDragger.offsetTop - this.scroll.clientHeight / 2 < 0;
    }
  }]);
  return CustomScrollbar;
}();

var _default = CustomScrollbar;
exports["default"] = _default;