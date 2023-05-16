const express =require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require ('../controller/controller')

route.get('/',services.homeRoutes);
/**
 * @descrption Root Route
 */
route.get('/add-staff-dispatch-details',services.addStaffDispatchDetails)
/**
 * @descrption Add staff dispatch
 */
route.get('/updateStaffDD',services.updateStaffDD)
/**
 * @descrption update staff dispatch
 */
//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:DispatchId',controller.update);
route.delete('/api/users/:DispatchId',controller.delete);
module.exports =route