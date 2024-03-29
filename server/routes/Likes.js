const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { validateToken
} = require('../middleware/AuthMiddleware')




router.post('/', validateToken, async (req, res) => {
    const { PostId } = req.body
    const UserId = req.user.id

    const found = await Likes.findOne({
        where: {
            PostId: PostId, UserId: UserId
        }
    }) // checking if a same field exist 
    if (!found) {
        await Likes.create({
            PostId: PostId,
            UserId: UserId
        })

        return res.json({liked: true})

    } //if no like found means same post id and user id is found so then do this

    else {
        await Likes.destroy({
            where: {
                PostId: PostId, UserId: UserId
            }
        })
        return res.json({ liked: false })
    }

    
})

















module.exports = router