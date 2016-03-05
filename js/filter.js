var filter = (function(){
  function liveFilter(searchId, parentNode){
    var search = document.getElementById(searchId),
        parent = document.getElementsByClassName(parentNode),
        hoverClass;

    function noDisplay (el) {
      setTimeout(function(){el.style.display="none";}, 0);
    }
    function yesDisplay (el) {
      setTimeout(function(){el.style.transition="opacity .5s";
      el.style.opacity="1";}, 0);
    }
    var handler = function searchFieldChanged() {
      var text = search.value,
          regexp = RegExp(text, 'i'),
          nodes = parent,
          node;
      for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        hoverClass = node.getElementsByTagName("div");
        if(node.textContent.search(regexp) < 0) {
          node.style.transition="opacity .5s";
          node.style.opacity=".05";
        } else {
          node.style.display="block";
          yesDisplay(node);
        }
      }
    };

    search.addEventListener('input', handler, false);
  }
  return liveFilter;
})();

filter('filter-search', 'photo');
