const {Router} = require('express')
const router = Router()
const Test = require('../models/Test')
const {check, validationResult} = require('express-validator')


let deals = [
    {
        id: 1,
        date: '09.09.2020',
        client: 'ПМК Дорема',
        responsibility: {
            managerId: '1',
            managerName: 'Артём Соловьёв',
            head: 'Егор Сумкин'
        },
        dealStatus: {
            approved: false,
            providerPaid: false,
            delivered: false,
            clientPaid: false,
            docSigned: false,
            docCollected: false,
        },
        docsFiles: {
            clientInvoices: [
                {id: 'ci_1', company: 'Demir', fileUrl: '', sum: 100000},
                {id: 'ci_2', company: 'Demir', fileUrl: '', sum: 150000}
            ],
            sumClientInvoices: 250000,
            providerInvoices: [
                {id: 'pi_1', company: 'MC', fileUrl: '', sum: 90000},
                {id: 'pi_2', company: 'Dipos', fileUrl: '', sum: 120000},
                {id: 'pi_3', company: 'Akti', fileUrl: '', sum: 5000}
            ],
            sumProviderInvoices: 215000,
            allDocs: [
                {id: 'ad_1', company: 'MC', fileUrl: '', sum: 90000},
                {id: 'ad_2', company: 'Dipos', fileUrl: '', sum: 118000},
                {id: 'ad_3', company: 'Akti', fileUrl: '', sum: 5000}
            ],
            delta: 20000
        },
        deliver: {
            drivers: [
                {driverName: 'Рома МАЗ', sum: 10000},
                {driverName: 'Юсуп Рабаданов', sum: 5700},
                {driverName: 'Никита Борейко', sum: 9000}
            ],
            forwarders: [
                {forwarderName: 'Рома МАЗ', sum: 1000},
                {forwarderName: 'Ярослав Бойченко', sum: 2700},
                {forwarderName: 'Марк Борисов (К)', sum: 1000}
            ]
        },
        commentManager: 'Доставка через 2 дня. Клиент хочет вернуть трубу 50х50 и заказать новую, но доплатит позже',
        commentHead: 'Везем в понедельник'
    },
    {
        id: 2,
        date: '12.09.2020',
        client: 'АЭС',
        responsibility: {
            managerId: '2',
            managerName: 'Тёма Рыбаков',
            head: 'Егор Сумкин'
        },
        dealStatus: {
            approved: false,
            providerPaid: false,
            delivered: false,
            clientPaid: false,
            docSigned: false,
            docCollected: false,
        },
        docsFiles: {
            clientInvoices: [
                {id: 'ci_1', company: 'AST', fileUrl: '', sum: 35000},
                {id: 'ci_2', company: 'Demir', fileUrl: '', sum: 30000}
            ],
            sumClientInvoices: 250000,
            providerInvoices: [
                {id: 'pi_1', company: 'MC', fileUrl: '', sum: 32000},
                {id: 'pi_2', company: 'Brok', fileUrl: '', sum: 10000}
            ],
            sumProviderInvoices: 215000,
            allDocs: [
                {id: 'ad_1', company: 'MC', fileUrl: '', sum: 31000},
                {id: 'ad_2', company: 'Brok', fileUrl: '', sum: 9500}
            ],
            delta: 20000
        },
        deliver: {
            drivers: [
                {driverName: 'Юсуп Рабаданов', sum: 5700}
            ],
            forwarders: [
                {forwarderName: 'Юсуп Рабаданов', sum: 1000},
                {forwarderName: 'Ярослав Бойченко', sum: 1300}
            ]
        },
        commentManager: '',
        commentHead: ''
    }
]
// /api/deals/getDeals
router.get(
    '/',
    async (req,res) => {
    try {
        res.json(deals)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова'})
    }
})
router.post(
    '/addTest',
    [
        check('name', 'Короткое имя, минимум 6 символов')
            .isLength({min: 6}),
        check('sum', 'введите цифры').isNumeric
    ],
    async (req,res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            })
        }

        const {name, sum} = req.body
        console.log('Получили данные')
        const candidate = await Test.findOne({name: name})

        if (name) {
            return res.status(400).json({ message: 'Такое имя уже есть!'})
        }

        const test = new Test ({ name, sum })

        await test.save()
        res.status(201).json({message: 'добавлено'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова'})
    }
})

module.exports = router
