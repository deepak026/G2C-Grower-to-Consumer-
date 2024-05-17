var jwt= require("jsonwebtoken");

function doTokenValidation1(req, resp, next) {
   // resp.set("json");
  console.log("*********************");
  const full_token = req.headers["authorization"]; //keyword
//   console.log(full_token);
  var ary = full_token.split(" ");
  let actualToken = ary[1];
   console.log("--------------------------");
  var isTokenValid;
  try {
    isTokenValid = jwt.verify(actualToken, process.env.SEC_KEY);
   // console.log(isTokenValid);
    const obj = jwt.decode(ary[1]);
    console.log(obj);
    console.log("--------------------------");
    next();
    // resp.json({ status: true, message: "**Aauthorized", item: obj });
  } catch (err) {
    resp.json({ status: false, message: "Token Expired" });
    return;
  }
}
module.exports = { doTokenValidation1 };
