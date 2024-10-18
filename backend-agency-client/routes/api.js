const express = require('express');
const router = express.Router();
const {
    createAgencyAndClient,
    updateClient,
    getTopClients,
} = require('../controllers/agencyController');

// Create an agency and client in a single request
router.post('/agencies', createAgencyAndClient);

// Update client details
router.put('/clients/:id', updateClient);

// Get agency name with client details having maximum total bill
router.get('/agencies/top-clients', getTopClients);

module.exports = router;
