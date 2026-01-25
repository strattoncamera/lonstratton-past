// Declare the variable outside the $(document).ready block	
var scrollPosition; 

// Function to save scroll position
function saveScrollPosition() {
    scrollPosition = $(window).scrollTop();
}

// The Modal for Iframe
function openiframeModal(iframeSrc) {
    saveScrollPosition(); // Save scroll position before opening the modal
    $('body').css('overflow', 'hidden'); // Prevent scrolling on the body
    document.getElementById('iframeModal').style.display = 'block';
    document.getElementById('modaliframe').src = iframeSrc;

    // Close the modal when clicking on the iframe
    document.getElementById('modaliframe').onclick = function() {
        closeiframeModal();
    };

    // Close the modal on 'Escape' key press
    document.addEventListener('keydown', closeiframeModalOnEscape);
}

function closeiframeModalOnEscape(event) {
    if (event.key === 'Escape') {
        closeiframeModal();
    }
}

function closeiframeModal() {
    // Stop video playback before closing the modal
    var iframe = document.getElementById('modaliframe');
    iframe.src = '';
    document.getElementById('iframeModal').style.display = 'none';
    $('body').css('overflow', 'auto'); // Allow scrolling on the body
    document.removeEventListener('keydown', closeiframeModalOnEscape); // Remove the event listener
}

$(document).ready(function () {


    // Smooth scrolling - css-tricks.com
    function filterPath(string) {
        return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
    }

    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');
    $('a[href*="#navtop"]').each(function () {
        var thisPath = filterPath(this.pathname) || locationPath;
        if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
            var $target = $(this.hash),
                target = this.hash;
            if (target) {
                var targetOffset = $target.offset().top;
                $(scrollElem).animate({
                    scrollTop: targetOffset
                }, 'slow', function () {
                    location.hash = target;
                });
            }
        }
    });

    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i < argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop() > 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop() > 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
    }


   // TABS — only run if tabs exist
if ($('.tabs').length && $('.tab_content').length) {

  var tabContents = $(".tab_content").hide(),
      tabs = $("ul.tabs li");

  tabs.first().addClass("active").show();
  tabContents.first().show();

  tabs.click(function () {
    var $this = $(this),
        activeTab = $this.find('a').attr('href');

    if (!$this.hasClass('active')) {
      $this.addClass('active').siblings().removeClass('active');
      tabContents.hide().filter(activeTab).fadeIn();
    }
    return false;
  });

}

    // Find the image inside the same <a> (works with <picture> or plain <img>)
function getAnchorImage($el) {
  return $el.closest('a').find('img').first();
}

function applyHoverEffect(className) {
  $(className).css({ opacity: 0 });

  $(className).hover(
    function () { // IN
      const $img = getAnchorImage($(this));
      $(this).stop().animate({ opacity: 1 }, 'slow'); // play.png
      $img.stop().animate({ opacity: 0.6 }, 'fast');    // image under it
    },
    function () { // OUT
      const $img = getAnchorImage($(this));
      $(this).stop().animate({ opacity: 0 }, 'fast');   // play.png
      $img.stop().animate({ opacity: 1 }, 'fast');      // image back to 1
    }
  );
}

applyHoverEffect('.zoom');
applyHoverEffect('.play');

});
// END
