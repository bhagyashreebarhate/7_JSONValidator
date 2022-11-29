const Users = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const express = require('express')

const router = express.Router()

router.post('/register', async (req, res) => {
    const { FullName, Organization, email, password, userType } = req.body

    if (!email || !password || !userType || !FullName || !Organization)
        return res.status(400).json({ msg: 'Something missing' })

    const user = await Users.findOne({ email }) // finding user in db
    if (user) return res.status(400).json({ msg: 'User already exists' })
    // console.log(user);
    // console.log(user._id);

    const newUser = new Users({ FullName,Organization,email, password, userType })
    // hasing the password
    bcrypt.hash(password, 7, async (err, hash) => {
        if (err)
            return res.status(400).json({ msg: 'error while saving the password' })

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if (savedUserRes)
            return res.status(200).json({ msg: 'user is successfully saved' })
    })
})


router.post(`/login`, async (req, res) => {
    const { email, password} = req.body

    if (!email || !password) {
        res.status(400).json({ msg: 'Something missing' })
    }

    const user = await Users.findOne({ email: email }) // finding user in db
    if (!user) {
        return res.status(400).json({ msg: 'User not found' })
    }

    // // comparing the password with the saved hash-password
    // const matchuserType = (userType == user.userType)
    const matchPassword = await bcrypt.compare(password, user.password)
    if (matchPassword ) {
        const userSession = { email: user.email } // creating user session to keep user loggedin also on refresh
        req.session.user = userSession // attach user session to session object from express-session
        req.session.save();
        return res
            .status(200)
            .json({ msg: 'You have logged in successfully', usertype : user.userType, userSession }) // attach user session id to the response. It will be transfer in the cookies
    } else {
        return res.status(400).json({ msg: 'Invalid credential' })
    }
})


router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err)
                return res.status(500).send("Unable to Logout!");
            else
                return res.status(200).json({ "msg": "Logout Successfull..." });
        })
    }
})


router.get('/isAuth', async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user)
    } else {
        return res.status(401).json('unauthorize')
    }
})


module.exports = router
