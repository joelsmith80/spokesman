var jpsJournoList = (function(){

    // placeholder for cached DOM elements
    var DOM = {};

    let navWidth = 0;
    let windowWidth = 0;
    let carouselPaused = false;
    let carouselStopped = false;

    function cacheDom(){
        DOM.body = document.body;    
        DOM.journoList = document.getElementById('journo-list');
        DOM.journoListItems = document.querySelectorAll('#journo-list li');
        DOM.firstJournoListItem = document.querySelector('#journo-list li');
        DOM.jsHide = document.querySelectorAll('.js-hide');
        DOM.carouselButton = document.getElementById('carousel-button');
        cacheMenuItems();
    }

    function bindEvents(){ 
        bindMenuItems();
        window.addEventListener("load", function(){
            updateValues();
            if( windowWidth > navWidth ){
                let factor = windowWidth / navWidth;
                cloneMenuItems(factor);
            }
        });
        DOM.carouselButton.addEventListener('click',handleButtonClick);
    }

    function setUp(){
        DOM.firstJournoListItem.classList.add('active');
        DOM.body.classList.add('js-enabled');
        addImgsToNav();
        DOM.jsHide.forEach(function(item){
            item.classList.add('vh');
        });
        startCarousel();
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

    function cacheMenuItems(){
        DOM.nav = document.getElementById('journo-list-nav');
        DOM.navMenu = document.getElementById('journo-list-menu');
        DOM.navMenuItems = document.querySelectorAll('#journo-list-menu li');
        DOM.navMenuLinks = document.querySelectorAll('#journo-list-menu a');
    }

    function bindMenuItems(){
        DOM.navMenuLinks.forEach(item => {
            item.addEventListener('click',handleNavClick);
        });
        DOM.navMenuLinks.forEach(function(item){
            item.addEventListener('mouseover',pauseCarousel);
            item.addEventListener('mouseout',resumeCarousel);
        });
    }

    function handleNavClick(e){
        e.preventDefault();
        DOM.navMenuLinks.forEach(function(item){
            item.classList.remove('active');
        });
        this.classList.add('active');
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

    function cloneMenuItems( num_times ){
        num_times = Math.floor(num_times);
        for( i = 0; i <= num_times; i++ ){
            DOM.navMenuItems.forEach(function(item){
                let clone = item.cloneNode(true);
                DOM.navMenu.appendChild(clone);
            });
        }
        DOM.navMenu.style.width = '10000px';
        cacheMenuItems();
        bindMenuItems();
    }

    function handleButtonClick(e){
        e.preventDefault();
        let action = this.dataset.action;
        if(action === 'stop'){
            stopCarousel();
            this.dataset.action = 'start';
            this.innerHTML = this.dataset.startText;
        } else {
            unStopCarousel();
            this.dataset.action = 'stop';
            this.innerHTML = this.dataset.stopText;
        }
    }

    function startCarousel(){
        // preferred speed: 75
        carouselStopped = false;
        setInterval( rollCarousel2, 75 );
    }

    function pauseCarousel(){
        carouselPaused = true;
    }

    function stopCarousel(){
        carouselStopped = true;
    }

    function unStopCarousel(){
        carouselStopped = false;
    }

    function resumeCarousel(){
        console.log("Resuming episode...");
        carouselPaused = false;
    }

    function rollCarousel2(){
        if(!carouselPaused && !carouselStopped){
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