"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var path = process.env.HOME;

    var macDefaultDir = "/Library/Ethereum/geth.ipc";
    var linuxDefaultDir = "/.ethereum/geth.ipc";

    if (process.platform === 'darwin') {
        if (_fs2.default.existsSync(path + macDefaultDir)) path += macDefaultDir;else if (_fs2.default.existsSync(path + linuxDefaultDir)) path += linuxDefaultDir;else path += macDefaultDir;
    }

    if (process.platform === 'freebsd' || process.platform === 'linux' || process.platform === 'sunos') path += linuxDefaultDir;

    if (process.platform === 'win32') path = '\\\\.\\pipe\\geth.ipc';

    return path;
};

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

; /**
  Gets the right IPC path
  
  @module getIpcPath
  */

module.exports = exports["default"];