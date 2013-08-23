var clearInterval = require("timers").clearInterval
var setInterval = require("timers").setInterval
var setTimeout = require("timers").setTimeout

module.exports = choke

function choke(f, rate) {
    var interval = null
    var args = null
    var that = null

    function listener() {
        that = this
        args = arguments
        if (!interval) {
            interval = setInterval(apply, rate)
            setTimeout(apply, 0)
        }
    }

    function apply() {
        if (args) {
            var result = f.apply(that, args)
            free()
            return result
        } else {
            clearInterval(interval)
        }
    }

    function cancel () {
        clearInterval(interval)
        free()
    }

    function free() {
        that = null
        args = null
    }

    return {
        listener: listener,
        cancel: cancel
    }
}