const Deal = require('../models/Deal')
const errorHandler = require('../utils/errorHandler')

module.exports.getStatsOfManager = async function (req, res) {
    try {
        const id = req.query.id
        const year = +req.query.year
        const month = +req.query.month
        let dateStart = ''
        let dateEnd = ''
        const monthStat = async (ds, de) => {
            await Deal.find({
                date: {'$gte': ds, '$lte': de},
                responsibility: id,
                "dealStatus.dealDone": true
            }, '-_id -dealStatus -clientInvoices -providerInvoices -allDocs -drivers -forwarders' +
                ' -taxes -gifts -address -commentManager -commentHead -dealNumber -client -responsibility -__v', function (error, result) {
                const sumDelta = result.reduce((s, i) => s = s + Number(i.delta), 0)
                const sumDeltaWD = result.reduce((s, i) => s = s + Number(i.deltaWD), 0)
                const countDeal = result.length
                const maxDelta = result.reduce((prev, current) => prev.delta > current.delta ? prev : current, {})
                result.sort((prev, next) => {
                    if (prev.date < next.date) return -1;
                    if (prev.date < next.date) return 1;
                });
                res.status(200).json({
                    statsData: result,
                    sumDelta: sumDelta,
                    sumDeltaWD: sumDeltaWD,
                    countDeal: countDeal,
                    maxDelta: (Object.keys(maxDelta).length === 0 ? {delta: 0, deltaWD: 0} : maxDelta),
                })
            })
        }
        const yearStat = async (year) => {
            const ds = new Date('01.01.' + year).toISOString()
            const de = new Date('01.01.' + (year + 1)).toISOString()
            let data = []
            let countDeals = 0
            await Deal.find({
                date: {'$gte': ds, '$lte': de},
                responsibility: id,
                "dealStatus.dealDone": true
            }, '-_id -dealStatus -clientInvoices -providerInvoices -allDocs -drivers -forwarders' +
                ' -taxes -gifts -address -commentManager -commentHead -dealNumber -client -responsibility -__v', function (error, result) {
                const monthDelta = (month, year) => {
                    const delta = result.reduce((s, i) => {
                        if (new Date(i.date) > new Date(month + '.01.' + year) && new Date(i.date) < new Date((month + 1) + '.01.' + year)) {
                            s = s + Number(i.delta)
                        }
                        return s
                    }, 0)
                    const deltaWD = result.reduce((s, i) => {
                        if (new Date(i.date) > new Date(month + '.01.' + year) && new Date(i.date) < new Date((month + 1) + '.01.' + year)) {
                            s = s + Number(i.deltaWD)
                        }
                        return s
                    }, 0)
                    let monthRU = ''
                    switch (month) {
                        case 1:
                            monthRU = 'Январь'
                            break
                        case 2:
                            monthRU = 'Февраль'
                            break
                        case 3:
                            monthRU = 'Март'
                            break
                        case 4:
                            monthRU = 'Апрель'
                            break
                        case 5:
                            monthRU = 'Май'
                            break
                        case 6:
                            monthRU = 'Июнь'
                            break
                        case 7:
                            monthRU = 'Июль'
                            break
                        case 8:
                            monthRU = 'Август'
                            break
                        case 9:
                            monthRU = 'Сентябрь'
                            break
                        case 10:
                            monthRU = 'Октябрь'
                            break
                        case 11:
                            monthRU = 'Ноябрь'
                            break
                        case 12:
                            monthRU = 'Декабрь'
                            break
                        default:
                            break
                    }
                    return {delta, deltaWD, date: monthRU}
                }
                data.push(monthDelta(1, year))
                data.push(monthDelta(2, year))
                data.push(monthDelta(3, year))
                data.push(monthDelta(4, year))
                data.push(monthDelta(5, year))
                data.push(monthDelta(6, year))
                data.push(monthDelta(7, year))
                data.push(monthDelta(8, year))
                data.push(monthDelta(9, year))
                data.push(monthDelta(10, year))
                data.push(monthDelta(11, year))
                data.push(monthDelta(12, year))
                countDeals = result.length
            })
            return {data, countDeals}
        }
        switch (month) {
            case 0:
                dateStart = new Date('01.01.' + year).toISOString()
                dateEnd = new Date('01.01.' + (year + 1)).toISOString()
                const statsData = await yearStat(year)
                const sumDelta = statsData.data.reduce((s, i) => s = s + Number(i.delta), 0)
                const sumDeltaWD = statsData.data.reduce((s, i) => s = s + Number(i.deltaWD), 0)
                const maxDelta = statsData.data.reduce((prev, current) => prev.delta > current.delta ? prev : current, {})
                res.status(200).json({
                    statsData: statsData.data,
                    sumDelta: sumDelta,
                    sumDeltaWD: sumDeltaWD,
                    countDeal: statsData.countDeals,
                    maxDelta: (Object.keys(maxDelta).length === 0 ? {delta: 0, deltaWD: 0} : maxDelta),
                })
                break
            case 1:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 2:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 3:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 4:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 5:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 6:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 7:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 8:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 9:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 10:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 11:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            case 12:
                dateStart = new Date(month + '.01.' + year).toISOString()
                dateEnd = new Date((month + 1) + '.01.' + year).toISOString()
                await monthStat(dateStart, dateEnd)
                break
            default:
                break
        }

    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.getGeneralStats = async function (req, res) {
    try {
        const id = req.query.id
        await Deal.find({
            responsibility: id,
            "dealStatus.dealDone": true
        }, '-_id -dealStatus -providerInvoices -allDocs -drivers -forwarders' +
            ' -taxes -gifts -address -commentManager -commentHead -dealNumber -client -responsibility -__v', function (error, result) {
            const sumDelta = result.reduce((s, i) => s = s + Number(i.delta), 0)
            const sumDeltaWD = result.reduce((s, i) => s = s + Number(i.deltaWD), 0)
            const countDeal = result.length
            const maxDelta = result.reduce((prev, current) => prev.delta > current.delta ? prev : current, {})
            result.sort((prev, next) => {
                if (prev.date < next.date) return -1;
                if (prev.date < next.date) return 1;
            });
            const clientInvoicesArray = []
            result.map(i => i.clientInvoices.map(i => clientInvoicesArray.push(i)))
            const sumAllClientInvoicesBN = clientInvoicesArray.reduce((s, i) => {
                if (i.bill === 'bn') {
                    s = s + Number(i.sum)
                }
                return s
            }, 0)
            const sumAllClientInvoicesNN = clientInvoicesArray.reduce((s, i) => {
                if (i.bill === 'nn') {
                    s = s + Number(i.sum)
                }
                return s
            }, 0)
            res.status(200).json({
                sumAllClientInvoicesBN: +sumAllClientInvoicesBN.toFixed(2),
                sumAllClientInvoicesNN: +sumAllClientInvoicesNN.toFixed(2),
                sumAllClientInvoices: +(sumAllClientInvoicesBN + sumAllClientInvoicesNN).toFixed(2),
                sumDelta: +sumDelta.toFixed(2),
                sumDeltaWD: +sumDeltaWD.toFixed(2),
                countDeal: countDeal,
                maxDelta: (Object.keys(maxDelta).length === 0 ? {delta: 0, deltaWD: 0} : maxDelta),
            })
        })
    } catch (e) {
        // Обработать ошибку
        errorHandler(res, e)
    }
}