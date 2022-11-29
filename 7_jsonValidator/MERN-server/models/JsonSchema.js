
const mongoose = require('mongoose')

let Schema = mongoose.Schema
const JsonSchema = new Schema(
    {
        UserId: {
            type: String,
            required: true,
        },
        ProjectName: {
            type: String,
            required: true,
        },
        SceneObject: {
            type: Object,
            required: true,
        },
        SceneTemplate : {
            type: Object,
            required: true,
        },
        AssetObject: {
            type: Object,
            required: true,
        },
        AssetTemplate: {
            type: Object,
            required: true,
        },
        ActionObject: {
            type: Object,
            required: true,
        },
        ActionTemplate: {
            type: Object,
            required: true,
        },
        CustomObject: {
            type: Object,
            required: true,
        },
        CustomTemplate: {
            type: Object,
            required: true,
        },
        TimelineObject: {
            type: Object,
            required: true,
        },
        TimelineTemplate: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true
    }
)
const ProjectJson = mongoose.model('ProjectJson', JsonSchema)
module.exports = ProjectJson