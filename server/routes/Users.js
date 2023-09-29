const express = require('express');
const router = express.Router();

const { Users } = require('../models')

const bcrypt = require('bcrypt');

const { sign } = require('jsonwebtoken');

const { validateToken } = require('../middleware/AuthMiddleware')


router.post('/', async (req, res) => {

    const { username, password } = req.body;
    await bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
    })

    res.json('Successfully created')

})

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } })

    if (!user) return res.json({ error: 'Error: User dosent exist' })

    bcrypt.compare(password, user.password).then((match) => {

        if (!match) {
            return res.json({ error: 'Wrong Username and Password Combination' })
        }
        else {
            const accessTokken =
                sign({ username: user.username, id: user.id }, "importantSecret")

            return res.json({ token: accessTokken, username: username, id: user.id })
        }
    })
})


router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)



})


router.get('/basicInfo/:id', async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id,
        { attributes: { exclude: ["password"] } })

    res.json(basicInfo)

})


router.put('/changePassword', validateToken, async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } })

    bcrypt.compare(oldPassword, user.password).then((match) => {

        if (!match) {
            return res.json({ error: 'Wrong Password Entered' })
        } else {
            bcrypt.hash(newPassword, 10).then((hash) => {
                Users.update({ password: hash },
                    {
                    where: { username: req.user.username }
                })
            })
        }
      // the first parameter of the sequelize update is the first one is the updation paramter and second is the where clause. 
    })

    res.json("password changed" )

})

module.exports = router;
