// Create web server using Express
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { getComments, addComment, updateComment, deleteComment } = require('./model/comments');

// Use body-parser to parse request body as JSON
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// GET /comments
app.get('/comments', (req, res) => {
    const comments = getComments();
    res.json(comments);
});

// POST /comments
app.post('/comments', [
    check('author', 'Author is required').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    const comment = addComment(req.body);
    res.json(comment);
});

// PUT /comments/:id
app.put('/comments/:id', [
    check('author', 'Author is required').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    const comment = updateComment(req.params.id, req.body);
    res.json(comment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const comment = deleteComment(req.params.id);
    res.json(comment);
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
