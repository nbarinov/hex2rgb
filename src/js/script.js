'use strict';

var hex = document.getElementById('hex'),
    rgb = document.getElementById('rgb');

hex.addEventListener('input', function(e) {
  var hexString = e.target.value;
  
  if(hexString.indexOf('#') === -1) {
    hexString = '#' + hexString;
  }
  
  var object = new HEX2RGB(hexString);
  var result = object.hexToRgb();

  rgb.value = result ? "rgb(" + result.r + ", " + result.g + ", " + result.b + ")" : rgb.value;
});

rgb.addEventListener('input', function(e) {
  var rgbString = e.target.value.trim();

  if(rgbString.indexOf("rgb(") !== -1 && rgbString.charAt(rgbString.length - 1) === ')') {
    rgbString = rgbString.substring(4, rgbString.length - 1);
    
    var object = new HEX2RGB(rgbString);
    var result = object.rgbToHex();

    hex.value = result ? result : hex.value;
  }
});