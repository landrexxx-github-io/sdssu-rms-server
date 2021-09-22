const mongoose = require("mongoose");

const innovationSchema = mongoose.Schema({
    innovation_id: {
        type: String,
    },
    faculty_id: {
        type: String,
        required: true,
    },
    faculty_name: {
        type: String,
        required: true,
    },
    title_of_innovation: {
        type: String,
        required: true,
    },
    type_of_innovation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date_submitted: {
        type: Date,
    },
    grant_code: {
        type: String,
    },
    date_granted: {
        type: Date,
    },
    is_completed: {
        type: String,
        default: "N",
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

const InnovationSchema = mongoose.model("col_innovation", innovationSchema);

module.exports = InnovationSchema;
