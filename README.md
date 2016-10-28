[![npm](https://img.shields.io/npm/v/nativescript-dom.svg)](https://www.npmjs.com/package/nativescript-dom)
[![npm](https://img.shields.io/npm/l/nativescript-dom.svg)](https://www.npmjs.com/package/nativescript-dom)
[![npm](https://img.shields.io/npm/dt/nativescript-dom.svg?label=npm%20d%2fls)](https://www.npmjs.com/package/nativescript-dom)

# NativeScript-DOM
A class of DOM based NativeScript functions

## License

This is released under the MIT License, meaning you are free to include this in any type of program -- However for entities that need a support contract, changes, enhancements and/or a commercial license please contact me at [http://nativescript.tools](http://nativescript.tools).

I also do contract work; so if you have a module you want built for NativeScript (or any other software projects) feel free to contact me [nathan@master-technology.com](mailto://nathan@master-technology.com).

[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg?style=plastic)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=HN8DDMWVGBNQL&lc=US&item_name=Nathanael%20Anderson&item_number=nativescript%2ddom&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3ax%3aNonHosted)
[![Patreon](https://img.shields.io/badge/Pledge-Patreon-brightgreen.svg?style=plastic)](https://www.patreon.com/NathanaelA)

## Updates

Please feel free to fork this repo and update the functions or add additional DOM based functions!!!


## Installation 

tns plugin add nativescript-dom  


## Usage

To use the  module you just `require()` it:

```js
require( "nativescript-dom" );
```

Notice: You do NOT need to keep a reference to it; and you only need to load it once.  
It will automatically attach its methods to all the proper classes in the NativeScript library making it act as if they are built in.

 
### Methods

#### getElementById(id)
#### getElementsByClassName(className)
#### getElementsByTagName(tagName)
These are globally available!  Like there Web DOM counterparts; they return elements based on the critera.
```js
  var element = getElementById('someId');
```

#### view.getElementById(id)
#### view.getElementsByClassName(className)
#### view.getElementsByTagName(tagName)
Like there Web DOM counterparts; returns the children elements based on the critera.
```js
exports.pageLoaded = function(args) {
  var page = args.object;
  var stackLayout = page.getElementsByTagName('StackLayout')[0];
  var button = stackLayout.getElementsByClassName('clickButton')[0];
  button.classList.toggle('hidden');
}
```


### view.runAgainstId(id, function(elem) { /* Do something with elem */ })
### view.runAgainstClasses(className, function(elem) { /* Do something with elem */ })
### view.runAgainstTagNames(tag, function(elem) { /* Do something with elem */ })
This will automatically run your function passing it the elem that it matches; it will call your function multiple times once for each element that matches your selection.
```
exports.pageLoaded = function(args) {
  var page = args.object;
  page.runAgainstClasses('clickButton', function(elem) {  
      elem.classList.toggle('hidden');
  });
}
```
  


#### view.classList.add(className, className, ...)
Add a class to the view's class list at the end
```js
   someButton.classList.add('hidden');  // ClassList on this button will be "class1 class2 classx hidden"
```

#### view.classList.insert(className, className, ...)
Add a class to the view's class list at the front
```js
   someButton.classList.insert('hidden'); // ClassList on this button will be "hidden class1 class2 classx"
```

#### view.classList.remove(className, className, ...)
Removes a class from the view's class list
```js
   someButton.classList.remove('hidden'); // ClassList would then equal "class1 class2 class3"
```
   
#### view.classList.toggle(className[, force])
Toggles a class name
if force = true, will force adding the class name only.     (And won't remove it, but you won't have a second)
if force = false, will force removing the class name only.  (And won't add it)

#### view.classList.item(index) 
Returns the class name at that location in the class list.

#### view.classList.contains(className)
Returns true or false if the class name exists in the class list.
```js
  if (someButton.classList.contains('hidden')) {
     someButton.classList.remove('hidden');
  } else {
     someButton.classList.add('hidden');
  }

  // someButton.classList.toggle('hidden');    would be equivelent to the 5 lines above.
```

#### TypeScript Global Augmentation
This module ships a file, **dom-global.d.ts**, to enable intellisense and benefit from the TypeScript Typings
add a reference in your *references.d.ts* file. Below is the snippet you can paste into the *references.d.ts* in the root of your app.

<sub>*You may need to restart your IDE for it to resolve the added typings.*</sub>

`/// <reference path="./node_modules/nativescript-dom/dom-global.d.ts" />`

## Thanks & Contributors

- Brad Martin - For the TS Typings