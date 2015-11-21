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
     *
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
     *
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
     *
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
     *
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
