require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const port = process.env.PORT || 3001;

// ROUTES
const campus_routes = require('./routes/campus.js');
const department_routes = require('./routes/department.js');
const account_routes = require('./routes/account');

const proposal_routes = require('./routes/proposal');
const completed_routes = require('./routes/completed');
const presentation_routes = require('./routes/presentation');
const publication_routes = require('./routes/publication');
const utilization_routes = require('./routes/utilization');
const innovation_routes = require('./routes/innovation');
const seminar_routes = require('./routes/seminar');

// RUN THE APP
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

// NAVIGATE ROUTE AFTER CORS
app.use('/proposal', proposal_routes);
app.use('/completed', completed_routes);
app.use('/presentation', presentation_routes);
app.use('/publication', publication_routes);
app.use('/utilization', utilization_routes);
app.use('/innovation', innovation_routes);
app.use('/seminar', seminar_routes);

app.use('/campus', campus_routes);
app.use('/department', department_routes);
app.use('/account', account_routes);

app.listen(port, () => console.log(`Server is running at PORT ${port}`));

const MONGO_URI=`mongodb+srv://nemsu-tagbina-atlas:root@research-management-sys.erzxd.mongodb.net/research-management-system-db?authSource=admin&replicaSet=atlas-y8u2vg-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`

// SETUP MONGO DATABASE
module.exports = async () => {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true, useFindAndModify: false })
        .then(() => {
            console.log("The mongo database is currently running.");
        })
        .catch((error) => {
            console.log("Error: ", error.message);
        })
    
    return mongoose;
};
