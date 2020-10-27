import * as axios from 'axios';

const instance = axios.create({
    /*baseURL: 'http://92.63.100.121:5000/api/',*/
    /*baseURL: 'http://92.63.100.121:5002/api/',*/
    baseURL: 'http://localhost:5000/api/',
});

export const uploadAPI = {
    saveFile(file, id, company, sum, type) {
        const formData = new FormData()
        formData.append('filedata', file)
        return instance.post(`deals/upload?id=${id}&company=${company}&sum=${sum}&type=${type}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    deleteFile(id, file, type) {
        return instance.delete(`deals/delete?id=${id}&file=${file}&type=${type}`)
    },
}

export const authAPI = {
    registerToCRM(email, password) {
        return instance.post(`auth/register`, {email: email, password: password})
    },

    loginToCRM(email, password) {
        return instance.post(`auth/login`, {email: email, password: password})
    },

    me(id, token) {
        return instance.post(`auth/me`, {id}, {
            headers: {
                'Authorization': token
            }
        })
    },

    changePassword(id, newPassword) {
        return instance.post(`auth/changepwd`, {id, newPassword})
    },

    authorized(id) {
        return instance.get(`auth/authorized/${id}`).then(response => response.data)
    }
}

export const clientsAPI = {
    getAllClients() {
        return instance.get(`clients`).then(response => response.data)
    },
    getAllClientsNames() {
        return instance.get(`clients/names`).then(response => response.data)
    },
    addNewClient(type, name, manager) {
        return instance.post(`clients/add`, {type: type, name: name, manager: manager})
    },
    updateClient(id, type, name, manager) {
        return instance.patch(`clients/${id}`, {type: type, name: name, manager: manager})
    },
    deleteClient(id) {
        return instance.delete(`clients/${id}`)
    }
}

export const dealsAPI = {
    getAllDeals(token, page) {
        return instance.get(`deals?page=${page}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getAllDealsDone(token, page) {
        return instance.get(`deals/done?page=${page}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getOneDeal(id, token) {
        return instance.get(`deals/${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getAllManagerDeals(id, token, page) {
        return instance.get(`deals/manager?id=${id}&page=${page}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    filterDealsByStatusManagers(id, filter, token, page) {
        const {status, bool} = filter
        return instance.get(`deals/filter?id=${id}&status=${status}&bool=${bool}&page=${page}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    filterDealsByStatusAllManagers(filter, token, page) {
        const {status, bool} = filter
        return instance.get(`deals/filterall?status=${status}&bool=${bool}&page=${page}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getCountManagersDealsNoDone(id, token) {
        return instance.get(`deals/nodonecount?id=${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getCountManagersDealsNoDelivered(id, token) {
        return instance.get(`deals/nodeliveredcount?id=${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    addNewDeal(date, client, id) {
        return instance.post(`deals/add`, {date, client, id}).then(response => response.data)
    },
    addDriverToDeal(id, driverId, sum) {
        return instance.post(`deals/driver`, {id, driverId, sum})
    },
    addForwarderToDeal(id, forwarderId, sum) {
        return instance.post(`deals/forwarder`, {id, forwarderId, sum})
    },
    addGiftToDeal(id, name, comment, sum) {
        return instance.post(`deals/gift`, {id, name, comment, sum})
    },
    deleteDriverFromDeal(id, name, sum) {
        return instance.delete(`deals/driver?id=${id}&name=${name}&sum=${sum}`)
    },
    deleteForwarderFromDeal(id, name, sum) {
        return instance.delete(`deals/forwarder?id=${id}&name=${name}&sum=${sum}`)
    },
    deleteGiftFromDeal(id, name, sum) {
        return instance.delete(`deals/gift?id=${id}&name=${name}&sum=${sum}`)
    },
    editComment(id, type, text) {
        return instance.post(`deals/comment`, {id, type, text})
    },
    editAddress(id, text) {
        return instance.post(`deals/address`, {id, text})
    },
    updateDeltaWD(id, deltaWD) {
        return instance.post(`deals/deltawd`, {id, deltaWD})
    },
    updateDelta(id, delta) {
        return instance.post(`deals/delta`, {id, delta})
    },
    deleteDeal(id) {
        return instance.delete(`deals/${id}`)
    },
    toggleStatus(id, status) {
        return instance.post(`deals/status?id=${id}&status=${status}`).then(response => response.data)
    }
}

export const driversAPI = {
    getAllDrivers() {
        return instance.get(`drivers`).then(response => response.data)
    },
    addNewDriver(name, tel, auto) {
        return instance.post(`drivers/add`, {name: name, tel: tel, auto: auto})
    },
    updateDriver(id, name, tel, auto) {
        return instance.patch(`drivers/${id}`, {name: name, tel: tel, auto: auto})
    },
    deleteDriver(id) {
        return instance.delete(`drivers/${id}`)
    }
}

export const companiesAPI = {
    getAllCompanies() {
        return instance.get(`companies`).then(response => response.data)
    },
    addNewCompany(name, bill, tax) {
        return instance.post(`companies/add`, {name: name, bill: bill, tax: tax})
    },
    updateCompany(id, name, bill, tax) {
        return instance.patch(`companies/${id}`, {name: name, bill: bill, tax: tax})
    },
    deleteCompany(id) {
        return instance.delete(`companies/${id}`)
    }
}

export const forwardersAPI = {
    getAllForwarders() {
        return instance.get(`forwarders`).then(response => response.data)
    },
    addNewForwarder(name, tel) {
        return instance.post(`forwarders/add`, {name: name, tel: tel})
    },
    updateForwarder(id, name, tel) {
        return instance.patch(`forwarders/${id}`, {name: name, tel: tel})
    },
    deleteForwarder(id) {
        return instance.delete(`forwarders/${id}`)
    }
}

export const employeesAPI = {
    getAllEmployees() {
        return instance.get(`employees`).then(response => response.data)
    },
    getAllManagers() {
        return instance.get(`employees/managers`).then(response => response.data)
    },
    getEmployeeData(id) {
        return instance.get(`employees/${id}`).then(response => response.data)
    },
    addNewEmployee(position, name, head, location, tel, intel, birthday) {
        return instance.post(`employees/add`, {
            position: position,
            name: name,
            head: head,
            location: location,
            tel: tel,
            intel: intel,
            birthday: birthday
        })
    },
    updateEmployee(id, position, name, head, location, tel, intel, birthday) {
        return instance.patch(`employees/${id}`, {
            position: position,
            name: name,
            head: head,
            location: location,
            tel: tel,
            intel: intel,
            birthday: birthday
        })
    },
    deleteEmployee(id) {
        return instance.delete(`employees/${id}`)
    },
    changePosition(id) {
        return instance.patch(`employees/managermode?id=${id}`)
    }
}

export const clientInvoicesAPI = {
    getAllClientInvoicesForDeal(id) {
        return instance.get(`clientinvoices/deal/${id}`).then(response => response.data)
    },
    addNewClientInvoice(deal, company, sum) {
        return instance.post(`clientinvoices`, {
            deal: deal,
            company: company,
            sum: sum,
        })
    },
    deleteClientInvoice(id) {
        return instance.delete(`clientinvoices/${id}`)
    }
}

export const notificationsAPI = {
    getAllNotifications(id, page, token) {
        return instance.get(`notifications/all?id=${id}&page=${page}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getCountNoReadNotifications(id, token) {
        return instance.get(`notifications/countnoread?id=${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    readAllNotifications(id, token) {
        return instance.patch(`notifications/allread?id=${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getNotificationsForPopup(id, token) {
        return instance.get(`notifications/popup?id=${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    getNewNotifications(id, token) {
        return instance.get(`forwarders/new?id=${id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => response.data)
    },
    create(creator, recipients, deal, message, read, token) {
        return instance.post(`notifications`, {creator, recipients, deal, message, read})
    }
}
export const releasesAPI = {
    getAllReleases() {
        return instance.get(`releases/`).then(response => response.data)
    },
    getOneRelease(version) {
        return instance.get(`releases/last?version=${version}`).then(response => response.data)
    },
    createRelease(title, text, items, version, date) {
        return instance.post(`releases/add`, {title, text, items, version, date}).then(response => response.data)
    },
    deleteRelease(id) {
        return instance.delete(`releases/${id}`).then(response => response.data)
    },
}
export const statsAPI = {
    getStatsOfManager(id, year, month) {
        return instance.get(`stats?id=${id}&year=${year}&month=${month}`).then(response => response.data)
    },
    getGeneralStats(id) {
        return instance.get(`stats/generalstats?id=${id}`).then(response => response.data)
    },
}
