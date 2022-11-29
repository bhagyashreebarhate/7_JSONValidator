
const ProjectJson = require('../models/JsonSchema')
const UserProject = require('../models/UserProject')

const express = require('express')
const router = express.Router()
router.get('/getJsonSchema', async (req, res) => {
    ProjectJson.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

router.get('/getListofProjects', async (req, res) => {
  let UserId = req.query.UserId;
    UserProject.find({'UserId': UserId }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});


router.get('/getListofschema', async (req, res) => {
    let UserId = req.query.UserId;
    ProjectJson.find({'UserId': UserId }, (err, result) => {
          if (err) {
              res.json(err);
          }
          else {
              res.json(result);
          }
      });
  });
router.post('/UserProject', async (req, res) => {
    const { UserId, ProjectName, UserProjectName,SceneData, AssetData, ActionData,
        CustomData , TimelineData } = req.body

    if (!UserId || !ProjectName || !UserProjectName || !SceneData  || !AssetData || !ActionData 
        || !CustomData  || !TimelineData )
        return res.status(400).json({ msg: 'Something missing' })

    const userProject = await UserProject.findOne({  'ProjectName': ProjectName, 'UserId': UserId ,'UserProjectName':UserProjectName }) // finding user in db
    if (userProject) return res.status(400).json({ msg: 'UserProject name already exists' })
    // console.log(user);
    // console.log(user._id);

    const newuserProject = new UserProject({
        UserId, ProjectName, UserProjectName, SceneData, AssetData, ActionData,
        CustomData , TimelineData 
    })
    // hasing the password
    const savedUserProjRes = await newuserProject.save()

    if (savedUserProjRes)
        return res.status(200).json({ msg: ' User Project saved successfull' })
})

router.post('/Project', async (req, res) => {
    const { UserId, ProjectName, SceneObject, SceneTemplate, AssetObject, AssetTemplate, ActionObject, ActionTemplate,
        CustomObject, CustomTemplate, TimelineObject, TimelineTemplate } = req.body

    if (!UserId || !ProjectName || !SceneObject || !SceneTemplate || !AssetObject || !AssetTemplate || !ActionObject || !ActionTemplate
        || !CustomObject || !TimelineObject || !TimelineTemplate)
        return res.status(400).json({ msg: 'Something missing' })

    const user = await ProjectJson.findOne({ ProjectName }) // finding user in db
    if (user) return res.status(400).json({ msg: 'Project name already exists' })
    // console.log(user);
    // console.log(user._id);

    const newUser = new ProjectJson({
        UserId, ProjectName, SceneObject, SceneTemplate, AssetObject, AssetTemplate, ActionObject, ActionTemplate,
        CustomObject, CustomTemplate, TimelineObject, TimelineTemplate
    })
    // hasing the password
    const savedUserRes = await newUser.save()

    if (savedUserRes)
        return res.status(200).json({ msg: 'New Project with Json successfully uploaded' })
})

router.get('/Projectinfo', async (req, res) => {

    const user = await ProjectJson.find({}) // finding user in db
    if (!user) return res.status(400).json({ msg: ' No Schema exists ' })
    // console.log(user);

    return res.status(200).json({ msg: 'schema came' })
})
router.post('/Asset', async (req, res) => {
    const { UserId, SchemaName, SchemaObject } = req.body

    if (!UserId || !SchemaName || !SchemaObject)
        return res.status(400).json({ msg: 'Something missing' })

    const user = await ProjectJson.findOne({ SchemaName }) // finding user in db
    if (user) return res.status(400).json({ msg: 'User Schema name already exists' })
    // console.log(user);
    // console.log(user._id);

    const newUser = new ProjectJson({ UserId, SchemaName, SchemaObject })
    // hasing the password
    const savedUserRes = await newUser.save()

    if (savedUserRes)
        return res.status(200).json({ msg: 'New JSON successfully uploaded' })
})
module.exports = router
