var asianness = 4, hue = 0;

function colorize(grade) {
	// color is only for numerical grades
	if ( typeof grade != "number" || isNaN(parseInt(grade)) || grade == null) return "#FFF";

	// interpolate a hue gradient and convert to rgb
	var h, s, v, r, g, b;

	// determine color. ***MAGIC DO NOT TOUCH UNDER ANY CIRCUMSTANCES***
	if (grade < 0) {
		h = 0;
		s = 1;
		v = 0.86944;
	} else {
		h = Math.min(0.25 * Math.pow(grade / 100, asianness)
			// The following line limits the amount hue is allowed to
			// change in the gradient depending on how far the hue is
			// from a multiple of 90.
			+ Math.abs(45 - (hue + 45) % 90) / 256,
			// The following line puts a hard cap on the hue change.
			0.13056);
		s = 1 - Math.pow(grade / 100, asianness * 2);
		v = 0.86944 + h;
	}

	// apply hue transformation
	h += hue/360;
	h %= 1;
	if (h < 0) h += 1;

	// extra credit gets a special color
	if (grade > 100) {
		h = 0.5;
		s = Math.min((grade - 100) / 15, 1);
		v = 1;
	}

	// convert to rgb: http://goo.gl/J9ra3
	var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

	switch(i % 6){
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}

	return "rgb(" + parseInt(r * 255) + "," + parseInt(g * 255) + "," + parseInt(b * 255) + ")";
}

var grades = Array.prototype.splice.call(document.querySelectorAll('td.grade'), 0);

grades.forEach(function (el) {
	el.style.backgroundColor = colorize(parseInt(el.innerText));
});