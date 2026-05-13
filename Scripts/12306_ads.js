/**
 * 12306 去广告脚本 - Surge / Loon / QX 兼容版
 */
const url = $request.url;

// 1. 核心修复：将所有的 headers 键名转换为小写，兼容 Surge 的严格大小写保留机制
const header = {};
if ($request.headers) {
  for (let key in $request.headers) {
    header[key.toLowerCase()] = $request.headers[key];
  }
}

const contype = header["content-type"];
const headopt = header["operation-type"];

// 2. 核心修复：定义一个通用的“阻断并返回空数据”的方法
function dropRequest() {
  // 伪造一个 200 OK 的空 JSON 响应欺骗 App，防止 App 弹网络错误提示
  $done({ response: { status: 200, body: "{}" } }); 
}

if (url.includes("/mobile.12306.cn/otsmobile/app/mgs/")) {
  // 12306页面内容
  const list12306 = [
    "com.cars.otsmobile.integration.activityBanner", // 活动横幅
    "com.cars.otsmobile.memberInfo.getMemberQa",     // 铁路会员 常见问题
    "com.cars.otsmobile.newHomePage.initData",       // 热门资讯
    "com.cars.otsmobile.newHomePageBussData",        // 商品信息流 (酒店等广告)
    "com.cars.otsmobile.paySuccBuss.bussEntryShow"   // 商业推广
  ];
  if (list12306?.includes(headopt)) {
    dropRequest(); // 命中广告，阻断请求
  } else {
    $done({}); // 正常请求，放行
  }
} else if (url.includes("/mobilepaas.abchina.com.cn:441/mgw")) {
  // 中国农业银行开屏广告
  const listbankabc = [
    "com.bankabc.recommendcenter.homepage.gethpadverinfo",
    "com.abchina.mbank.common.homepage.getStartParam"
  ];
  if (listbankabc?.includes(headopt)) {
    dropRequest();
  } else {
    $done({});
  }
} else if (url.includes("/sec.sginput.qq.com/q")) {
  // 搜狗输入法候选项推广
  if (contype === "application/octet-stream") {
    dropRequest();
  } else {
    $done({});
  }
} else {
  $done({});
}
