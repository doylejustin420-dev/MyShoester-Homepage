
/*! MyShoester: Catalog anchor -> price page router */
(function(){
  var map = {
    "#repair": "preise-reparatur.html",
    "#bequem": "preise-bequemseinlagen.html",
    "#komfort": "preise-komforteinlagen.html",
    "#alltag": "preise-alltagseinlagen.html",
    "#belts": "preise-massguertel.html",
    "#laser": "preise-lasergravur.html",
    "#cutting": "preise-laserzuschnitte.html",
    "#streetwear": "preise-streetwear.html",
    "#sand": "preise-sandstrahlung.html"
  };

  function closest(el, sel){
    while(el){ if(el.matches && el.matches(sel)) return el; el = el.parentElement; }
    return null;
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href]') : closest(e.target, 'a[href]');
    if(!a) return;
    var href = a.getAttribute('href');
    if(!href) return;
    if(map[href]){
      e.preventDefault();
      window.location.href = map[href];
    }
  }, true);
})();
