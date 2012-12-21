	
	var autoanchor = {};
	var menu_element = '.main-navigation';
 	
	window.autoanchor = autoanchor;
	autoanchor.anc = [];
	autoanchor.cur = ''; 

jQuery(window).scroll(function (event) {
  if (autoanchor.anc.length == 0) return;
  
  var scrollY = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
  //alert(scrollY);
  var d = 0;
  
  autoanchor.d = autoanchor.anc[0].offsetTop-scrollY;
  autoanchor.e = 0;
  //alert(autoanchor.d);
  for (anc in autoanchor.anc) {
    d = autoanchor.anc[anc].offsetTop-scrollY;
    if ((d <= 0) && (autoanchor.d < d)) {
      autoanchor.d = d;
      autoanchor.e = anc;
    };
  };
  
  if (autoanchor.cur != autoanchor.anc[autoanchor.e].name) {
    autoanchor.cur = autoanchor.anc[autoanchor.e].name;
   // location.hash = '#'+autoanchor.cur;
   //alert(window.history.pushState);
     /*    if (typeof history.pushState != 'undefined') { 
			history.pushState(null, null, autoanchor.cur); 
		}   */
		changeHash(autoanchor.cur)
	//document.location.hash = '#'+autoanchor.cur;
		event.preventDefault();

		var current_item = jQuery('#'+autoanchor.cur);
		var index = jQuery(".100-height").index(current_item);
		
	//	alert(index);
		
		jQuery(menu_element + " li").removeClass("active");
	//	jQuery(menu_element + " li a").removeClass("active");			
		jQuery(menu_element + " li:eq(" + index + ")").addClass("active");
	//	jQuery(menu_element + " li:eq(" + index + ") a").addClass("active");			
  		//var target_offset = jQuery(location.hash).offset();
		//var target_top = target_offset.top;
  } 
});
	
	
	
$(document).ready(function() {

	 $("a[name]").addanchors();
	 var winHeight = $(window).height();
	 var minHeight = Math.ceil(0.9*winHeight);
	 var padTop = winHeight-minHeight;
	 $(".100-height").css({"min-height": minHeight, 'padding-top': padTop});
	 
	$('.accordeon-item').on('click', function(){
		if($(this).hasClass('show')){
			$(this).removeClass('show');
			$(this).find('.hidden-content').slideUp();
		}else{
			$(this).addClass('show');
			$(this).find('.hidden-content').slideDown();
		}
	});
	
	$('.portfolio-thumbs-item').hover(
		function(){
			$(this).find('.portfolio-thumbs-item-site').animate({'bottom':'0'}, 300);
		},
		function(){
			$(this).find('.portfolio-thumbs-item-site').animate({'bottom':'-30px'}, 300);
		}
	);
});

jQuery.fn.addanchors = function() {
  return this.each(function(){
    autoanchor.anc.push(this);
  });
};

function changeHash(id) {
	try {
		history.replaceState(null,null,'#'+ id);
	}
	catch(e) {
		location.hash = '#'+id;
	}
	return false;
}
