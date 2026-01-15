const { RevenueAutomatic, RevenueManual, Expense, Candidate } = require('../models');

class DashboardController {

    // Get aggregated stats for the dashboard
    async getStats(req, res) {
        try {
            // Calculate Total Revenue (Automatic + Manual)
            const revenueAutoSum = await RevenueAutomatic.sum('amount') || 0;
            const revenueManualSum = await RevenueManual.sum('amount') || 0;
            const totalRevenue = revenueAutoSum + revenueManualSum;

            // Calculate Total Expenses
            const totalExpenses = await Expense.sum('amount') || 0;

            // Calculate Total Candidates
            const totalCandidates = await Candidate.count();

            // Calculate Pending Approvals (Candidates with PENDING status)
            // You might want to expand this to include pending payments if needed later
            const pendingApprovals = await Candidate.count({
                where: { status: 'PENDING' }
            });

            return res.json({
                totalRevenue,
                totalExpenses,
                totalCandidates,
                pendingApprovals
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new DashboardController();
