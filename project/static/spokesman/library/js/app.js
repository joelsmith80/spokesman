var jpsJournoList = (function(){

    // placeholder for cached DOM elements
    var DOM = {};

    let navWidth = 0;
    let windowWidth = 0;

    function cacheDom(){
        DOM.body = document.body;
        DOM.nav = document.getElementById('journo-list-nav');
        DOM.navMenu = document.getElementById('journo-list-menu');
        DOM.navMenuItems = document.querySelectorAll('#journo-list-menu li');
        DOM.navMenuLinks = document.querySelectorAll('#journo-list-menu a');
        DOM.navMenuItemLast = DOM.navMenuItems[DOM.navMenuItems.length - 1];
        DOM.journoList = document.getElementById('journo-list');
        DOM.journoListItems = document.querySelectorAll('#journo-list li');
        DOM.firstJournoListItem = document.querySelector('#journo-list li');
        DOM.jsHide = document.querySelectorAll('.js-hide');
    }

    function bindEvents(){
        DOM.navMenuLinks.forEach(item => {
            item.addEventListener('click',handleNavClick);
        });
    }

    function setUp(){
        DOM.firstJournoListItem.classList.add('active');
        DOM.body.classList.add('js-enabled');
        addImgsToNav();
        // setContainerMinHeight();
        DOM.jsHide.forEach(function(item){
            item.classList.add('vh');
        });
        window.addEventListener("load", function(){
            updateValues();
            if( windowWidth > navWidth ){
                let factor = windowWidth / navWidth;
                cloneMenuItems(factor);
            }
        });

        startCarousel2();

    }

    function updateValues(){
        navWidth = DOM.navMenu.clientWidth;
        console.log(navWidth);
        windowWidth = window.outerWidth;
    }

    function addImgsToNav(){
        for( let i = 0; i < DOM.navMenuItems.length; i++ ){
            let link = DOM.navMenuItems[i].firstChild;
            let src = link.dataset.thumbSrc;
            let img = "<img src='" + src + "' alt='" + link.text + "'>";
            link.innerHTML = img;
        }
    }

    function handleNavClick(e){
        e.preventDefault();
        DOM.journoListItems.forEach(function(item){
            item.style.display = 'none';
            item.classList.remove('active');
        });
        let targetHref = this.getAttribute('href');
        let target = document.getElementById(targetHref.slice(1));
        fade('in',850,target);
        target.classList.add('active');
    }

    function fade(type, ms, el) {
        
        // set up initial variables
        let isIn = type === 'in',
            opacity = isIn ? 0 : 1,
            interval = 50,
            duration = ms,
            gap = interval / duration;
      
        if(isIn) {
            el.style.display = 'block';
            el.style.opacity = opacity;
        }
      
        function func() {
            opacity = isIn ? opacity + gap : opacity - gap;
            el.style.opacity = opacity;
      
            if(opacity <= 0) el.style.display = 'none'
            if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
        }
      
        var fading = window.setInterval(func, interval);
      
    }

    function setContainerMinHeight(){
        let height = 0;
        let i = 0;
        DOM.journoListItems.forEach(function(item){
            item.style.display = 'block';
            let isActive = item.classList.contains('active');
            let thisHeight = item.offsetHeight;
            height = thisHeight > height ? thisHeight : height;
            if(!isActive){
                item.style.display = 'none';
            }
        });
        DOM.journoList.style.height = height + 'px';
    }

    function cloneMenuItems( num_times ){
        num_times = Math.floor(num_times);
        for( i = 0; i <= num_times; i++ ){
            DOM.navMenuItems.forEach(function(item){
                let clone = item.cloneNode(true);
                DOM.navMenu.appendChild(clone);
            });
        }
        DOM.navMenu.style.width = '10000px';
    }

    function startCarousel(){

        let carousel = DOM.navMenu;
        // carousel.style.left = "0px";
        // console.log(carousel.style.left);
        // console.log(carousel);
        // carouselMotion();
        /*console.log(carousel.offsetLeft);

        carousel.scrollBy(0,1);
        scrolldelay = setTimeout(pageScroll,10);*/

        (function roll() {
            let left = carousel.offsetLeft;
            let next = left - 1;
            carousel.style.left = next + 'px';
            requestAnimationFrame(roll);
            // console.log(left);
            /*if ((carousel.offsetLeft -= 1) < 0) {
              console.log("Here we go");
            } else {
              requestAnimationFrame(roll);
            }*/
        })();
    }

    function startCarousel2(){
        // preferred speed: 75
        // setInterval( rollCarousel2, 75 );
    }

    function rollCarousel2(){
        let carousel = DOM.navMenu;
        let left = carousel.offsetLeft;
        let next = left - 1;
        let absLeft = Math.abs(left);
        if( absLeft === navWidth ){
            carousel.style.left = 0;
        } else {
            carousel.style.left = next + 'px';
        }
        
    }
    
    // main init method
    function init(){
        cacheDom();
        bindEvents();
        setUp();
    }

    /* ===== export public methods ===== */
  
    return {
        init: init
    };

}());

document.addEventListener("DOMContentLoaded", function(){
    jpsJournoList.init();    
});