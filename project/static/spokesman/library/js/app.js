var jpsJournoList = (function(){

    // placeholder for cached DOM elements
    var DOM = {};

    function cacheDom(){
        DOM.body = document.body;
        DOM.navMenu = document.getElementById('journo-list-menu');
        DOM.navMenuItems = document.querySelectorAll('#journo-list-menu li');
        DOM.navMenuLinks = document.querySelectorAll('#journo-list-menu a');
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
        console.log("HEIGHT");
        console.log(height);
        DOM.journoList.style.height = height + 'px';
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