import { location , post , is_wexin , appFunc } from './commonAPI.js';
import {getLocation} from './wxjs.js'
class Localtion{
    /**
     * 
     */
    constructor(){
    };
    post(link,data,callback){
        post(link,data).then((res)=> {
            if(res.code === 0){
                callback(res);
            }
        });
    };
    localtion(callback){
        if(is_wexin()){
            //获取用户当前地理位置
            let _this = this;
            getLocation({},_this);
        }

        let wapres = localStorage.getItem('wapres');
        let wCityInfo = localStorage.getItem('cityInfo');
        if(appFunc.prototype.isEmpty(wapres)){
            location().then(res=>{
                //===============================显示默认定位地址=================================
                let address = res;
                let city = address.address.city;
                let lastIndex = city.length - 1;
                let cityInfo = city.charAt(lastIndex) == "市" ? city.slice(0, lastIndex) : city;
                this.location = cityInfo

                localStorage.setItem('bdPoint',JSON.stringify(res.point));
                //==============================================================================
                this.post('/?a=syncLocation',{
                    city: city,
                    x:res.point.lng,
                    y:res.point.lat
                },(res)=>{
                    switch(res.code){
                        case 0:
                            let City = res.data.region_name;
                            let LastIndex = City.length - 1;
                            let cityInfo = City.charAt(LastIndex) == "市" ? City.slice(0, LastIndex) : City;
                            
                            let data = {
                                location : cityInfo,
                                region : res.data.region_id,
                            }
                            callback(data)
                            localStorage.setItem('wapres',res.data.region_id)
                            localStorage.setItem('cityInfo',cityInfo)
                            break;
                        default:
                            break;
                    }
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            //====>接收地址栏信息
            let data = {
                location : wCityInfo,
                region : wapres,
            }
            callback(data)
        }
    };
    init(callback){
        this.localtion((res)=>{
            callback(res);
        })
    };
}

export function position(callback) {
    let request = new Localtion();
    request.init((res)=>{
        callback(res);
    })
};