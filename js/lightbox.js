var overlay = document.getElementById('overlay'),
    photo = document.getElementsByClassName('photo'),
    close = document.getElementById('close'),
    image = document.getElementsByClassName('image'),
    left = document.getElementById('left'),
    right = document.getElementById('right'),
    leftFunction = function(){
      for(var i = 0; i < image.length; i++) {
        if(image[i].classList && image[i].classList.contains('current')) {
          image[i].classList.remove('current');
          image[i].previousElementSibling.classList.add('current');
          document.getElementById('text').innerHTML = image[i].previousElementSibling.alt || image[i].previousElementSibling.name;
          if(i === 0) {
            i = image.length -1;
            image[i].classList.add('current');
            document.getElementById('text').innerHTML = image[i].alt || image[i].name;
          }
          break;
        }
      }
    },
    rightFunction = function(){
      for(var i = 0; i < image.length; i++) {
        if(image[i].classList && image[i].classList.contains('current')) {
          image[i].classList.remove('current');
          image[i].nextElementSibling.classList.add('current');
          document.getElementById('text').innerHTML = image[i].nextElementSibling.alt || image[i].nextElementSibling.name;
          if(i === image.length -1) {
            i = 0;
            image[i].classList.add('current');
            document.getElementById('text').innerHTML = image[i].alt;
          }
            break;
        }
      }
    };

overlay.style.display = 'none';

function fullOpac (el) {
  setTimeout(function(){el.style.transition="opacity .5s";
  el.style.opacity="1";}, 20);
}

function gone (el) {
  setTimeout(function(){el.style.display = 'none';}, 200);
}

var methods = {
  overlayInit: function(){
    if (overlay.style.display === 'none') {
      overlay.style.display = 'flex';
      overlay.style.opacity = '0';
      fullOpac(overlay);
      document.getElementById('text').innerHTML = this.children[1].alt;
    }
    if (overlay.style.display === 'flex') {
      close.addEventListener('click', function () {
        overlay.style.opacity = "0";
        gone(overlay);

      });
    }
  },
  addClass: function(){
    for(var i = 0; i < image.length; i++) {
      if (this.children[1].alt === image[i].alt || this.children[1].alt === image[i].name) {
        image[i].classList.add('current');
      } else {
        image[i].setAttribute("class", "image");
      }
    }
  },
  nextImage: rightFunction,
  lastImage: leftFunction,
  keyRight: function(e){
    // e.preventDefault();
    key = e.keyCode;
    if( key === 39) {
      rightFunction();
    }
  },
  keyLeft: function(e) {
    key = e.keyCode;
    if( key === 37) {
      leftFunction();
    }
  }
};

for(var i = 0; i < photo.length; i++) {
  photo[i].addEventListener('click', methods.overlayInit, false);
  photo[i].addEventListener('click', methods.addClass, false);
}

right.addEventListener('click', methods.nextImage, false);
left.addEventListener('click', methods.lastImage, false);

window.addEventListener("keydown", methods.keyRight, false);
window.addEventListener("keydown", methods.keyLeft, false);


console.log(document.getElementById('photos').children);
console.log(image);
