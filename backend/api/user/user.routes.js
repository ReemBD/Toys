const express = require('express')
const { getUser, getUsers, updateUser, deleteUser } = require('./user.controller')
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id',updateUser)
router.delete('/:id',  /* requireAuth, requireAdmin, */ deleteUser)

module.exports = router

