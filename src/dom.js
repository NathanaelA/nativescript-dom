/**********************************************************************************
 * (c) 2015-2017, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 0.1.0                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

/* jshint node: true, browser: true, unused: true, undef: true */
/* global global */

// Load the required modules
var viewBase = require("@nativescript/core/ui/core/view-base");
var frame = require("@nativescript/core/ui/frame");

// global.android is already defined on android devices
// We are defining global.ios on ios devices, since the iOS team can't seem to do it.  ;-)
if (global.NSObject && global.NSString && typeof global.ios === "undefined") {
  global.ios = true;
  Object.freeze(global.ios);
}

if (!global.getElementById) {
  /***
   * Find a element by an id
   * @param id
   * @returns {ViewBase} or {undefined}
   */
  global.getElementById = function (id) {
    return getElementById(getCurrentActiveModel(), id);
  };
}

if (!viewBase.ViewBase.prototype.getElementById) {
  /***
   * Find an element by a id
   * @param id
   * @returns {ViewBase} or {undefined}
   */
  viewBase.ViewBase.prototype.getElementById = function (id) {
    return getElementById(this, id);
  };
}

if (!global.getElementsByClassName) {
  /***
   * getElementsByClassName
   * @param className - The class name
   * @returns {Array} of elements
   */
  global.getElementsByClassName = function (className) {
    return getElementsByClassName(getCurrentActiveModel(), className);
  };
}

if (!viewBase.ViewBase.prototype.getElementsByClassName) {
  /***
   * Finds all elements with the class name
   * @param className - the Class name
   * @returns {Array} of elements
   */
  viewBase.ViewBase.prototype.getElementsByClassName = function (className) {
    return getElementsByClassName(this, className);
  };
}

if (!global.getElementsByTagName) {
  /**
   * Finds all elements by a Tag name
   * @param tagName
   * @returns {Array}
   */
  global.getElementsByTagName = function (tagName) {
    return getElementsByTagName(getCurrentActiveModel(), tagName);
  };
}

if (!viewBase.ViewBase.prototype.getElementsByTagName) {
  /**
   * Finds all elements by a Tag name
   * @param tagName
   * @returns {Array}
   */
  viewBase.ViewBase.prototype.getElementsByTagName = function (tagName) {
    return getElementsByTagName(this, tagName);
  };
}

if (!viewBase.ViewBase.prototype.classList) {
  var classList = function (t) {
    var curClassList = "";

    this._resync = function () {
      if (curClassList === t.className) {
        return;
      }

      // We need to zero our length; so that we can re-add anything that exists in the parent class
      this.length = 0;
      var self = this;
      t.cssClasses.forEach(function (item) {
        self.push(item);
      });
    };

    this._update = function () {
      curClassList = this.join(" ");
      t.className = curClassList;
    };

    this._resync();
  };
  classList.prototype = [];
  classList.prototype.toString = function () {
    this._resync();
    return this.join(" ");
  };
  classList.prototype.item = function (i) {
    this._resync();
    return this[i] || null;
  };
  classList.prototype.add = function () {
    this._resync();
    var updated = false;
    for (var i = 0, len = arguments.length; i < len; i++) {
      if (!this.contains(arguments[i])) {
        this.push(arguments[i]);
        updated = true;
      }
    }
    if (updated) {
      this._update();
    }
    return this;
  };
  classList.prototype.insert = function () {
    this._resync();
    var updated = false;
    for (var i = 0, len = arguments.length; i < len; i++) {
      if (!this.contains(arguments[i])) {
        this.unshift(arguments[i]);
        updated = true;
      }
    }
    if (updated) {
      this._update();
    }
    return this;
  };

  classList.prototype.remove = function () {
    this._resync();
    var updated = false;
    for (var i = 0, len = arguments.length; i < len; i++) {
      var idx = this.indexOf(arguments[i]);
      if (idx >= 0) {
        this.splice(idx, 1);
        updated = true;
      }
    }
    if (updated) {
      this._update();
    }
    return this;
  };
  classList.prototype.toggle = function (val, force) {
    this._resync();
    if (this.contains(val)) {
      if (force === true) {
        return this;
      }
      return this.remove(val);
    } else {
      if (force === false) {
        return this;
      }
      return this.add(val);
    }
  };
  classList.prototype.contains = function (c) {
    return this.indexOf(c) >= 0;
  };
  var getClassList = function (val) {
    var cl = new classList(val);
    Object.defineProperty(val, "classList", {
      value: cl,
      configurable: true,
      enumerable: true,
    });
    return cl;
  };
  Object.defineProperty(viewBase.ViewBase.prototype, "classList", {
    configurable: true,
    enumerable: true,
    get: function () {
      return getClassList(this);
    },
  });
}

global.runAgainstClasses = function (clsName, func) {
  runAgainstClasses(getCurrentActiveModel(), clsName, func);
};
viewBase.ViewBase.prototype.runAgainstClasses = function (clsName, func) {
  runAgainstClasses(this, clsName, func);
};

global.runAgainstTagNames = function (tagName, func) {
  runAgainstTagNames(getCurrentActiveModel(), tagName, func);
};
viewBase.ViewBase.prototype.runAgainstTagNames = function (tagName, func) {
  runAgainstTagNames(this, tagName, func);
};

global.runAgainstId = function (id, func) {
  runAgainstId(getCurrentActiveModel(), id, func);
};
viewBase.ViewBase.prototype.runAgainstId = function (id, func) {
  runAgainstId(this, id, func);
};

/*** Support routines, not publicly accessible ***/
function getElementById(v, id) {
  if (!v) {
    return undefined;
  }
  if (v.id === id) {
    return view;
  }
  var retVal = undefined;
  var viewCallBack = function (child) {
    if (child.id === id) {
      retVal = child;
      return false;
    }

    // Android patch for ListView
    if (
      child._realizedItems &&
      child._realizedItems.size !== child._childrenCount
    ) {
      for (var key in child._realizedItems) {
        if (child._realizedItems.hasOwnProperty(key)) {
          // We return false, when we have a hit; so if we have a hit we can stop searching
          if (!viewCallBack(child._realizedItems[key])) {
            return false;
          }
        }
      }
    }

    return true;
  };

  viewBase.eachDescendant(v, viewCallBack);

  if (typeof retVal === "undefined") {
    // Android patch for ListView
    if (v._realizedItems && v._realizedItems.size !== v._childrenCount) {
      for (var key in v._realizedItems) {
        if (v._realizedItems.hasOwnProperty(key)) {
          // viewCallback will return false, if we found a match
          if (!viewCallBack(v._realizedItems[key])) {
            return retVal;
          }
        }
      }
    }
  }

  return retVal;
}

function getElementsByClassName(v, clsName) {
  var retVal = [];
  if (!v) {
    return retVal;
  }

  if (v.classList.contains(clsName)) {
    retVal.push(v);
  }

  var classNameCallback = function (child) {
    if (child.classList.contains(clsName)) {
      retVal.push(child);
    }

    // Android patch for ListView
    if (
      child._realizedItems &&
      child._realizedItems.size !== child._childrenCount
    ) {
      for (var key in child._realizedItems) {
        if (child._realizedItems.hasOwnProperty(key)) {
          classNameCallback(child._realizedItems[key]);
        }
      }
    }

    return true;
  };

  viewBase.eachDescendant(v, classNameCallback);

  // Android patch for ListView
  if (v._realizedItems && v._realizedItems.size !== v._childrenCount) {
    for (var key in v._realizedItems) {
      if (v._realizedItems.hasOwnProperty(key)) {
        classNameCallback(v._realizedItems[key]);
      }
    }
  }

  return retVal;
}

function getElementsByTagName(v, tagName) {
  // TagName is case-Insensitive
  var tagNameLC = tagName.toLowerCase();

  var retVal = [],
    allTags = false;
  if (!v) {
    return retVal;
  }

  if (tagName === "*") {
    allTags = true;
  }

  if ((v.typeName && v.typeName.toLowerCase() === tagNameLC) || allTags) {
    retVal.push(v);
  }

  var tagNameCallback = function (child) {
    if (
      (child.typeName && child.typeName.toLowerCase() === tagNameLC) ||
      allTags
    ) {
      retVal.push(child);
    }

    // Android patch for ListView
    if (
      child._realizedItems &&
      child._realizedItems.size !== child._childrenCount
    ) {
      for (var key in child._realizedItems) {
        if (child._realizedItems.hasOwnProperty(key)) {
          tagNameCallback(child._realizedItems[key]);
        }
      }
    }

    return true;
  };

  viewBase.eachDescendant(v, tagNameCallback);

  // Android patch for ListView
  if (v._realizedItems && v._realizedItems.size !== v._childrenCount) {
    for (var key in v._realizedItems) {
      if (v._realizedItems.hasOwnProperty(key)) {
        tagNameCallback(v._realizedItems[key]);
      }
    }
  }

  return retVal;
}

var getCurrentActiveModel = function () {
  var topFrame = frame.topmost();
  var model = topFrame.currentPage && topFrame.currentPage.model;
  if (model) {
    return model;
  }
  return topFrame;
};

function runAgainstClasses(v, clsName, func) {
  var elements = getElementsByClassName(v, clsName);
  for (var i = 0; i < elements.length; i++) {
    func(elements[i]);
  }
}

function runAgainstTagNames(v, tagName, func) {
  var elements = getElementsByTagName(v, tagName);
  for (var i = 0; i < elements.length; i++) {
    func(elements[i]);
  }
}

function runAgainstId(v, id, func) {
  var element = getElementById(v, id);
  if (element) {
    func(element);
  }
}
