const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const config = require('config')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.routes')
const companiesRoutes = require('./routes/companies.routes')
const dealsRoutes = require('./routes/deals.routes')
const driversRoutes = require('./routes/drivers.routes')
const forwardersRoutes = require('./routes/forwarders.routes')
const employeesRoutes = require('./routes/employees.routes')
const testRoutes = require('./routes/test.routes')

mongoose.connect(config.get('mongoUri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize()) // инициализируем модуль паспорт
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
app.use('/api/companies', companiesRoutes)
app.use('/api/deals', dealsRoutes)
app.use('/api/drivers', driversRoutes)
app.use('/api/forwarders', forwardersRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api/test', testRoutes)

module.exports = app


