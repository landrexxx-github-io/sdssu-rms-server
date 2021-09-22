const mongoose = require("mongoose");

const presentationSchema = mongoose.Schema({
    research_id: {
        type: String,
        required: true,
    },
    title_of_research: {
        type: String,
        required: true,
    },
    presentor: {
        type: String,
    },
    date_presented: {
        type: Date,
    },
    type_of_forum: {
        type: String,
    },
    venue_of_forum: {
        type: String,
    },
    title_of_forum: {
        type: String,
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

const PresentationSchema = mongoose.model(
    "col_presentation",
    presentationSchema
);

module.exports = PresentationSchema;
