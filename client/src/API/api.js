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

export const companiesAPI = {
    getAllCompanies() {
        return instance.get(`companies`).then(response => response.data)
    },
    addNewCompany(type, name, manager) {
        return instance.post(`companies/add`, {type: type, name: name, manager: manager})
    },
    updateCompany(id, type, name, manager) {
        return instance.patch(`companies/${id}`, {type: type, name: name, manager: manager})
    },
    deleteCompany(id) {
        return instance.delete(`companies/${id}`)
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

export const managersAPI = {
    getAllManagers() {
        return instance.get(`managers`).then(response => response.data)
    },
    addNewManager(name, head, tel) {
        return instance.post(`managers/add`, {name: name, head: head, tel: tel})
    },
    updateManager(id, name, head, tel) {
        return instance.patch(`managers/${id}`, {name: name, head: head, tel: tel})
    },
    deleteManager(id) {
        return instance.delete(`managers/${id}`)
    }
}