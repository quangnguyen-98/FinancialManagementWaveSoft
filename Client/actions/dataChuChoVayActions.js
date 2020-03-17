const  update = (data,page)=>{
    return{
        type:'UPDATE',
        newData:data,
        page:page
    }
}


export default {
   update
}