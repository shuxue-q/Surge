// 获取请求头中的 rpid
const rpid = $request.headers.rpid || $request.headers.Rpid;
if (rpid && (rpid.includes("1000002") || rpid.includes("1000019"))) {
    $done({ url: "http://0.0.0.0/" });
} else {
    $done({});
}
