MIZZZ.Core.namespace('MIZZZ.Util');

/**
 * @fileOverview 様々な便利APIを記述するファイルです。
 *
 * @author Shunsuke Mizusawa
 * @version 1.0.0
 */

/**
 * 様々な便利APIを提供します
 *
 * @class 様々な便利APIを提供します
 * @param {}
 */
MIZZZ.Util = (function (document) {
  'use strict';

  var _doc  = document,
      _body = _doc.getElementsByTagName('body')[0];

  // Public API
  return {
    /**
     * 必要なとき動的にスクリプトを読みこみます
     *
     * @param  {String}   file     ファイルのパス
     * @param  {Function} callback スクリプト読み込み後に実行する関数
     *
     * @example
     * MIZZZ.Util.onDemand('js/hoge.js', onDemandAfter);
     * hoge.jsを読み込み、その後に関数onDemandAfterを実行します。
     */
    onDemandScript: function (file, callback) {
      var _newjs = _doc.createElement('script');

      // callbackが関数か
      if (typeof callback !== 'function') {
        callback = false;
      }

      // コールバック
      // IE
      _newjs.onstatechange = function () {
        if (_newjs.readyState === 'loaded' || _newjs.readyState ===  'complete') {
          _newjs.onstatechange = null;
          if (callback) {
            callback();
          }
        }
      };
      // IE以外
      _newjs.onload = function () {
        if (callback) {
          callback();
        }
      };

      _newjs.src = file;
      _body.appendChild(_newjs);
    }
  };
}(window.document));
