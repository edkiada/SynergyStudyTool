const router = require('express').Router()
const usersControllers = require('../controllers/users')

router.post('/', usersControllers.createUser)

module.exports = router