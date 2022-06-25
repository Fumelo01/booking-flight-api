const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController.js');
const error = require('../controllers/errController.js')


router.get('/', controller.example)
router.get('/book', controller.allFlights)
router.post('/book', controller.bookFlight)
router.get('/book/:id', controller.ticket)
router.patch('/book/:id', controller.editTicket)
router.delete('/book/:id', controller.delTicket)

router.post('/book/:id', error.postId)
router.patch('/book', error.patchñId)
router.delete('/book', error.delñId)



module.exports = router;

