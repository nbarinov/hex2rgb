function HEX2RGB(color) {
  this.hexToRgb = hexToRgb;
  this.componentToHex = componentToHex;
  this.rgbToHex = rgbToHex;

  if(color.indexOf('#') !== -1) {
    this.color = color.trim().toLowerCase();

    return true;
  }

  var array = color.split(',');

  if(array.length === 3) {
    this.color = {
      r: Number(array[0]) ? Number(array[0]) : 0,
      g: Number(array[1]) ? Number(array[1]) : 0,
      b: Number(array[2]) ? Number(array[2]) : 0,
    };
    
    return true;
  }

  return false;
}

function hexToRgb() {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color);
  
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function componentToHex(code) {
  var hex = code.toString(16);

  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex() {
  return typeof this.color === "object" 
        ? "#" + this.componentToHex(this.color.r) + this.componentToHex(this.color.g) + this.componentToHex(this.color.b) 
        : null;
}