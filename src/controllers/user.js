const User = require('../proxy').User

exports.list = (req, res) => {
    User.getUsers()
        .then(users => {
            res.send(users)
        })
}

exports.add = (req, res) => {
    const user = {
        name: 'joe',
        password: '123',
    }

    User.add(user)
        .then(() => {
            res.sendStatus(200)
        })
}

exports.update = (req, res) => {
    const userId = req.params.id
    const user = {
        name: 'joe',
        password: '456',
    }
    User.update(userId, user)
        .then(() => {
            res.sendStatus(200)
        })
}
exports.remove = (req, res) => {
    const userId = req.params.id
    User.remove(userId)
        .then(() => {
            res.sendStatus(200)
        })
}
exports.show = (req, res) => {
    const userId = req.params.id
    User.getUser(userId)
        .then(user => {
            res.send(user)
        })
}
exports.sigin = (req, res) => {
    User.getUserByName(req.body.name)
        .then(user => {
            if (user) {
                return User.compare(user._id, req.body.password)
                    .then(same => {
                        if (same) {
                            req.session.user = user
                            res.redirect('/')
                        }
                        else {
                            res.sendStatus(401)
                        }
                    })
                    .catch(err => {
                        console.log('-sigin', err)
                        res.sendStatus(500)
                    })
            }
            else {
                res.sendStatus(401)
            }
        })

}
exports.sigout = (req, res) => {
    delete req.session.user
    res.redirect('/')
}
