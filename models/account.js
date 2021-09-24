const mongoose = require('../index');

const accountSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    middle_initial: {
        type: String
    },
    full_name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    field_of_specialization: {
        type: String
    },
    educational_attainment: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_active: {
        type: String,
        default: 'N'
    },
    created_by: String,
    create_at: {
        type: Date,
        default: new Date()
    }
});

const AccountSchema = mongoose.model('col_account', accountSchema);

module.exports = AccountSchema;
