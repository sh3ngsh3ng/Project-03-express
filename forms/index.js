// import in caolan forms
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets
const tag  = require("../node_modules/forms/lib/tag.js")

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
console.log(datetimeLocal)



var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

// caolan form documentation: https://github.com/caolan/forms
const createProductForm = (tags) => {
    return forms.create({
        'product_name': fields.string({
            label: "Title of Escape Room",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'product_description': fields.string({
            label: "Describe the Room",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'product_price': fields.string({
            label: "Price/Pax (SGD)",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators': [validators.integer(), validators.max(100), validators.min(10)]
        }),
        'image_url': fields.string({
            widget: widgets.hidden()
        }),
        'thumbnail_url': fields.string({
            widget: widgets.hidden()
        }),
        'room_size': fields.string({
            label: "Room Size",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators': [validators.integer(), validators.max(100, "For Room Size more than 20pax, please send in a request to the administrator.")]
        }),
        'tags': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.multipleSelect(),
            choices: tags
        })
    })
}

const createRegistrationForm = () => {
    return forms.create({
        'vendor_name': fields.string({
            label: "Full Name",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'vendor_phone': fields.string({
            label: "Contact Number",
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'vendor_email': fields.string({
            label: "Email",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'username': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'confirm_password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            validators: [validators.matchField('password')]
        })
    })
}

const createLoginForm = () => {
    return forms.create({
        'username': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        })
    })
}

const createAddSessionForm = () => {
    return forms.create({
        'slot_datetime': fields.string({
            label: "Choose a Date & Time",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: datetimeLocal()
        })
    })
}

const createSearchForm = (tags) => {
    return forms.create({
        'name': fields.string({
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'max_cost': fields.string({
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'tags': fields.string({
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.multipleSelect(),
            choices: tags
        }),
        'start_date': fields.string({
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: datetimeLocal()
        })
    })
}


module.exports = {bootstrapField, 
                createProductForm, 
                createRegistrationForm,
                createLoginForm,
                createAddSessionForm,
                createSearchForm
            }