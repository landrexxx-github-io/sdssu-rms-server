const mongoose = require('mongoose');

const campusSchema = mongoose.Schema({
    campus_name: {
        type: String,
        required: true
    },
    campus_address: {
        type: String,
        required: true
    },
    created_by: String,
    create_at: {
        type: Date,
        default: new Date()
    }
});

const CampusSchema = mongoose.model('col_campus', campusSchema);

module.exports = CampusSchema;