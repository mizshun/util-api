/**
 * @fileOverview A collection of generic methods
 *
 * @author Shunsuke Mizusawa
 * @version 0.1.0
 */

/**
 * API使用時の基本的機能を提供します。
 *
 * @type Object
 * @param  {Object} global windowオブジェクト
 * @return {Object}
 */
var util = ( function ( w ) {
	'use strict';

	var d = w.document,
		b = d.getElementsByTagName( 'body' )[0];

	return {
		/**
		* 名前空間を定義、生成します
		*
		* @param  {String} ns_string 名前空間として使用する文字列
		* @return {Obejct} 文字列から作られた名前空間をもつオブジェクト
		*
		* @example
		* util.namespace( 'util.Event.addListener' );
		* utilオブジェクトの、Eventプロパティに、addListenerメソッドを追加します
		*/
		namespace: function ( ns_string ) {
			var parts  = ns_string.split( '.' ),
				root   = parts.shift( 0 ),
				parent = _win[root],
				i      = 0,
				max    = parts.length;

			for ( ; i < max; i += 1 ) {
				if ( 'undefined' === typeof parent[parts[i]] ) {
					parent[parts[i]] = {};
				}
				parent = parent[parts[i]];
			}
			return parent;
		},

		/**
		* 必要なとき動的にスクリプトを読みこみます
		*
		* @param  {String}   file     ファイルのパス
		* @param  {Function} callback スクリプト読み込み後に実行する関数
		*
		* @example
		* loadScript.Util.( 'js/hoge.js', loadAfter );
		* hoge.jsを読み込み、その後に関数loadAfterを実行します。
		*/
		loadScript: function ( file, callback ) {
			var _newjs = _doc.createElement( 'script' );

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
			b.appendChild(_newjs);
		},

		/**
		 * 指定した範囲の乱数を返します。
		 *
		 * @param  {Number} min 取得したい整数値の下限
		 * @param  {Number} max 取得したい整数値の上限
		 * @return {Number}     指定した範囲内の整数値
		 *
		 * @example
		 * .Math.rand(-100, 100);
		 * -100〜100までの乱数を返します。
		 */
		rand: function ( min, max ) {
		 	var _num,
				_range = max - min;
		 	_num   = Math.floor( Math.random() * ( _range + 1 ) );
			return max - _num;
		}

	};
} ( window ) );
