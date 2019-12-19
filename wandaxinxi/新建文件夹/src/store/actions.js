
// export async function getUserList(xxx) {
// let value=await axios({
//     url:'',
//     method:'get',
//     params:{type:2}
// }).then(res=>res.data)
//     return value;
// }
export async function getUserList(xx) {
    console.log(xx,'888888')
    return await  new Promise((resolve, reject) =>{
        axios({
            url:'api/template/getAllForm',
            method: 'get',
            params: {type:2}
        }).then(res=>{
            if(res){
                resolve(res.data)
            }
        }).catch(err=>{
            reject(err)
        })
    } )

}


