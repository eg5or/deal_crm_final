const ADD_DEAL = 'ADD_DEAL';
const ADD_FILE_TO_CLIENT_INVOICES = 'ADD_FILE_TO_CLIENT_INVOICES';
const ADD_FILE_TO_PROVIDER_INVOICES = 'ADD_FILE_TO_PROVIDER_INVOICES';
const ADD_FILE_TO_ALL_DOCS = 'ADD_FILE_TO_ALL_DOCS';
const TOGGLE_APPROVED = 'TOGGLE_APPROVED';
const TOGGLE_PROVIDER_PAID = 'TOGGLE_PROVIDER_PAID';
const TOGGLE_DELIVERED = 'TOGGLE_DELIVERED';
const TOGGLE_CLIENT_PAID = 'TOGGLE_CLIENT_PAID';
const TOGGLE_DOC_SIGNED = 'TOGGLE_DOC_SIGNED';
const TOGGLE_DOC_COLLECTED = 'TOGGLE_DOC_COLLECTED';
const ADD_DRIVER = 'ADD_DRIVER';
const ADD_FORWARDER = 'ADD_FORWARDER';
const EDIT_MANAGER_COMMENT = 'EDIT_MANAGER_COMMENT';
const EDIT_HEAD_COMMENT = 'EDIT_HEAD_COMMENT';



let initialState = {
    deals: [
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
        },
    ],
    newDeal: {
        id: '',
        date: '',
        client: '',
        responsibility: {
            managerId: '',
            managerName: '',
            head: ''
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
            clientInvoices: {id: 'ci_1', company: 'AST', fileUrl: '', sum: 35000},
            sumClientInvoices: 250000,
            providerInvoices: {id: 'pi_1', company: 'MC', fileUrl: '', sum: 32000},
            sumProviderInvoices: 215000,
            allDocs: {id: 'ad_1', company: 'MC', fileUrl: '', sum: 31000},
            delta: 20000
        },
        deliver: {
            drivers: {driverName: 'Юсуп Рабаданов', sum: 5700},
            forwarders: {forwarderName: 'Юсуп Рабаданов', sum: 1000}
        },
        commentManager: '',
        commentHead: ''
    }
}

const dealsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const addDealAC = () => ({type: ADD_DEAL});
export const addFileToClientInvoicesAC = () => ({type: ADD_FILE_TO_CLIENT_INVOICES});
export const addFileToProviderInvoicesAC = () => ({type: ADD_FILE_TO_PROVIDER_INVOICES});
export const addFileToAllDocsAC = () => ({type: ADD_FILE_TO_ALL_DOCS});
export const toggleApprovedAC = () => ({type: TOGGLE_APPROVED});
export const toggleProviderPaidAC = () => ({type: TOGGLE_PROVIDER_PAID});
export const toggleDeliveredAC = () => ({type: TOGGLE_DELIVERED});
export const toggleClientPaidAC = () => ({type: TOGGLE_CLIENT_PAID});
export const toggleDocSignedAC = () => ({type: TOGGLE_DOC_SIGNED});
export const toggleDocCollectedAC = () => ({type: TOGGLE_DOC_COLLECTED});
export const addDriverAC = () => ({type: ADD_DRIVER});
export const addForwarderAC = () => ({type: ADD_FORWARDER});
export const editManagerCommentAC = () => ({type: EDIT_MANAGER_COMMENT});
export const editHeadCommentAC = () => ({type: EDIT_HEAD_COMMENT});


export default dealsReducer;