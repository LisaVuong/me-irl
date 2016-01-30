//
//	tabSlider.js
//

var TabSlider = function () {

	var currIndex;
	var maxIndex;

	var tabs;
	var selectBar;
	var selectSpacing;
	var pages;

	/**
	 *	Animates page transition
	 */
	var updatePage = function (newIndex) {
		pages[currIndex].className += ' hide';	// Hide class first before removing, prevent jumping scrollbar

		if (window.jQuery) {
			$.velocity.animate(pages[newIndex], 'fadeIn', 500);
		} else {
			Velocity(pages[newIndex], 'fadeIn', 500);
			if (newIndex != currIndex) {
				Velocity(pages[currIndex], 'fadeOut', 0);
			}
		}

		pages[currIndex].className = 'content-page';	// Return class to normal
	};

	/**
	 *	Selects a new tab
	 */
	var updateTab = function (newIndex) {
		var position = newIndex/maxIndex * 100 + selectSpacing/2 + '%';

		if (window.jQuery) {
			$.Velocity.animate(selectBar, { left: position }, 500);
		} else {
			Velocity(selectBar, { left: position }, 500);
		}

		tabs[currIndex].className = 'nav-title';
		tabs[newIndex].className += ' selected';
	};

	/**
	 *	Updates page and tabs
	 */
	var update = function (newIndex) {
		if (newIndex < 0 || newIndex >= maxIndex) {
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
		// Init variables
		tabs = slider.getElementsByClassName('nav-title');
		selectBar = slider.getElementsByClassName('select-bar')[0];
		pages = slider.getElementsByClassName('content-page');

		currIndex = 0;
		maxIndex = tabs.length;

		// Set nav selection bar
		selectSpacing = 130/Math.pow(maxIndex,2);
		selectBar.style.width = 100/maxIndex - selectSpacing + '%';
		selectBar.style.left = selectSpacing/2+'%';

		// Check for correct markup
		if (pages.length !== maxIndex) {
			console.lrog('Incorrect number of pages in tab slider');
			maxIndex = Math.min(pages.length, maxIndex);
		}

		// Add event listeners to nav bar
		for (var i = 0; i < maxIndex; i++) {
			(function(index){
				tabs[index].addEventListener('click', function(){
					update(index);
				});
			})(i);
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
