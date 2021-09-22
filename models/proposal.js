const mongoose = require("mongoose");

const proposalSchema = mongoose.Schema({
    title_of_research: {
        type: String,
        required: true,
    },
    type_of_research: {
        type: String,
        required: true,
    },
    author: {
        type: Array,
        required: true,
    },
    author_list: {
        type: String,
        required: true,
    },
    source_of_funding: {
        type: String,
        required: true,
    },
    total_funds: {
        type: String,
        required: true
    },
    // date_of_completion: {
    //     type: Date,
    //     required: true,
    // },
    abstract: {
        type: String,
    },
    date_started: {
        type: Date,
    },
    date_completed: {
        type: Date,
    },
    duration: {
        type: String,
    },
    file_name: {
        type: String,
    },
    remarks: {
        type: String,
    },
    status: {
        type: String,
    },
    date_submitted: {
        type: Date,
    },
    date_evaluated: {
        type: Date,
    },
    date_for_approval: {
        type: Date,
    },
    date_approved: {
        type: Date,
    },
    completed_remarks: {
        type: String,
    },
    completed_status: {
        type: String,
    },
    date_completed: {
        type: Date,
    },
    is_completed: {
        type: String,
    },
    is_presented: {
        type: String,
    },
    is_published: {
        type: String,
    },
    is_utilized: {
        type: String,
    },
    create_at: {
        type: Date,
        default: new Date(),
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

const ProposalSchema = mongoose.model("col_proposal", proposalSchema);

module.exports = ProposalSchema;
