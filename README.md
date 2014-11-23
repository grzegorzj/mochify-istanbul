mochify-istanbul
=====================

Add istanbul coverage to the [mochify.js](https://github.com/mantoni/mochify.js) pipeline.

## Install

```
$ npm install mochify mochify-istanbul
```

## Usage

```javascript
var mochify = require('mochify');
var istanbul = require('mochify-istanbul');

va b = mochify('path/to/your/file', mochifyOpts)
  .plugin(istanbul({
    // Intrumenter options
    exclude: '**/test/**/*',
    // Reporter options
    reports: ['text', 'cobertura', 'json']
  }))
  .bundle();
```

## Options
There are only two options specific to this module, all the rest options are passed directly to the reporters
* ```options.exclude = '<glob pattern>'```: Files to exclude for the instrumenter
* ```options.reports = ['<report type>']```: Array of reports to generate. Check [istanbul](https://github.com/gotwarlost/istanbul) for a updated list of reports

## Compatibility
 - Node >= 0.10
 - v0.x, v1.0
    - Mochify 2.x
        - Browserify 6.x
        - Mocha 2.x
        - Istanbul 0.x

## Run tests
Clone the repo and run ```npm install && npm test```

## License

(The MIT License)

Copyright (c) 2012 Fenando Lores <ferlores@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.