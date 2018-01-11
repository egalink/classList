# classList - A ClassList Helper

Use classList only if you need to support older browsers that do not support `classList`. `classList`
is supported in IE10+, Android 3+, iOS Safari 5.1+, and modern evergreen browsers.
[Can I use classList](http://caniuse.com/#search=classlist)?

A ClassList Helper is longer supported. v1.0.0 is the final version.

## Usage

``` js
classList.has(element, 'my-class') // returns true/false
classList.add(element, 'my-new-class') // add new class
classList.remove(element, 'my-unwanted-class') // remove class
classList.toggle(element, 'my-class') // toggle class
```

## Package management

Install with [Bower](http://bower.io) :bird: `bower install classList`

Install with [npm](https://github.com/npm/npm) `npm install egalink-classList`

Install with [Component](http://github.com/component/component) `component install egalink/classList`

## MIT license

classList is released under the [MIT license](https://mit-license.org/).
