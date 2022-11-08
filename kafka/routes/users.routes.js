const express = require('express');
const users = require('../controllers/users.controllers');
const router = express.Router();

router.post('/', users.create);
router.get('/', users.find);
router.get('/:id',users.findById)
router.patch('/:id',users.patch),
router.delete('/',users.remove),
router.delete('/:id',users.removeById)


module.exports = router