const express = require('express')
const router = express.Router()
const controller = require('../controllers/stats.controllers')

// /api/stats
router.get('/', controller.getStatsOfManager)
router.get('/generalstats', controller.getGeneralStats)

module.exports = router