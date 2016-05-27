(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'lodash'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash);
        global.objectUtilities = mod.exports;
    }
})(this, function (exports, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    var ObjectUtilities = function ObjectUtilities() {};

    ObjectUtilities.prototype.pickNonFalsy = function (source) {
        return _lodash2.default.pickBy(source, function (value) {
            return !isFalsyOrEmpty(value);
        });
    };

    function isFalsyOrEmpty(value) {
        if (!value) {
            return true;
        }

        if (_lodash2.default.isObject(value) && _lodash2.default.isEmpty(value)) {
            return true;
        }

        return false;
    }

    ObjectUtilities.prototype.pickInBoth = function (source, otherSource) {
        return _lodash2.default.pickBy(source, function (value, key /*, object*/) {
            return _lodash2.default.has(otherSource, key);
        });
    };

    ObjectUtilities.prototype.traverse = function (o, func) {
        for (var i in o) {
            func.apply(this, [i, o[i]]);
            if (o[i] !== null && _typeof(o[i]) === 'object') {
                //going on step down in the object tree!!
                this.traverse(o[i], func);
            }
        }
    };

    exports.default = new ObjectUtilities();
});