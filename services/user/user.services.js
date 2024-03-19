const user = require('../../models/user.model');

module.exports= class userServices{
    async adduser(body){
        return user.create(body);
    }

    async getuser(body){
        return user.findOne(body)
    }

    async updateuser(id,body){
        return user.findByIdAndUpdate(id,{$set:body},{new:true})
    }

    async getAllUsers(body){
        return user.find(body);
    }

    async deleteuseraccount (id){
        return user.findbyIdAndDelete(id);
    }
}
