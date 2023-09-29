const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware/AuthMiddleware')

const { Posts, Likes } = require('../models')

// GET route handler
router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    res.json(listOfPosts)
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id)
    res.json(post)
})

//this router recieves all the posts done by the specific user and then it forwards to the profile jsx page where all his posts are being displayed! 
router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ where: { UserId: id } })
    res.json(listOfPosts)
})

router.post('/', validateToken, async (req, res) => {

    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post)

    res.json(post)

})

//router to change title

router.put('/title', validateToken, async (req, res) => {

    const { newTitle, id } = req.body;

    await Posts.update({title: newTitle}, {where:{id:id}})

    res.json(newTitle)

})
//router to change description of post

router.put('/postText', validateToken, async (req, res) => {


    const { newText, id } = req.body;

    await Posts.update({ description: newText }, { where: { id: id } })

    res.json(newText)

})

router.delete('/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId
    await Posts.destroy({
        where: {
            id: postId
        }
    })
    res.json('Post Deleted')

})



module.exports = router;
