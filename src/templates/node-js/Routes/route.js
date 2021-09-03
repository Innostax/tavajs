const express = require('express');
const <%= defaultRoute %> = require('../Controllers/<%= defaultRoute %>.controllers');
const router = express.Router();

router.post('/', <%= defaultRoute %>.create);
router.get('/', <%= defaultRoute %>.find);
router.get('/:id',<%= defaultRoute %>.findById)
router.patch('/:id',<%= defaultRoute %>.patch),
router.delete('/',<%= defaultRoute %>.remove),
router.delete('/:id',<%= defaultRoute %>.removeById)


module.exports = router