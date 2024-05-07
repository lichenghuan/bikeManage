
const c1 = new window.cloud.Cloud({
  identityless: true,
  resourceAppid: "wx681708f2148572cf",
  resourceEnv: "cloud1-5gadhcpyecc20c29",
});
c1.init();

console.log('request,request');


const request = () => {
  //初始化
  return c1;
};

export default request;
