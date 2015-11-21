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
 *
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
