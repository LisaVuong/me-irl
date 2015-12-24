/**
 *	Initalizes all sliders
 */
var init = function() {

	//	Initialize image sliders
	var imageSliders = [];
	var imageElements = document.getElementsByClassName('image-slider');
	for(var i = 0; i < imageElements.length; i++) {
		var slider = ImageSlider();
		slider.init(imageElements[i]);
		imageSliders.push(slider);
	}

	//	Initialize tab sliders
	var tabElements = document.getElementsByClassName('tab-slider');
	for(var i = 0; i < tabElements.length; i++) {
		var slider = TabSlider();				// Create new Slider object
		slider.init(tabElements[i]);		// Initialize it with HTML element
	}
};

init();
