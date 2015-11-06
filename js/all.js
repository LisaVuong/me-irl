$(document).ready(function(){
	//cache jQueries
	var _container 		= $('.container');
	var _portfolioblock	= $('.item-image');
	var _foldcontent	= $('.fold-content');
	var _tapestryimg		= $('.tapestry-img');

	//touch support?
	document.addEventListener("touchstart", function(){}, true)
	
	function resizetapestrys() {
		var _windowwidth 	= $(window).width();
		var _tapestrywidth 	= _tapestryimg.width();
		var _widthdiff		= 0;
		if (_windowwidth < _tapestrywidth) {
			_widthdiff = _tapestrywidth - _windowwidth;
			console.log(_widthdiff);
			_widthdiff = (_widthdiff/2);
			_widthdiff = 0 - _widthdiff;
			_tapestryimg.css("margin-left", _widthdiff);
		}
		else if(_tapestrywidth < _windowwidth) {
			_tapestryimg.css("margin-left", 0);
		}
		else {
			console.log("nah");
		}
	}

	resizetapestrys();

	$(window).resize(function() {
		resizetapestrys();
	});



    _portfolioblock.click(function() {
        var _clickindex = _portfolioblock.index(this);
        if($(this).next().hasClass("unfolded")){
            $(this).next().slideUp();
            $(this).next().removeClass("unfolded");
            $(this).find("img.tapestry-img").addClass("b_w");
        }
        else {
            $("img.tapestry-img").addClass("b_w");
            _foldcontent.slideUp(300);
            _foldcontent.removeClass("unfolded");
            $(this).next().addClass("unfolded");
        $(this).find("img.tapestry-img").removeClass("b_w");
            $(this).next().slideDown(200, function(){
                var that = $(this);
                setTimeout(function() {
                    $("html, body").animate({
                        scrollTop: that.offset().top-150
                    },300);
                }, 100);
            });
        }
        return false;
    });
    
	$('.slider').cbpFWSlider();

    animateImages();
});

function isWebkitBrowser() {
    return /WebKit/.test(navigator.userAgent);
}

function animateImages () {
    var images = $('.tapestry-img');

    var activeIdx = 0;
    var animateInterval = setInterval(function() {
        if (activeIdx < images.length) {
            $(images[activeIdx]).css('opacity', '1');
        }

        if (activeIdx > 0) {
            if (isWebkitBrowser()) {
                $(images[activeIdx - 1]).addClass('b_w');
            } else {
                var img = images[activeIdx - 1];
                var src = $(img).attr('src');
                $(img).addClass('b_w').after('<img src="' + src + '" class="color_overlay">');
                $(img).parent().find('img.color_overlay').fadeOut(800);
            }
        }

        activeIdx++;
        if (activeIdx > images.length ) {
            clearInterval(animateInterval);
        }

    }, 200);

    return;

    if (!isWebkitBrowser()) {
        images.each(function(idx) {
            console.log(this);
            // This is a hack. Firefox doesn't support grayscale filters, and while you can grayscale
            // an image with SVG filters, it doesn't support transitioning on those.
            // Instead we create a second image the same as the first that's colored that we can fade in.
            var src = $(this).attr('src');
            $(this).css('opacity', '1').after('<img src="' + src + '" class="color_overlay">');
        });
    }

}
