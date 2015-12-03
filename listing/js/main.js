//register onClick event for Search btn
//$('#main_search_btn').click(alert("test onclick"));

function do_search(){
	//alert("search btn onclick"+$("#main_search_textbox").val());
	var currentLoc = $('#main_loc').val();
	var searchText = $("#main_search_textbox").val();
	var selectedLatLng  = $('#main_search_hidden').val();
	window.location.href = "find-lawyer.html?searchText="+searchText+"&latlng="+selectedLatLng+"&currentLoc="+currentLoc;
}

function main() {

	(function() {
		'use strict'
		// Script
		// -----------------------------------

		function menubar_height() {
			jQuery('.rst-header-banner').css('padding-top',
					jQuery('.rst-header-menu-bar').height() + 'px');
		}

		function menu() {
			$('.rst-menu-trigger').on(
					'click',
					function() {
						$('.rst-header-menu ul').stop(false, false)
								.slideToggle('fast');
						return false;
					});
		}

		// Just for sticky menu
		var letsticky = 0;

		function header_sticky() {
			if (jQuery(window).scrollTop() > /* jQuery('#rst-header').height() */199
					&& letsticky == 1) {
				jQuery('.rst-header-menu-bar').addClass("rst-sticky");
			} else {
				jQuery('.rst-header-menu-bar').removeClass("rst-sticky");
			}
		}

		jQuery(document)
				.ready(
						function(jQuery) {
							if (navigator.geolocation) {
								navigator.geolocation.getCurrentPosition(
												function(position) {
													var pos = {
														lat : position.coords.latitude,
														lng : position.coords.longitude
													};
													//alert("lat:"+pos.lat+" lng:"+pos.lng);
								var latLng = pos.lat+","+pos.lng;					
								var urlStr = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latLng+"&key=AIzaSyDCy_slvkSukNvzDb_4g16Oew5NTY6ejOk";
								//alert(urlStr);
								jQuery.get(urlStr,
									function(response) {
										for(var i in response.results){
											var types = response.results[i].types;
											if(types.indexOf("locality") > -1){
												$('#main_loc').val(response.results[i].formatted_address);
												$('#main_search_hidden').val(latLng);
											}
										}
										
									});
								});
							}
							jQuery('#rst-support-online header > a').on(
									'click',
									function(e) {
										e.preventDefault();
										jQuery('#rst-support-online').css(
												'display', 'none');
									});

							// Validation
							jQuery('.rst-login form').validate();
							jQuery('.rst-signin form').validate();
							jQuery('.comment-form').validate();
							jQuery('.rst-account-settings form').validate();
							jQuery('.rst-contact-form form').validate();

							// Owl carosel
							var postowl = jQuery('.rst-single-slider');
							postowl
									.owlCarousel({
										loop : true,
										autoplay : true,
										items : 1,
										singleItem : true,
										transitionStyle : "fadeUp",
										afterAction : function(elem) {
											var current = this.currentItem;
											jQuery(
													'.rst-single-post-slider > p span:first-child')
													.html(current + 1);
										}
									});
							jQuery(
									'.rst-single-post-slider > p span:last-child')
									.html(
											jQuery(
													'.rst-single-slider .owl-item')
													.size());

							jQuery(".rst-whatwehave-owl")
									.owlCarousel(
											{
												items : 1,
												singleItem : true,
												navigation : true,
												transitionStyle : "backSlide",
												navigationText : [
														'<i class="fa fa-arrow-left"></i>',
														'<i class="fa fa-arrow-right"></i>' ],
												pagination : true,
											});

							jQuery(".rst-whatpeople-owl")
									.owlCarousel(
											{
												items : 1,
												singleItem : true,
												navigation : true,
												navigationText : [
														'<i class="fa fa-angle-left"></i>',
														'<i class="fa fa-angle-right"></i>' ],
												pagination : false,
											});
							jQuery(".rst-whatclient-owl")
									.owlCarousel(
											{
												items : 1,
												singleItem : true,
												navigation : true,
												navigationText : [
														'<i class="fa fa-angle-left"></i>',
														'<i class="fa fa-angle-right"></i>' ],
												pagination : false,
											});
							jQuery(".rst-areaoflaw-owl")
									.owlCarousel(
											{
												items : 1,
												singleItem : true,
												navigation : true,
												navigationText : [
														'<i class="fa fa-angle-left"></i>',
														'<i class="fa fa-angle-right"></i>' ],
												pagination : false,
											});

							// Counter up
							jQuery('.counter').counterUp();

							// Scroll Down
							jQuery('.rst-scroll-down a')
									.on(
											'click',
											function(e) {
												var offsettop = jQuery(this)
														.parents('.wpb_row')
														.next().offset().top;
												e.preventDefault();
												jQuery('html, body').animate({
													scrollTop : offsettop,
												}, 'slow');
											});

							/* fancybox */
							jQuery('.fancybox-media').fancybox({
								type : 'iframe',
							});
							jQuery('.fancybox').fancybox({});

							/* change images the team group */
							jQuery('.rst-theteam-select .nav-tabs li a')
									.on(
											'click',
											function() {
												var dataimg = jQuery(this)
														.attr('data-img');
												for (var i = 1; i <= jQuery(
														'.rst-theteam-img')
														.size(); i++) {
													var dataimg2 = jQuery(
															'.rst-theteam-img')
															.eq(i - 1).attr(
																	'data-img');
													if (dataimg === dataimg2) {
														jQuery(
																'.rst-theteam-img')
																.removeClass(
																		'active');
														jQuery(
																'.rst-theteam-img')
																.eq(i - 1)
																.addClass(
																		'active');
													}
												}
											});

							// Custom selectbox
							jQuery('#package').ddslick();
							jQuery('.rst-contact-form select').ddslick();
							jQuery('.rst-search-form select').ddslick();
							jQuery("#country").countrySelect();

							// MenuMobie
							$('.rst-menu-trigger').on(
									'click',
									function() {
										$(this).toggleClass('exit').parent()
												.find('.rst-main-menu ul')
												.slideToggle(700);
									});

							// Close form login
							jQuery('.rst-form-close').on('click', function(e) {
								e.preventDefault();
								jQuery('.rst-login form').slideUp('fast')
							});

							/* End window ready */
						});

		jQuery(window).scroll(function() {
			header_sticky();
		});

		jQuery(window).load(function() {

			// Sticky header -.-
			if (jQuery(window).width() > 768) {
				letsticky = 1;
			}
			header_sticky();

			// Loading screen off
			jQuery('#loader-wrapper').animate({
				opacity : 0,
			}, 1000, 'swing', function() {
				jQuery('#loader-wrapper').css('display', 'none');
			});

			// Menu mobile click
			menu();

			// Set height menubar
			menubar_height();

			// Custom scroll bar in livechat
			if (jQuery('.rst-chat-content').length > 0) {
				jQuery('.rst-chat-content').mCustomScrollbar({});
			}

			/* Hoverdir */
			jQuery(' .rst-box-image ').each(function() {
				jQuery(this).hoverdir();
			});

		});

		jQuery(window).resize(function() {
			menubar_height();

			/* Turn off sticky header */
			if (jQuery(window).width() < 769) {
				letsticky = 0;
				jQuery('.rst-header-menu-bar').removeClass('rst-sticky');
			} else {
				letsticky = 1;
				header_sticky();
			}
		});



	}());

}
main();
