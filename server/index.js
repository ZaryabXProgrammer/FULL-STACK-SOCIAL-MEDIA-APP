const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors())

const db = require('./models')



//Router

const postRouter = require('./routes/Posts')
app.use('/posts', postRouter)

const commentsRouter = require('./routes/Comments')
app.use('/comments', commentsRouter)

const usersRouter = require('./routes/Users')
app.use('/auth', usersRouter)

const likesRouter = require('./routes/Likes')
app.use('/likes', likesRouter)


db.sequelize.sync().then(() => {
    const port = 3003
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))


});






















