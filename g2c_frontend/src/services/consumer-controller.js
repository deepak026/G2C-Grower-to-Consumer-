import { publicAxios, privateAxios } from "./axios-config";

function doFindAllGrowerData(){
   return publicAxios.get('/consumer/findAllGrowerdata');
}
export {doFindAllGrowerData};