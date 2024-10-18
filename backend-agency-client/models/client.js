const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    AgencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',  // Reference to Agency model's _id field
        required: true
    },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    TotalBill: { type: Number, required: true },
});

module.exports = mongoose.model('Client', ClientSchema);
