const mongoose = require("mongoose");

const seminarSchema = mongoose.Schema({
    date_of_seminar: {
        type: Date,
        required: true
    },
    title_of_activity: {
        type: String,
        required: true
    },
    type_of_participant: {
        type: String,
        require: true
    },
    venue_of_the_activity: {
        type: String,
        required: true
    },
    scope_of_the_activity: {
        type: String,
        required: true
    },
    created_by: {
        user_id: {
            type: String,
        },
        full_name: {
            type: String,
        },
        user_type: {
            type: String,
        },
        college: {
            type: String,
        },
        campus: {
            type: String,
        },
    },
    create_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
    },
    updated_by: {
        user_id: {
            type: String,
        },
        full_name: {
            type: String,
        },
        user_type: {
            type: String,
        },
    },
});

const SeminarSchema = mongoose.model("col_seminar", seminarSchema);

module.exports = SeminarSchema;
