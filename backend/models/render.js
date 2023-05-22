const axios = require('axios');

exports.homeRoutes=(req,res)=>{
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('index', { users :response.data });
    } )

    .catch(err =>{
        res.send(err);
    })
}

exports.addStaffDispatchDetails=(req,res)=>{
    res.render('addStaffDispatchDetails');
}
exports.updateStaffDD=(req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{DispatchId:req.query.DispatchId}})
    .then(function(userdata){
        res.render("updateStaffDD",{user:userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}
