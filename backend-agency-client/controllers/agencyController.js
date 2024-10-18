const Agency = require('../models/agency');
const Client = require('../models/client');

const createAgencyAndClient = async (req, res) => {
    const { agencyData, clientData } = req.body;
    if (!agencyData || !clientData) {
        return res.status(400).send({ error: 'Both agencyData and clientData are required.' });
    }

    try {
        let agency = await Agency.findOne({ Name: agencyData.Name, PhoneNumber: agencyData.PhoneNumber });

        if (agency) {
            return res.status(400).send({ error: `Agency '${agency.Name}' already exists.` });
        }

        agency = new Agency(agencyData);
        await agency.save();

        const existingClient = await Client.findOne({ Email: clientData.Email, AgencyId: agency._id });
        clientData.AgencyId = agency._id;
        const client = new Client(clientData);
        await client.save();

        res.status(201).send({ agency, client });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Update client details
const updateClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findByIdAndUpdate(id, req.body, { new: true });
        if (!client) return res.status(404).send('Client not found.');

        res.send(client);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Get agency name with client Name having maximum total bill
const getTopClients = async (req, res) => {
    try {
        const clients = await Client.aggregate([
            { $group: { _id: '$AgencyId', topClient: { $max: '$TotalBill' }, clientName: { $first: '$Name' } } },
            { $lookup: { from: 'agencies', localField: '_id', foreignField: '_id', as: 'agency' } },
            { $unwind: '$agency' },
            { $project: { AgencyName: '$agency.Name', clientName: '$clientName', TotalBill: '$topClient' } }
        ]);

        res.send(clients);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = {
    createAgencyAndClient,
    updateClient,
    getTopClients,
};
