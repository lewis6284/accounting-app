const { Receipt, Account } = require('../models');

exports.getAllReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.findAll({
            include: [
                { model: Account, attributes: ['name'] }
            ],
            order: [['date', 'DESC']]
        });
        res.json(receipts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching receipts' });
    }
};
