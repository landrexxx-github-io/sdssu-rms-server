const mongoose = require("mongoose");

const utilizationSchema = mongoose.Schema({
    research_id: {
        type: String,
        required: true,
    },
    title_of_research: {
        type: String,
        required: true,
    },
    beneficiary: {
        type: String,
        required: true,
    },
    date_of_utilization: {
        type: Date,
        required: true,
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

const UtilizationSchema = mongoose.model("col_utilization", utilizationSchema);

module.exports = UtilizationSchema;
