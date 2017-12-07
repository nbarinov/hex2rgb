'use strict';

var hex = document.getElementById('hex'),
    rgb = document.getElementById('rgb'),
    header = document.querySelector('.header'),
    fields = document.querySelectorAll('.form__field'),
    footer = document.querySelector('.footer');

function setBodyBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function getContrstYIQ(rgb) {
  var yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;

  return yiq >= 128 ? 'black' : 'white';
}

function addFocusClass(element) {
  element.parentNode.classList.add('form__field--focus');
}

function removeFocusClass(element) {
  element.parentNode.classList.remove('form__field--focus');
}

function toggleColor(color) {
  if (color === "white") {
    if (header.classList.contains('header--black')) {
      header.classList.remove('header--black');
      footer.classList.remove('footer--black');
    }

    header.classList.add('header--white');
    footer.classList.add('footer--white');
  }

  if (color === "black") {
    if (header.classList.contains('header--white')) {
      header.classList.remove('header--white');
      footer.classList.remove('footer--white');
    }

    header.classList.add('header--black');
    footer.classList.add('footer--black');
  }
}

hex.addEventListener('focus', function(e) { addFocusClass(e.target); });
hex.addEventListener('blur', function (e) { removeFocusClass(e.target); });
rgb.addEventListener('focus', function (e) { addFocusClass(e.target); });
rgb.addEventListener('blur', function (e) { removeFocusClass(e.target); });

hex.addEventListener('input', function(e) {
  var hexString = e.target.value;
  
  if(hexString.indexOf('#') === -1) {
    hexString = '#' + hexString;
  }
  
  var object = new HEX2RGB(hexString);
  var result = object.hexToRgb();

  if (result) {
    rgb.value = "rgb(" + result.r + ", " + result.g + ", " + result.b + ")";
    setBodyBackgroundColor(hexString);
    var color = getContrstYIQ(result);

    fields.forEach(function(field) {
      if(color === "white") {
        if (field.classList.contains('form__field--black')) {
          field.classList.remove('form__field--black');
        }

        field.classList.add('form__field--white');
      }

      if(color === "black") {
        if(field.classList.contains('form__field--white')) {
          field.classList.remove('form__field--white');
        }

        field.classList.add('form__field--black');
      }
    });

    toggleColor(color);
  }
});

rgb.addEventListener('input', function(e) {
  var rgbString = e.target.value.trim();

  if(rgbString.indexOf("rgb(") !== -1 && rgbString.charAt(rgbString.length - 1) === ')') {
    rgbString = rgbString.substring(4, rgbString.length - 1);
    
    var object = new HEX2RGB(rgbString);
    var result = object.rgbToHex();

    if(result) {
      hex.value = result;
      setBodyBackgroundColor(result);

      var color = getContrstYIQ(object.color);

      fields.forEach(function(field) {
        if(color === "white") {
          if(field.classList.contains('form__field--black')) {
            field.classList.remove('form__field--black');
          }

          field.classList.add('form__field--white');
        }

        if(color === "black") {
          if(field.classList.contains('form__field--white')) {
            field.classList.remove('form__field--white');
          }

          field.classList.add('form__field--black');
        }
      });

      toggleColor(color);
    }
  }
});