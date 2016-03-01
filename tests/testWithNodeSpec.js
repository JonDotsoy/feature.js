
var Feature;

describe("Feature with Node" , function () {

	it ("is correct load", function () {

		Feature = require("../feature.js");

	});

	it ("is Node Platform", function () {

		expect(Feature.node).toBe(true);
		expect(Feature.browser).toBe(false);

	});

	it ("feature original characteristics", function () {

		expect(Feature.async).toBe(false);
		expect(Feature.addEventListener).toBe(false);
		expect(Feature.canvas).toBe(false);
		expect(Feature.classList).toBe(false);
		expect(Feature.cors).toBe(false);
		expect(Feature.contextMenu).toBe(false);
		expect(Feature.css3Dtransform).toBe(false);
		expect(Feature.cssTransform).toBe(false);
		expect(Feature.cssTransition).toBe(false);
		expect(Feature.defer).toBe(false);
		expect(Feature.deviceMotion).toBe(false);
		expect(Feature.deviceOrientation).toBe(false);
		expect(Feature.geolocation).toBe(false);
		expect(Feature.historyAPI).toBe(false);
		expect(Feature.placeholder).toBe(false);
		expect(Feature.localStorage).toBe(false);
		expect(Feature.matchMedia).toBe(false);
		expect(Feature.pictureElement).toBe(false);
		expect(Feature.querySelectorAll).toBe(false);
		expect(Feature.remUnit).toBe(false);
		expect(Feature.serviceWorker).toBe(false);
		expect(Feature.sizes).toBe(false);
		expect(Feature.srcset).toBe(false);
		expect(Feature.svg).toBe(false);
		expect(Feature.touch).toBe(false);
		expect(Feature.viewportUnit).toBe(false);
		expect(Feature.webGL).toBe(false);

	});

});

