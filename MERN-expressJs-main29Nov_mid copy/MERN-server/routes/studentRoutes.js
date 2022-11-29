const Student = require('../models/StudentSchema')
const express = require('express')
const router = express.Router()

const isAlive = (req, res, next) => {
    if(req.session.user){
        next()
        return
    }
    return res.status(401).send("Unauthorized...");
}


router.use(isAlive)

router.get('/', async (req, res) => {
    try {
        const users = await Student.find();

        res.status(200).json({ "data": users })
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})


router.get('/:roll', async (req, res) => {
    try {
        const roll = req.params.roll
        const user = await Student.findOne({ roll });

        if(!user){
            return res.status(200).json({ msg: "Student doesn't exist..." })
        }

        return res.status(200).json({ "data": user })
    } catch (err) {
        return res.status(500).send("Something went wrong!")
    }
})


router.post('/', async (req, res) => {
    const { name, roll, programme, courses } = req.body;

    if (!name || !roll || !programme) {
        return res.status(400).send("Something is missing");
    }

    const existRoll = await Student.findOne({ roll });
    if (existRoll) {
        return res.status(200).json({ msg: "Student already exists..." });
    }

    const newStd = new Student({ name, roll, programme, courses });
    const savedStd = await newStd.save();

    if (savedStd) {
        return res.status(200).json({ data: newStd })
    }
    else {
        return res.status(500).json({ msg: "Couldn't save student details" })
    }
})


router.put('/', async (req, res) => {
    const { name, roll, programme, courses } = req.body;

    if (!name || !roll || !programme) {
        return res.status(400).send("Something is missing");
    }

    const existStd = await Student.findOne({ roll });
    if (!existStd) {
        return res.status(500).json({ msg: "Student doesn't exist..." });
    }

    const std = await Student.findByIdAndUpdate(existStd.id, { name, roll, programme, courses }, { new: true })

    if (std) {
        return res.status(200).json({ data: std })
    }
    else {
        return res.status(500).json({ msg: "Couldn't update student details" })
    }
})


router.delete('/:roll', async (req, res) => {
    try {
        const roll = (req.params.roll)
        const result = await Student.findOneAndDelete({ roll })
        
        if (result) {
            res.status(200).json({ msg: "Delete Successfull" })
        }
        else {
            res.status(500).json({ msg: "Couldn't delete student" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong..." })
    }
})

module.exports = router