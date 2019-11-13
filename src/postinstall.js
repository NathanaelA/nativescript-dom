
// Get the defaults
const plugin_name = process.env.npm_package_name || 'Unknown';

function highlight(value, color) {
  if (color == null) { color = "33"; }
  return "\u001B["+color+"m"+value+"\u001B[37m";
}

console.log(' ' + highlight(plugin_name) + '\x1b[31m is DEPRICATED and is not actively maintained anymore!','\x1b[36m');
console.log('\x1b[31m This plugin has NOT been tested for NS 6.x and higher');
console.log('\x1b[36m For more information see ' + highlight('https://proplugins.org/upgrade'));