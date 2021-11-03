const express = require('express')

const secondUser = require(`../Controllers/secondUser.controllers`)
const router = express.Router()

router.post('/', secondUser.create)
router.get('/', secondUser.find)
router.get('/:id', secondUser.findById)
router.patch('/:id', secondUser.patch),
	router.delete('/', secondUser.remove),
	router.delete('/:id', secondUser.removeById)

module.exports = router
