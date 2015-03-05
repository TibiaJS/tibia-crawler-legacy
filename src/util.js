'use strict';
var camelSindre = require('camelcase');

module.exports = {

    camelCase: function(value) {
        value = this.safeKey(value);
        if (/\s+/.test(value)) {
            return camelSindre(value);
        } else {
            return value.toLowerCase();
        }
    },

    safeKey: function(value) {
        return value
            .replace(':', '')
            .replace(String.fromCharCode(160), ' ');
    }
};
