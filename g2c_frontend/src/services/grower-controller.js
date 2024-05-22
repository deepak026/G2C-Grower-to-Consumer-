import { publicAxios, baseURL, privateAxios } from "./axios-config";

function doTokenValidation() {
  return privateAxios.get("/grower/tokenValidation1");
}

function doSaveSignUpInfo(fd) {
  return privateAxios.post("/user/saveSignUpInfo", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
function doAuthLoginInfo(fd) {
  return privateAxios.post("/user/authLoginInfo", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

function doGetGrowerInfo(g_email) {
  return privateAxios.get(`/grower/growerInfo?email=${g_email}`);
}

function doUpdateGrowerProfile(fd) {
  return privateAxios.post("/grower/updateGrowerProfile", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
function doListNewProducts(fd) {
  return privateAxios.post("/grower/listNewProducts", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

function doFetchListedProducts(email) {
  return privateAxios.get(`grower/fetchProducts?email=${email}`);
}

function doUpdateProduct(newData) {
  return privateAxios.post("/grower/updateProduct", newData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function doDeleteProduct(email, productId) {
  return privateAxios.get(
    `/grower/deleteProduct?email=${email}&productId=${productId}`
  );
}
export {
  doTokenValidation,
  doFetchListedProducts,
  doAuthLoginInfo,
  doGetGrowerInfo,
  doListNewProducts,
  doUpdateProduct,
  doDeleteProduct,
  doSaveSignUpInfo,
  doUpdateGrowerProfile
};
