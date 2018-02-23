module.exports({
    order : {
        description: {type: String, required: true},
        users: {type: Number, required: true},
        driver: {type: Number},
        date: {type: String, required: true}
    },
    pastorder : {
        description: {type: String, required: true},
        users: {type: Number, required: true},
        driver: {type: Number },
        date: {type: Date, required: true},
        status: {type: String, required: true},
        finishdate: {type: Date}
    },
    users : {
        username : { type: String, required: true },
        password : { type: String, required: true },
        type : { type: String, required: true }
    },
    log : {
        decription : { type: String, required: true},
        data: { type: Date, required:true}
    }
});