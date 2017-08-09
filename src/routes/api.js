const express = require('express')

const user = require('../controllers/user')

const router = express.Router()

router.get('/users', user.list)
router.post('/users', user.add)
router.post('/users/:id', user.update)
router.delete('/users/:id', user.remove)
router.get('/users/:id', user.show)

router.post('/sigin', user.sigin)
router.post('/sigout', user.sigout)

module.exports = router
