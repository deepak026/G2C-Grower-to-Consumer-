import {publicAxios, baseURL, privateAxios} from "./axios-config";

function doTokenValidation(){
   return privateAxios.get("/grower/tokenValidation1");
}

function doFetchListedProducts(email){
   return privateAxios.get(`grower/fetchProducts?email=${email}`);
}
export {doTokenValidation, doFetchListedProducts};