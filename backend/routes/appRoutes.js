const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.redirect('/login')
});

router.get('/login', (req,res) => {
    res.send('my login')
})

router.post('/login', (req,res) => {
    res.send('my login post')
});

router.get('/signup', (req,res) => {
    res.send('my signup')
});

router.post('/signup', (req,res) => {
    res.send('my signup post')
});

module.exports = router;