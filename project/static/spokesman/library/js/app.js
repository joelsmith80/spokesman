var jpsJournoList = (function(){

    // placeholder for cached DOM elements
    var DOM = {};

    function cacheDom(){
        DOM.body = document.body;
        DOM.navMenu = document.getElementById('journo-list-menu');
        DOM.navMenuItems = document.querySelectorAll('#journo-list-menu li');
        DOM.navMenuLinks = document.querySelectorAll('#journo-list-menu a');
        DOM.journoList = document.getElementById('#journo-list');
        DOM.journoListItems = document.querySelectorAll('#journo-list li');
    }

    function bindEvents(){
        DOM.navMenuLinks.forEach(item => {
            item.addEventListener('click',handleNavClick);
        });
    }

    function setUp(){
        DOM.body.classList.add('js-enabled');
        addImgsToNav();
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
        });
        let targetHref = this.getAttribute('href');
        let target = document.getElementById(targetHref.slice(1));
        target.style.display = 'block';
        console.log(target);
        
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