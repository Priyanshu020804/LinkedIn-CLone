const mongoose=require('mongoose');

// create a schema
// convert schema to a  model

const ProjectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : false,
    },
    links : [
        {
            type : String,
            required : false,
        },
    ],
})

const Project = mongoose.model('Project',ProjectSchema);

module.exports = Project;