import './style.less'

window.onload =function() {
    document.body.style.visibility = "visible"
};

[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
    console.log('hej')
	img.setAttribute('src', img.getAttribute('data-src'));
	img.onload = function() {
		img.removeAttribute('data-src');
    };
});
