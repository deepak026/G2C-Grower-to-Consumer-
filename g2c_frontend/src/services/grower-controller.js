import { publicAxios, baseURL, privateAxios } from "./axios-config";

function doTokenValidation() {
  return privateAxios.get("/grower/tokenValidation1");
}

function doAuthLoginInfo(fd) {
  return privateAxios.post("/user/authLoginInfo", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

function doGetGrowerInfo(g_email) {
  return privateAxios.get(`/grower/growerInfo?email=${g_email}`);
}

function doListNewProducts(fd) {
  return privateAxios.post("/grower/listNewProducts", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

function doFetchListedProducts(email) {
  return privateAxios.get(`grower/fetchProducts?email=${email}`);
}

export {
  doTokenValidation,
  doFetchListedProducts,
  doAuthLoginInfo,
  doGetGrowerInfo,
  doListNewProducts,
};
