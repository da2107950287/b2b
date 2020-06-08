import { post , appFunc } from './commonAPI.js';

class RequestStorage{
    /**
     * 
     * @param {String} name 保存的Storage名称
     * @param {String} link 请求的地址
     * @param {String} type 保存到local 或者 session
     * @param {Array} data 请求所需要的参数
     */
    constructor(name,link,type,data){
        this.name = name;
        this.link = link;
        this.type = type;
        this.data = data;
    };
    post(callback){
        post(this.link,this.data).then((res)=> {
            callback(res);
        });
    };
    storage(callback){
        if(this.type == 'local'){
            let dom = localStorage.getItem(this.name);
            // console.log(dom);
            if(!appFunc.prototype.isEmpty(dom)){
                dom = JSON.parse(dom);
                callback(dom)
            }else{
                this.post((res)=>{
                    if(res.code == 0){
                        localStorage.setItem(this.name,JSON.stringify(res));
                    }
                    callback(res)
                });
            }
        }else if(this.type == 'session'){
            let dom = sessionStorage.getItem(this.name);
            if(!appFunc.prototype.isEmpty(dom)){
                dom = JSON.parse(dom);
                callback(dom)
            }else{
                this.post((res)=>{
                    if(res.code == 0){
                        sessionStorage.setItem(this.name,JSON.stringify(res));
                    }
                    callback(res)
                });
            }
        }
    };
    getData(callback){
        this.storage((res)=>{
            callback(res);
        })
    }
}
export function cacheStorage(name,link,type,data,callback) {
    let request = new RequestStorage(name,link,type,data);
    request.getData((res)=>{
        callback(res);
    })
};
