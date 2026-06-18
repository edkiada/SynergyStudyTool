const router = require('express').Router()
const usersControllers = require('../controllers/users')

router.post('/', usersControllers.createUser)
router.get('/', usersControllers.getAllUser)

module.exports = router