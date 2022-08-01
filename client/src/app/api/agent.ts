import { BrandingWatermark } from "@mui/icons-material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
// to delay a response
const sleep = () => new Promise(resovle => setTimeout(resovle, 500));
// error handling at client interact with api response
axios.defaults.baseURL='http://localhost:5050/api/';
axios.defaults.withCredentials=true;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response =>{
    await sleep();
    return response
}, (error: AxiosError)=> {
    // destructur error interface
    const {data, status} : any = error.response!;
    switch(status){
        // validation error
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push('/server-error')
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})
// create a method for respons from api
const requests = {
    
   get: (url: string) => axios.get(url).then(responseBody),
   post: (url: string, body: {}) => axios.post(url).then(responseBody),
   put: (url: string, body: {}) => axios.get(url).then(responseBody),
   delete: (url: string) => axios.get(url).then(responseBody)
   
}
// response to our catalog
const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}
// error respons
const TestErrors = {
    get400Error: () => requests.get('bug/bad-request'),
    get401Error: () => requests.get('bug/unauthorised'),
    get404Error: () => requests.get('bug/not-found'),
    get500Error: () => requests.get('bug/server-error'),
    getValidationError: () => requests.get('bug/validation-error')
}
// create new object for basket
const Basket = {
    get:() => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;
