/*!
 * classList v1.0.0
 * 
 * A ClassList Helper
 * https://github.com/egalink
 * MIT license
 * 
 * classList.add(elem, 'my-new-class');
 * classList.remove(elem, 'my-unwanted-class');
 * classList.toggle(elem, 'my-class');
 * classList.contains(elem, 'my-class');
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

;(function(window) {

    'use strict';

    function classReg (className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    /**
     * ClassList Fallback
     * Thanks to: Jean David Daviet
     * Gist: https://gist.github.com/JeanDavidDaviet/4745497
     * --------------------------------------------------------------------- */

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

    var addClass = function (el, className) {
        //
        if (document.documentElement.classList)
            addClass = function (el, className) { el.classList.add(className); }
        else
            addClass = function (el, className) {
                if (! el)
                    return false;
                if (! containsClass(el, className))
                    el.className += (el.className ? " " : "") + className;
            }

        addClass(el, className);
    };

    var removeClass = function (el, className) {
        //
        if (document.documentElement.classList)
            removeClass = function (el, className) { el.classList.remove(className); }
        else
            removeClass = function (el, className) {
                if (! el || ! el.className)
                    return false;
                el.className = el.className.replace(classReg(className), "$2");
            }

        removeClass(el, className);
    };

    var toggleClass = function (el, className) {
        //
        if (document.documentElement.classList)
            toggleClass = function (el, className) { return el.classList.toggle(className); }
        else
            toggleClass = function (el, className) {
                var fn = containsClass(elem, className) ? removeClass : addClass;
                    fn(elem, className);
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
