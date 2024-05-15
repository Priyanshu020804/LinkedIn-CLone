const mongoose=require('mongoose');

// create a schema
// convert schema to a  model

const SkillSchema = new mongoose.Schema({
    skillName : {
        type : String,
        required : true,
    },
})

const Skill = mongoose.model('Skill',SkillSchema);

module.exports = Skill;