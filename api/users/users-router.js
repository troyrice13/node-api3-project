const express = require('express');
const User = require('../users/users-model');
const Post = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: "User information could not be retrieved",
        err: err.message
      })
    })
});

router.get('/:id', validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const user = await User.getById(req.params.id)
      res.status(200).json(user)
    }
  catch (err) {
    res.status(500).json({
      message: "Problem finding user information",
      err: err.message
    })
  }

  })
  

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await User.insert(req.body)

    res.status(201).json(newUser)
  }
  catch (err) {
    res.status(500).json({
      message: "Problem posting new user"
    })
  }
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // User.findById(req.params.id)
  //   .then(user => {

  //     if(user) {
  //     return User.update(req.params.id, req.body)
  //     }
  //   })
  //   .then(data => {
  //     if (data) {
  //     return User.findById(req.params.id)
  //     }
  //   })
  //   .then(edit => {
  //     if (edit) {
  //     res.json(edit)
  //     }
  // })
  // .catch(err => {
  //     res.status(500).json({
  //         message: "The user information could not be modified",
  //         err: err.message,
  //         stack: err.stack
  //     })
  // })
})

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router
