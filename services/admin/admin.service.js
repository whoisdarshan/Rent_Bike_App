const admin = require('../../models/user.model');

module.exports= class adminServices{
    async addadmin(body){
        return admin.create(body);
    }

    async getadmin(body){
        return admin.findOne(body)
    }

    async getAllAdmins(body){
        return admin.find(body)
    }

    async updateadmin(id,body){
        return admin.findByIdAndUpdate(id,{$set:body},{new:true})
    }

    async deleteaccount (id){
        return admin.findbyIdAndDelete(id);
    }
}
