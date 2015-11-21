var d = document.getElementById('gHeader');
d.addEventListener('click', function () {
	MIZZZ.Util.onDemandScript('js/hoge.js', function () {
	onDemandAfter();
	});
}, false);
