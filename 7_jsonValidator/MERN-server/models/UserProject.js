
const mongoose = require('mongoose')

let Schema = mongoose.Schema
const ProjectSchema = new Schema(
    {
        UserId: {
            type: String,
            required: true,
        },
        ProjectName: {
            type: String,
            required: true,
        },
        UserProjectName: {
            type: String,
            required: true,
        },
        SceneData: {
            type: Object,
            required: true,
        },
        AssetData: {
            type: Object,
            required: true,
        },
        ActionData: {
            type: Object,
            required: true,
        },
        CustomData: {
            type: Object,
            required: true,
        },
        TimelineData: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true
    }
)
const UserProjects = mongoose.model('UserProjects', ProjectSchema)
module.exports = UserProjects