# choke

<!-- [![browser support][5]][6] -->

<!-- [![build status][1]][2] [![NPM version][7]][8] [![dependency status][3]][4] -->

Function call throttling with hook for cancelling

[![browser support](https://ci.testling.com/USER/PROJECT.png)](https://ci.testling.com/USER/PROJECT)

## Example

```js
var choke = require("choke")
var EventSource = require("eventsource-reconnect")

var source = new EventSource("http://localhost:1234/events")

var reconnect = choke(source.reconnect, 15000)

source.onopen = reconnect.cancel    // kill any outstanding reconnect attempts
source.onclose = reconnect.listener // throttle reconnects to 15 seconds
```

## Installation

`npm install choke`

## Contributors

 - Matt-Esch

## MIT Licenced

  [1]: https://secure.travis-ci.org/Matt-Esch/choke.png
  [2]: https://travis-ci.org/Matt-Esch/choke
  [3]: https://david-dm.org/Matt-Esch/choke.png
  [4]: https://david-dm.org/Matt-Esch/choke
  [5]: https://ci.testling.com/Matt-Esch/choke.png
  [6]: https://ci.testling.com/Matt-Esch/choke
  [7]: https://badge.fury.io/js/choke.png
  [8]: https://badge.fury.io/js/choke
