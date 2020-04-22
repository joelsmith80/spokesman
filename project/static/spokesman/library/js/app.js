var jpsJournoList = (function(){

    
    // placeholder for cached DOM elements
    var DOM = {};

    
    // variables we'll use later
    let navWidth = 0;
    let windowWidth = 0;
    let carouselPaused = false;
    let carouselStopped = false;

    
    // get all the elements and node lists we'll use later
    function cacheDom(){
        DOM.body = document.body;    
        DOM.journoList = document.getElementById('journo-list');
        DOM.journoListItems = document.querySelectorAll('#journo-list li');
        DOM.firstJournoListItem = document.querySelector('#journo-list li');
        DOM.jsHide = document.querySelectorAll('.js-hide');
        DOM.carouselButton = document.getElementById('carousel-button');
        cacheMenuItems();
    }

    
    // add event listeners
    function bindEvents(){ 
        
        // bc menu items are so dynamic here, handle those separately
        bindMenuItems();

        // toggle switch for stopping/starting the carousel
        DOM.carouselButton.addEventListener('click',handleButtonClick);
        
        // only clone carousel items once entire page load is finished
        window.addEventListener("load", function(){
            updateValues();
            if( windowWidth > navWidth ){
                let factor = windowWidth / navWidth;
                cloneMenuItems(factor);
            }
        });
    }

    
    function setUp(){

        // add special class to activate the js-enhanced layout
        DOM.body.classList.add('js-enabled');

        // set off the first journo-list item
        DOM.firstJournoListItem.classList.add('active');
        
        // repurpose the text nav into carousel form
        addImgsToNav();
        
        // accessibly hide the 'Our Journalists' headline 
        // now that we're presenting list as carousel
        DOM.jsHide.forEach(function(item){
            item.classList.add('vh');
        });

        startCarousel();
    }

    
    // get window and carousel width values to determine
    // whether we need to fill blank space with carousel images
    function updateValues(){
        navWidth = DOM.navMenu.clientWidth;
        windowWidth = window.outerWidth;
    }


    // use nav data attributes to turn text list 
    // into thumbnail carousel
    function addImgsToNav(){
        for( let i = 0; i < DOM.navMenuItems.length; i++ ){
            let link = DOM.navMenuItems[i].firstChild;
            let src = link.dataset.thumbSrc;
            let img = "<img src='" + src + "' alt='" + link.text + "'>";
            link.innerHTML = img;
        }
    }


    // cache menu-specific items (best split out as own function
    // so we can call it throughout the cycle)
    function cacheMenuItems(){
        DOM.nav = document.getElementById('journo-list-nav');
        DOM.navMenu = document.getElementById('journo-list-menu');
        DOM.navMenuItems = document.querySelectorAll('#journo-list-menu li');
        DOM.navMenuLinks = document.querySelectorAll('#journo-list-menu a');
    }


    // add menu-specific event listeners separately, as we'll
    // need to do once on page load and again after adding carousel images
    function bindMenuItems(){
        DOM.navMenuLinks.forEach(item => {
            item.addEventListener('click',handleNavClick);
        });
        DOM.navMenuLinks.forEach(function(item){
            item.addEventListener('mouseover',pauseCarousel);
            item.addEventListener('mouseout',resumeCarousel);
        });
    }

    
    // handle the navigation and selection of the carousel list
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

    
    // fade the selected journalist in
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

    
    // add extra items to the carousel, to give it the 
    // feeling of infinite-ness
    function cloneMenuItems( num_times ){
        num_times = Math.floor(num_times);
        for( i = 0; i <= num_times; i++ ){
            DOM.navMenuItems.forEach(function(item){
                let clone = item.cloneNode(true);
                DOM.navMenu.appendChild(clone);
            });
        }
        DOM.navMenu.style.width = '10000px';
        cacheMenuItems(); // re-cache now that there are new items
        bindMenuItems(); // re-bind now that there are new items
    }


    // pause/un-pause the carousel movement
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
        carouselStopped = false;
        setInterval( rollCarousel, 75 );
    }

    
    function stopCarousel(){
        carouselStopped = true;
    }

    
    // resumes motion but without resetting setInterval
    function unStopCarousel(){
        carouselStopped = false;
    }

    
    function pauseCarousel(){
        carouselPaused = true;
    }
    
    
    function resumeCarousel(){
        carouselPaused = false;
    }


    // the actual movement of the carousel
    function rollCarousel(){
        if(!carouselPaused && !carouselStopped){
            let carousel = DOM.navMenu;
            let left = carousel.offsetLeft; // get the distance to the edge
            let next = left - 1; // get the next distance to the edge (assuming -1 increments)
            let absLeft = Math.abs(left); // convert negative integer to positive
            if( absLeft === navWidth ){
                carousel.style.left = 0; // snap back to 0 if we've reached the end
            } else {
                carousel.style.left = next + 'px'; // else increment down a pixel
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


// only fire everything once the DOM is ready
document.addEventListener("DOMContentLoaded", function(){
    jpsJournoList.init();    
});