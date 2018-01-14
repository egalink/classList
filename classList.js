/*!
 * classList v1.0.0
 * 
 * A ClassList Helper
 * https://github.com/egalink
 * MIT license
 * 
 * classList.add(elem, 'my-class1', 'my-class2', '...');
 * classList.remove(elem, 'my-class1', 'my-class2', '...');
 * classList.toggle(elem, 'my-class');
 * classList.contains(elem, 'my-class');
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

;(function(window) {

    'use strict';
    
    /**
     * Regexp to find a className on a string.
     *
     * @return RegExp Obj
     */
    function classReg (className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    
    /**
     * ClassList Fallback
     * Thanks to: Jean David Daviet
     * Gist: https://gist.github.com/JeanDavidDaviet/4745497
     * --------------------------------------------------------------------- */

    /**
     * Returns a Boolean value, indicating whether an element has
     * the specified class name.
     * 
     * Usage:
     *
     * var exists = containsClass(element, 'className');
     * 
     * @return bool
     */
    var containsClass = function (el, className) {
        //
        if (document.documentElement.classList) {
            containsClass = function (el, className) { return el.classList.contains(className); }
        } else {
            containsClass = function (el, className) {
                if (! el || ! el.className)
                    return false;
                return el.className.match(classReg(className));
            }
        }

        return containsClass(el, className);
    };

    /**
     * Adds one or more class names to an element.
     * If the specified class already exist, the class will not be added.
     *
     * Usage:
     *
     * addClass(el, 'class1', 'class2', 'class3', ...);
     *
     * @return bool false|HTML Element
     */
    var addClass = function (el) {
        //
        var classNames = arguments;
        if (classNames.length <= 1 || typeof el != 'object')
            return false;

        if (document.documentElement.classList)
            addClass = function (el, classNames) {
                for (var i = 1; i < classNames.length; i ++) if (typeof classNames[i] == 'string') {
                    el.classList.add(classNames[i]);
                }
                return el;
            }
        else
            addClass = function (el, classNames) {
                for (var i = 1; i < classNames.length; i ++) if (! containsClass(el, classNames[i]) && typeof classNames[i] == 'string') {
                    el.className += (el.className ? " " : "") + classNames[i];
                }
                return el;
            }

        return addClass(el, classNames);
    };

    /**
     * Removes one or more class names from an element.
     * Note: Removing a class that does not exist, does NOT throw an error.
     *
     * Usage:
     *
     * removeClass(el, 'class1', 'class2', 'class3', ...);
     *
     * @return bool false|HTML Element
     */
    var removeClass = function (el) {
        //
        var classNames = arguments;
        if (classNames.length <= 1 || typeof el != 'object')
            return false;

        if (document.documentElement.classList)
            removeClass = function (el, classNames) {
                for (var i = 1; i < classNames.length; i ++) if (typeof classNames[i] == 'string') {
                    el.classList.remove(classNames[i]);
                }
                return el;
            }
        else
            removeClass = function (el, classNames) {
                for (var i = 1; i < classNames.length; i ++) if (containsClass(el, classNames[i]) && typeof classNames[i] == 'string') {
                    el.className = el.className.replace(classReg(classNames[i]), "$2");
                }
                return el;
            }

        return removeClass(el, classNames);
    };

    /**
     * Toggles between a class name for an element.
     * 
     * Usage:
     *
     * var result = toggleClass(el, 'className');
     *
     * @return bool
     */
    var toggleClass = function (el, className) {
        //
        if (document.documentElement.classList)
            toggleClass = function (el, className) { return el.classList.toggle(className); }
        else
            toggleClass = function (el, className) {
                var exists = containsClass(el, className);
                var caller = exists === true ? removeClass : addClass;
                    caller(el, className);
                return ! exists;
            }

        return toggleClass(el, className);
    };

    // object:
    var classList = {
        has: containsClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass,
        contains: containsClass
    };

    // transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classList );
    } else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = classList;
    } else {
        // browser global
        window.classList = classList;
    }

})(window);
