#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Code Climate][climate-image]][climate-url] [![Test Coverage][coverage-image]][coverage-url] [![Dependency Status][daviddm-image]][daviddm-url]

> A tibia crawler module for Node.


## Install

```sh
$ npm install --save tibia-crawler
```

## Usage

```js
var tibia = require('tibia-crawler');
tibia.character('Serphir', function(player){

  // have fun with the player data

});
```


## License

The MIT License (MIT)

Copyright (c) 2015 TibiaJS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-image]: https://badge.fury.io/js/tibia-crawler.svg
[npm-url]: https://npmjs.org/package/tibia-crawler
[travis-image]: https://travis-ci.org/TibiaJS/tibia-crawler.svg?branch=master
[travis-url]: https://travis-ci.org/TibiaJS/tibia-crawler
[daviddm-image]: https://david-dm.org/TibiaJS/tibia-crawler.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TibiaJS/tibia-crawler
[climate-url]: https://codeclimate.com/github/TibiaJS/tibia-crawler
[climate-image]: https://codeclimate.com/github/TibiaJS/tibia-crawler/badges/gpa.svg
[coverage-url]: https://codeclimate.com/github/TibiaJS/tibia-crawler
[coverage-image]: https://codeclimate.com/github/TibiaJS/tibia-crawler/badges/coverage.svg
