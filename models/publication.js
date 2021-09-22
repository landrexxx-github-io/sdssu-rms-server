const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
    research_id: {
        type: String,
        required: true,
    },
    title_of_research: {
        type: String,
        required: true,
    },
    title_of_publication: {
        type: String,
        // required: true,
    },
    date_of_publication: {
        type: Date,
    },
    title_of_journal: {
        type: String,
    },
    type_of_journal: {
        type: String,
    },
    issn_isbn: {
        type: String,
    },
    volume_no: {
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

const PublicationSchema = mongoose.model("col_publication", publicationSchema);

module.exports = PublicationSchema;
