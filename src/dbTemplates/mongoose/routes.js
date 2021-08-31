const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const <%= defaultRoute %> = mongoose.model('<%= defaultRoute %>');

router.get('/', (req, res) => {
    res.render("<%= defaultRoute %>/addOrEdit", {
        viewTitle: "Insert <%= defaultRoute %>"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    <%= defaultRoute %>.save((err, doc) => {
        if (!err)
            res.redirect('<%= defaultRoute %>/list');
        else {
            if (err.name == 'ValidationError') {
                res.render("<%= defaultRoute %>/addOrEdit", {
                    viewTitle: "Insert <%= defaultRoute %>",
                    <%= defaultRoute %>: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    <%= defaultRoute %>.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('<%= defaultRoute %>/list'); }
        else {
            if (err.name == 'ValidationError') {
                res.render("<%= defaultRoute %>/addOrEdit", {
                    viewTitle: 'Update <%= defaultRoute %>',
                    <%= defaultRoute %>: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("<%= defaultRoute %>/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving <%= defaultRoute %> list :' + err);
        }
    });
});


router.get('/:id', (req, res) => {
    <%= defaultRoute %>.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("<%= defaultRoute %>/addOrEdit", {
                viewTitle: "Update <%= defaultRoute %>",
                <%= defaultRoute %>: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    <%= defaultRoute %>.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/<%= defaultRoute %>/list');
        }
        else { console.log('Error in <%= defaultRoute %> delete :' + err); }
    });
});

module.exports = router;