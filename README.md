# nativescript-dom
A class of DOM based NativeScript functions

## License

This is released under the MIT License, meaning you are free to include this in any type of program -- However for entities that need a support contract, changes, enhancements and/or a commercial license please contact me (nathan@master-technology.com).

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


#### view.classList.add(className)
Add a class to the view's class list at the end
```js
   someButton.classList.add('hidden');  // ClassList on this button will be "class1 class2 classx hidden"
```

#### view.classList.insert(className)
Add a class to the view's class list at the front
```js
   someButton.classList.insert('hidden'); // ClassList on this button will be "hidden class1 class2 classx"
```

#### view.classList.remove(className)
Removes a class from the view's class list
```js
   someButton.classList.remove('hidden'); // ClassList would then equal "class1 class2 class3"
```
   
#### view.classList.toggle(className[, force])
Toggles a class name
if force = true, will force adding the class name only.     (And won't remove it, but you won't have a second)
if force = false, will force removing the class name only.  (And won't add it)

#### view.classList.item(id) 
Returns the class name at that location.

#### view.classList.contains(className)
Returns true or false if the class name exists in the class list.
```js
  if (someButton.classList.contains('hidden')) {
     someButton.classList.remove('hidden');
  } else {
     someButton.classList.add('hidden');
  }

  // Although   someButton.classList.toggle('hidden');    would be equivelent to the 5 lines above.
```

