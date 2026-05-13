// 获取请求头中的 rpid
const rpid = $request.headers.rpid || $request.headers.Rpid;

if (rpid && (rpid.includes("1000002") || rpid.includes("1000019"))) {
    // 终极绝杀：重定向到无效 IP，触发底层网络断开 (Connection Refused)
    // APP 会将其当作“当前网络信号差，拉不到这个接口”，静默失败，彻底绕过解密和 Protobuf 检查
    $done({ url: "http://0.0.0.0/" });
} else {
    // 不是广告请求，正常放行
    $done({});
}
