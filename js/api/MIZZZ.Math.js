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
     *
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
