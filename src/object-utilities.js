// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['lodash'],
    function(_) {
        'use strict';

        var ObjectUtilities = function(){};

        ObjectUtilities.prototype.pickNonFalsy = function(source) {
            return  _.pickBy(source, function(value) { return !isFalsyOrEmpty(value); });
        };

        function isFalsyOrEmpty(value) {
            if (!value) {
                return true;
            }

            if (_.isObject(value) && _.isEmpty(value)) {
                return true;
            }

            return false;
        }

        ObjectUtilities.prototype.pickInBoth = function(source, otherSource) {
            return _.pickBy(source, function(value, key /*, object*/ ) {
                return _.has(otherSource, key);
            });
        };

        ObjectUtilities.prototype.traverse = function(o, func) {
            for (var i in o) {
                func.apply(this, [i, o[i]]);
                if (o[i] !== null && typeof(o[i]) === 'object') {
                    //going on step down in the object tree!!
                    this.traverse(o[i], func);
                }
            }
        };

        return new ObjectUtilities();
    });
