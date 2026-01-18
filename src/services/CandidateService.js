const { Candidate, User, CandidatePayment, CandidatePaymentType, Account, Agency } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

class CandidateService {
    static async createCandidate(data) {
        // Validate Agency Existence
        const agencyExists = await Agency.findByPk(data.agency_id);
        if (!agencyExists) {
            throw new Error(`Invalid Agency ID: ${data.agency_id}`);
        }

        // Generate ID: cand2026-001-0001
        const year = moment().format('YYYY');
        const societeCode = '001'; // This could be dynamic based on agency if needed
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
            // Check if parts length matches expected format (candYYYY, 001, 0001) -> 3 parts
            if (parts.length === 3) {
                const seqPart = parts[2];
                const parsedSeq = parseInt(seqPart, 10);
                if (!isNaN(parsedSeq)) {
                    sequence = parsedSeq + 1;
                }
            }
        }

        const newCode = `${prefix}${String(sequence).padStart(4, '0')}`;

        return await Candidate.create({
            ...data,
            candidate_code: newCode,
            created_at: new Date()
        });
    }

    static async getAllCandidates(agency_id) {
        const whereClause = agency_id ? { agency_id } : {};
        return await Candidate.findAll({
            where: whereClause,
            include: [
                { model: User, attributes: ['id', 'name'] },
                { model: Agency, attributes: ['id', 'name'] }
            ]
        });
    }

    static async getCandidateById(id) {
        return await Candidate.findByPk(id, {
            include: [
                { model: User, attributes: ['id', 'name'] },

                { model: Agency, attributes: ['id', 'name'] },
                {
                    model: CandidatePayment,
                    include: [
                        { model: CandidatePaymentType },
                        { model: Account }
                    ]
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
        // Business Rule: No permanent delete for financial/audit entities.
        const candidate = await Candidate.findByPk(id);
        if (!candidate) return null;
        // In this system, we might change status to 'CANCELLED' instead of destroying.
        return await candidate.update({ status: 'CANCELLED' });
    }
}

module.exports = CandidateService;
