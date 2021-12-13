// import in caolan forms
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets



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
            }
            // widget: widgets.datetimeLocal()
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
            // widget: widgets.datetimeLocal()
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