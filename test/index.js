var clearInterval = require("timers").clearInterval
var setInterval = require("timers").setInterval
var setTimeout = require("timers").setTimeout
var test = require("tape")

var choke = require("../index")

test("choke is a function", function (assert) {
    assert.equal(typeof choke, "function")
    assert.end()
})

test("choke triggers with the last argument", function (assert) {
    var choked = choke(function (e) {
        assert.equal(e, 5)
        assert.end()
    }, 0)

    choked.listener(1)
    choked.listener(2)
    choked.listener(3)
    choked.listener(4)
    choked.listener(5)
})

test("choke rate limits calls", function (assert) {
    var lastEvent = null

    var choked = choke(function (e) {
        if (e === 0) {
            assert.equal(lastEvent, null)
        } else if (e === 5) {
            assert.equal(lastEvent, 0)
            setTimeout(function () {
                assert.end()
            }, 5000)
        } else {
            assert.error("Unexpected event")
        }

        lastEvent = e
    }, 10000)

    setTimeout(function () {
        choked.listener(0)
    }, 0)

    setTimeout(function () {
        choked.listener(1)
    }, 1000)
    setTimeout(function () {
        choked.listener(2)
    }, 2000)
    setTimeout(function () {
        choked.listener(3)
    }, 3000)
    setTimeout(function () {
        choked.listener(4)
    }, 4000)
    setTimeout(function () {
        choked.listener(5)
    }, 5000)
})

test("choke can be cancelled", function (assert) {
    var lastEvent = null
    var emptyCount = 0
    var interval

    var choked = choke(function (e) {
        if (e === 0) {
            assert.equal(lastEvent, null)
            interval = setInterval(function () {
                if (emptyCount < 15) {
                    emptyCount += 1
                    assert.ok(true, "No other triggers")
                } else {
                    clearInterval(interval)
                    assert.end()
                }
            }, 1000)
        } else {
            assert.error("Unexpected event")
        }

        lastEvent = e
    }, 15000)

    setTimeout(function () {
        assert.ok(true, "Queued call 0")
        choked.listener(0)
    }, 0)

    setTimeout(function () {
        assert.ok(true, "Queued call 1")
        choked.listener(1)
    }, 1000)
    setTimeout(function () {
        assert.ok(true, "Queued call 2")
        choked.listener(2)
    }, 2000)
    setTimeout(function () {
        assert.ok(true, "Queued call 3")
        choked.listener(3)
    }, 3000)
    setTimeout(function () {
        assert.ok(true, "Queued call 4")
        choked.listener(4)
    }, 4000)
    setTimeout(function () {
        assert.ok(true, "Queued call 5")
        choked.listener(5)
    }, 5000)
    setTimeout(function () {
        assert.ok(true, "Cancelled queued call")
        choked.cancel()
    }, 7500)
})

test("choke preserves this", function (assert) {
    var choked = choke(function (e) {
        assert.equal(this, choked)
        assert.end()
    }, 0)

    choked.listener()
})
