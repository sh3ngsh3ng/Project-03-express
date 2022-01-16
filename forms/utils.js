const tag  = require("../node_modules/forms/lib/tag.js")
const reduce = require('../node_modules/reduce')


// datetimeLocal function
var dataRegExp = /^data-[a-z]+([-][a-z]+)*$/;
var ariaRegExp = /^aria-[a-z]+$/;
var legalAttrs = [
    'autocomplete', 'autocorrect', 'autofocus', 'autosuggest', 'checked', 'dirname', 'disabled', 'tabindex', 'list', 'max', 'maxlength', 'min', 'novalidate', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'step'
];
var ignoreAttrs = [
    'id', 'name', 'class', 'classes', 'type', 'value', 'multiple'
];
var getUserAttrs = function (opt) {
    return reduce(opt, function (attributes, option, k) {
        if ((ignoreAttrs.indexOf(k) === -1 && legalAttrs.indexOf(k) > -1) || dataRegExp.test(k) || ariaRegExp.test(k)) {
            // eslint-disable-next-line no-param-reassign
            attributes[k] = option;
        }
        return attributes;
    }, {});
};

var input = function (type) {
    return function (opts) {
        var opt = opts || {};
        var userAttrs = getUserAttrs(opt);
        var w = {
            classes: opt.classes,
            type: type,
            formatValue: function (value) {
                return value || value === 0 ? value : null;
            }
        };
        w.toHTML = function (name, field) {
            var f = field || {};
            var attrs = {
                type: type,
                name: name,
                id: f.id === false ? false : f.id || true,
                classes: w.classes,
                value: w.formatValue(f.value)
            };
            return tag('input', [
                attrs, userAttrs, w.attrs || {}
            ]);
        };
        return w;
    };
};
var datetimeLocalWidget = input('datetime-local');
let datetimeLocal = function (options) {
    var opt = options || {};
    var w = datetimeLocalWidget(opt);
    w.formatValue = function (value) {
        if (!value) {
            return null;
        }

        var date = is.date(value) ? value : new Date(value);

        if (isNaN(date.getTime())) {
            return null;
        }

        return date.toISOString().slice(0, 23);
    };
    return w;
};

// multiple select option for room types
let roomTypes = [
                    ['escape_room', 'Escape Room'], 
                    ['mystery_murder', 'Mystery Murder'], 
                    ['amazing_race', 'Amazing Race']
                ]
// multiple select option for play time
let playTime = [
                    [30, "30 mins"],
                    [45, "45 mins"],
                    [60, "60 mins"],
                    [90, "90 mins"],
                    [120, '120 mins']
                ]
// multiple select option for age restriction
let ageRestriction = [
                    [0, "No Age Restriction"],
                    [9, "9 years old"],
                    [12, "12 years old"],
                    [21, "21 years old"],
                ]                


let orderStatus = [
                    ['all', 'All'],
                    ['processing', 'Pending'],
                    ['confirmed', 'Confirmed'],
                    ['cancelled', 'Cancelled']
                ]



module.exports = {
    datetimeLocal,
    roomTypes,
    playTime,
    ageRestriction,
    orderStatus
}