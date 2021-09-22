const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    department_code: {
        type: String,
        required: true
    },
    department_name: {
        type: String,
        required: true
    },
    campus_id: {
        type: String
    },
    campus_name: {
        type: String
    }
    // created_by: {
    //     user_id: String,
    //     full_name: String,
    //     user_type: String
    // },
    // create_at: {
    //     type: Date,
    //     default: new Date()
    // },
    // updated_at: {
    //     type: Date,
    // },
    // updated_by: {
    //     user_id: String,
    //     full_name: String,
    //     user_type: String
    // },
});

const DepartmentSchema = mongoose.model('col_department', departmentSchema);

module.exports = DepartmentSchema;