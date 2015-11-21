/**
 * @fileOverview API使用時に常にはじめに読み込むファイルです。
 *
 * @author Shunsuke Mizusawa
 * @version 1.0.0
 */

/**
 * APIのグローバル名前空間
 *
 * @type Object
 * @return {Object}
 */
var MIZZZ = MIZZZ || {};

// Core名前空間
MIZZZ.Core = MIZZZ.Core || {};

/**
 * API使用時の基本的機能を提供します。
 * @class 常に最初に読み込み、名前空間の解決などAPI使用時の基本的機能を提供します。
 * @param {Object} global windowオブジェクト
 */
MIZZZ.Core = (function (global) {
  'use strict';

  var // window
      _win = global;

  return {
    /**
     * 名前空間を定義、生成します
     *
     * @param {String} ns_string 名前空間として使用する文字列
     * @return {Obejct} 文字列から作られた名前空間をもつオブジェクト
     *
     * @example
     * MIZZZ.namespace('MIZZZ.Event.addListener');
     * MIZZZオブジェクトの、Eventプロパティに、addListenerメソッドを追加します
     */
    namespace: function (ns_string) {
      var parts  = ns_string.split('.'),
          root   = parts.shift(0),
          parent = _win[root],
          i   = 0,
          max = parts.length;

      for (; i < max; i += 1) {
        if (typeof parent[parts[i]] === 'undefined') {
          parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
      }
      return parent;
    }
  };
}(window));
MIZZZ.Core.namespace('MIZZZ.Event');

/**
 * @fileOverview イベント関連APIを記述するファイルです。
 *
 * @author Shunsuke Mizusawa
 * @version 1.0.0
 */

/**
 * イベント関連のAPIを提供します
 *
 * @class イベント関連のAPIを提供します。
 * @param {Object} global windowオブジェクト
 */
MIZZZ.Event = (function (global) {
  'use strict';

  var _win = global, // window

  // Private method
  // addListenerの機能テスト → 定義
  _addListener = (function () {
    if (_win.addEventListener) {
      return function (el, type, fn) {
        el.addEventListener(type, fn, false);
      };
    } else if (document.attachEvent) {
      return function (el, type, fn) {
        el.attachEvent('on' + type, fn);
      };
    } else {
      el['on' + type] = fn;
    }
  }()),

  // Private method
  // removeListenerの機能テスト → 定義
  _removeListener = (function () {
    if (_win.removeEventListener) {
      return function (el, type, fn) {
        el.removeEventListener(type, fn, false);
      };
    } else if (document.detachEvent) {
      return function (el, type, fn) {
        el.detachEvent('on' + type, fn);
      };
    } else {
      el['on' + type] = null;
    }
  }());

  // Public API
  return {
    /**
     * ブラウザ間の差異を吸収して、DOM要素のイベントにメソッドを紐づけます。
     * @param  {Object}   el   イベントにメソッドを紐づけるDOM要素
     * @param  {String}   type 紐づけるイベント名
     * @param  {Function} fn   紐づけるメソッド
     *
     * @example
     * var submitBtn = document.getElementById('submitButton');
     * MIZZZ.Event.addListener(submitBtn, 'click', sendMessege);
     * #submitButtonの要素のクリックイベントに、sendMessegeメソッドを紐づけます。
     */
    addListener: function (el, type, fn) {
      _addListener(el, type, fn);
    },

    /**
     * ブラウザ間の差異を吸収して、DOM要素に紐づけたメソッドを消去します。
     * @param  {Object}   el   紐づけたメソッドを削除するDOM要素
     * @param  {String}   type 紐づけたイベント名
     * @param  {Function} fn   紐づけを削除するメソッド
     *
     * @example
     * var submitBtn = document.getElementById('submitButton');
     * MIZZZ.Event.removeListener(submitBtn, 'click', sendMessege);
     * #submitButtonの要素のクリックイベントから、sendMessegeメソッドを削除します。
     */
    removeListener: function (el, type, fn) {
      _removeListener(el, type, fn);
    },

    /**
     * ブラウザ間の差異を吸収して、イベントオブジェクトを取得します。
     * @param  {Object} e イベントオブジェクト
     * @return {Object}   イベントオブジェクトとイベント発生元のDOM要素
     * @example
     * var eventObj = MIZZZ.Event.getEventObj(e);
     * eventObj.e → イベントオブジェクト
     * eventObj.src → イベント発生元のDOM要素
     */
    getEventObj: function (e) {
      var EventObj = e || window.event,
          src = EventObj.target || EventObj.srcElement;
      return {
        e  : EventObj,
        src: src
      };
    },

    /**
     * ブラウザ間の差異を吸収して、バブリングとデフォルトの挙動をストップします。
     * @param  {Object} e イベントオブジェクト
     * @example
     * MIZZZ.Event.stop(eventObj.e);
     */
    stop: function (e) {
      // MODERN BROWSER
      if (typeof e.preventDefault === 'function') {
        e.preventDefault();
      // LESS THAN IE8
      } else if (window.event) {
        e.returnValue = false;
      }

      // MODERN BROWSER
      if (typeof e.stopPropagation === 'function') {
        e.stopPropagation();
        // LESS THAN IE8
      } else if (window.event) {
        e.cancelBubble = true;
      }
    }
  };
}(window));
MIZZZ.Core.namespace('MIZZZ.Math');

/**
 * @fileOverview 計算、演算関連APIを記述するファイルです。
 *
 * @author Shunsuke Mizusawa
 * @version 1.0.0
 */

/**
 * 計算、演算関連のAPIを提供します
 *
 * @class 計算、演算関連のAPIを提供します。
 * @param {}
 */
MIZZZ.Math = (function () {
  'use strict';

  // Public API
  return {
    /**
     * 指定した範囲の乱数を返します。
     * @param  {Number} min 取得したい整数値の下限
     * @param  {Number} max 取得したい整数値の上限
     * @return {Number}     指定した範囲内の整数値
     *
     * @example
     * MIZZZ.Math.rand(-100, 100);
     * -100〜100までの乱数を返します。
     */
    rand: function (min, max) {
      var _num,
          _range = max - min;
      _num = Math.floor(Math.random() * (_range + 1));
      return max - _num;
    }
  };
}());
