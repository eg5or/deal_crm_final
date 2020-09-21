import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/'
});

export const testAPI = {
    postTest(test) {
        return instance.post(`deals/addTest`, test)
    },
}

export const authAPI = {
    registerToCRM(email, password) {
        return instance.post(`auth/register`, {email: email, password: password})
    },

    loginToCRM(email, password) {
        return instance.post(`auth/login`, {email: email, password: password})
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