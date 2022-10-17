const express = require('express')
const <%= routeName %> = require(`../controllers/<%= routeName %>.controllers`)
const router = express.Router()

router.post('/', <%= routeName %>.create)
router.get('/', <%= routeName %>.find)
router.get('/:id', <%= routeName %>.findById)
router.patch('/:id', <%= routeName %>.patch),
router.delete('/', <%= routeName %>.remove),
router.delete('/:id', <%= routeName %>.removeById)

module.exports = router
