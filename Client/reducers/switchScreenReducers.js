const switchScreenReducers =(state='login',action)=>{
    switch (action.type) {
        case 'LOGIN':
            return{
                screenName:'login'
            }
        case 'ADMIN':
            return {
                screenName: 'admin'
            }
        case 'MANAGERS':
            return{
                screenName:'managers'
            }
        case 'USERS':
            return {
                screenName: 'users'
            }

        default:
            return screen
    }
}
export default switchScreenReducers;