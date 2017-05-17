'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mine_when_need = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _os = require('os');

var os = _interopRequireWildcard(_os);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_TX_CONFIRMATION_BLOCK = 5;

var mine_when_need = function () {
    _createClass(mine_when_need, [{
        key: 'statusUpdate',
        value: function () {
            var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(thisCls) {
                var blockNumber, txCounts, i;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _es6Promisify2.default)(thisCls.web3.eth.getBlockNumber)();

                            case 2:
                                blockNumber = _context.sent;
                                _context.next = 5;
                                return ['pending'].concat([].concat(_toConsumableArray(Array(DEFAULT_TX_CONFIRMATION_BLOCK).keys())).map(function (x) {
                                    return blockNumber - x;
                                }));

                            case 5:
                                txCounts = _context.sent;
                                i = 0;

                            case 7:
                                if (!(i < txCounts.length)) {
                                    _context.next = 14;
                                    break;
                                }

                                _context.next = 10;
                                return (0, _es6Promisify2.default)(thisCls.web3.eth.getBlockTransactionCount)(txCounts[i]);

                            case 10:
                                txCounts[i] = _context.sent;

                            case 11:
                                i++;
                                _context.next = 7;
                                break;

                            case 14:

                                if (!txCounts.every(function (x) {
                                    return x === 0;
                                })) {
                                    thisCls.startMining(thisCls);
                                } else {
                                    thisCls.stopMining(thisCls);
                                }

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function statusUpdate(_x) {
                return _ref.apply(this, arguments);
            }

            return statusUpdate;
        }()
    }]);

    function mine_when_need(ethIPC, web3, txConfirmation, mineCores) {
        var _this = this,
            _arguments = arguments;

        _classCallCheck(this, mine_when_need);

        this.ethIPC = ethIPC;
        this.web3 = web3;
        this.mineCores = mineCores || os.cpus().length;
        this.txConfirmation = txConfirmation || DEFAULT_TX_CONFIRMATION_BLOCK;

        this.statusUpdate(this);
        web3.eth.filter('latest', function () {
            _this.statusUpdate.apply(_this, [_this].concat(Array.prototype.slice.call(_arguments)));
        });
        web3.eth.filter('pending', function () {
            _this.statusUpdate.apply(_this, [_this].concat(Array.prototype.slice.call(_arguments)));
        });
    }

    _createClass(mine_when_need, [{
        key: 'startMining',
        value: function () {
            var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee2(thisCls) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return (0, _es6Promisify2.default)(thisCls.web3.eth.getMining)();

                            case 2:
                                if (_context2.sent) {
                                    _context2.next = 5;
                                    break;
                                }

                                thisCls.ethIPC.minerStart(this.mineCores);
                                console.log(_chalk2.default.green('Start mining at ' + new Date()));

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function startMining(_x2) {
                return _ref2.apply(this, arguments);
            }

            return startMining;
        }()
    }, {
        key: 'stopMining',
        value: function () {
            var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee3(thisCls) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _es6Promisify2.default)(thisCls.web3.eth.getMining)();

                            case 2:
                                if (!_context3.sent) {
                                    _context3.next = 5;
                                    break;
                                }

                                thisCls.ethIPC.minerStop();
                                console.log(_chalk2.default.green('Stop mining at ' + new Date()));

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function stopMining(_x3) {
                return _ref3.apply(this, arguments);
            }

            return stopMining;
        }()
    }]);

    return mine_when_need;
}();

exports.mine_when_need = mine_when_need;