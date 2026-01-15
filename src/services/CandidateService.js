const { Candidate, User } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

class CandidateService {
    static async createCandidate(data) {
        // Generate ID: cand2026-001-0001
        const year = moment().format('YYYY');
        const societeCode = '001';
        const prefix = `cand${year}-${societeCode}-`;

        // Find last candidate with this prefix
        const lastCandidate = await Candidate.findOne({
            where: {
                candidate_code: { [Op.like]: `${prefix}%` }
            },
            order: [['candidate_code', 'DESC']]
        });

        let sequence = 1;
        if (lastCandidate && lastCandidate.candidate_code) {
            const lastCode = lastCandidate.candidate_code;
            const parts = lastCode.split('-');
            if (parts.length === 3) {
                const seqPart = parts[2];
                sequence = parseInt(seqPart, 10) + 1;
            }
        }

        const newCode = `${prefix}${String(sequence).padStart(4, '0')}`;

        return await Candidate.create({
            ...data,
            candidate_code: newCode,
            created_at: new Date()
        });
    }

    static async getAllCandidates() {
        return await Candidate.findAll({
            include: [
                { model: User, attributes: ['id', 'name'] }
            ]
        });
    }

    static async getCandidateById(id) {
        return await Candidate.findByPk(id, {
            include: [
                { model: User, attributes: ['id', 'name'] },
                {
                    model: CandidatePayment,
                    include: ['CandidatePaymentType', 'Account']
                }
            ]
        });
    }

    static async updateCandidate(id, data) {
        const candidate = await Candidate.findByPk(id);
        if (!candidate) return null;
        return await candidate.update(data);
    }

    static async deleteCandidate(id) {
        const candidate = await Candidate.findByPk(id);
        if (!candidate) return null;
        return await candidate.destroy();
    }
}

module.exports = CandidateService;
