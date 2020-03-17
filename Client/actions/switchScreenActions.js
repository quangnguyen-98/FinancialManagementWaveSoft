const  login = ()=>{
    return{
        type:'LOGIN',
        nameScreen:'login'
    }
}
const  admin =  ()=>{
    return{
        type:'ADMIN',
        nameScreen:'admin'
    }
}
const  managers = ()=>{
    return{
        type:'MANAGERS',
        nameScreen:'managers'
    }
}

const  users = ()=>{
    return{
        type:'USERS',
        nameScreen:'users'
    }
}

export default {
    login,
    admin,
    managers,
    users
}