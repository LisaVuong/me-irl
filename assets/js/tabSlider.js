//
//	tabSlider.js
//

var TabSlider = function () {

	var currIndex;
	var maxIndex;

	var tabs;
	var pages;

	/**
	 *	Animates page transition
	 */
	var updatePage = function (newIndex) {
		var position = -100/maxIndex * newIndex + '%';

		// With JQuery
		//$.Velocity.animate(pages, { translateX: position }, 500);

		// Without JQuery
		Velocity(pages, { translateX: position }, 500);
	};

	/**
	 *	Selects a new tab
	 */
	var updateTab = function (newIndex) {
		tabs[currIndex].className = 'nav-title';
		tabs[newIndex].className += ' selected';
		currIndex = newIndex;
	};

	/**
	 *	Updates page and tabs
	 */
	var update = function (newIndex) {
		if (newIndex < 0 || newIndex >= maxIndex) {
			console.log('Invalid index, out of bounds');
			return;
		}
		updatePage(newIndex);
		updateTab(newIndex);
		currIndex = newIndex;
	};

	/**
	 *	Adds event listeners
	 */
	var initSlide = function (slider) {
		tabs = slider.children[0].children[0].children;
		pages = slider.children[1].children[0];

		currIndex = 0;
		maxIndex = tabs.length;

		pages.style.width = 100 * maxIndex + '%';

		if(pages.children.length != maxIndex){
			console.log('Incorrect number of pages in tab slider');
			maxIndex = Math.min(pages.children.length, maxIndex);
		}

		for(var i = 0; i < maxIndex; i++) {
			pages.children[i].style.width = 100/maxIndex + '%';
			(function(index){
				tabs[index].addEventListener('click', function(){
					update(index);
				});
			})(i)
		}

		update(currIndex);
	};

	/**
	 *	Public methods
	 */
	return {
		init : initSlide
	};

};
