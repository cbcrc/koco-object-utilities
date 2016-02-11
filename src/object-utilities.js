// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['lodash'],
    function(_) {
        'use strict';

        var ObjectUtilities = function(){};

        ObjectUtilities.prototype.pickNonFalsy = function(source) {
            //var self = this;

            return  _.pickBy(source, function(x){ return x && !_.isEmpty(x); });
        };

        ObjectUtilities.prototype.pickInBoth = function(source, otherSource) {
            //var self = this;

            return _.pickBy(source, function(value, key /*, object*/ ) {
                return _.has(otherSource, key);
            });
        };

        ObjectUtilities.prototype.traverse = function(o, func) {
            var self = this;

            for (var i in o) {
                func.apply(this, [i, o[i]]);
                if (o[i] !== null && typeof(o[i]) === 'object') {
                    //going on step down in the object tree!!
                    self.traverse(o[i], func);
                }
            }
        };

        return new ObjectUtilities();
    });
