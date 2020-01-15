const express = require('express')


const router = express.Router()

router.use(express.json());

router.get('/', (req, res) => {
    Posts
        .find()
        .then(post => res.status(200).json(post))
        .catch(error => {
            console.log('GET all Posts', error)
            res.status(500).json({ message: 'Server was unable to retreive Posts' })
        })
})

router.get('/:id', (req, res) => {
    Posts
        .findById(req.params.id)
        .then(post => {
            if (!post.length > 0) {
                res.status(404).json({ message: 'Unable to find Post' })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            console.log('GET Posts by ID', error)
            res.status(500).json({ message: 'Server was unable to retreive Post' })
        })
})

router.get('/:id/comments', (req, res) => {
    Posts
        .findPostComments(req.params.id)
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: 'Unable to find Post' })
            } else {
                res.status(200).json(comment)
            }
        })
        .catch(error => {
            console.log('GET Comments by Post ID', error)
            res.status(500).json({ message: 'Server was unable to retreive Comments' })
        })
})

router.post('/', (req, res) => {
    const { title, contents } = req.body

    if (!title || !contents) {
        res.status(400).json({ message: 'Please add a Title and Content' })
    } else {
        Posts
            .insert(req.body)
            .then(newPost => res.status(201).json(newPost))
            .catch(error => {
                console.log('POST new Post', error)
                res.status(500).json({ message: 'Server was unable to create new Post' })
            })
    }
})

router.post('/:id/comments', (req, res) => {
    const { text } = req.body

    Posts
        .findById(req.params.id)
        .then(post => {
            if (!post.length > 0) {
                res.status(404).json({ message: 'Unable to find Post' })
            } else if (!text) {
                res.status(400).json({ message: 'Please add a comment' })
            } else {
                Posts
                    .insertComment({post_id: req.params.id, text})
                    .then(newComment => res.status(201).json(newComment))
                    .catch(error => {
                        console.log('Post new Comment', error)
                        res.status(500).json({ message: 'Server was unable to create new Comment' })
                    })
            }
        })
        .catch(error => {
            console.log('GET Posts by ID', error)
            res.status(500).json({ message: 'Server was unable to retreive Post for comments' })
        })
})

router.delete('/:id', (req, res) => {
    Posts
        .findById(req.params.id)
        .then(post => {
            if (!post.length > 0) {
                res.status(404).json({ message: 'Unable to find Post' })
            } else {
                Posts.remove(req.params.id).then(() => res.status(200).json({ message: 'Post was deleted' }))
            }
        })
        .catch(error => {
            console.log('DELETE Posts by ID', error)
            res.status(500).json({ message: 'Server was unable to delete Post' })
        })
})

router.put('/:id', (req, res) => {
    const { title, contents } = req.body
    Posts
        .findById(req.params.id)
        .then(post => {
            if (!post.length > 0) {
                res.status(404).json({ message: 'Unable to find Post' })
            } else if (!title || !contents) {
                res.status(400).json({ message: 'Please add a new title or new content' })
            } else {
                Posts
                    .update(req.params.id, req.body)
                    .then(updatePost => res.status(201).json(updatePost))
                    .catch(error => {
                        console.log('PUT post', error)
                        res.status(500).json({ message: 'Server was unable to update Post' });
                    })
            }
        })
        .catch(error => {
            console.log('GET Posts by ID', error)
            res.status(500).json({ message: 'Server was unable to retreive Post for Update' });
        })
})

module.exports = router;