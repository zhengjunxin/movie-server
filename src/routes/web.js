const express = require('express')

const user = require('../controllers/user')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: '首页',
        user: req.session.user,
    })
})
router.get('/sigin', (req, res) => {
    res.render('sigin')
})

module.exports = router