// 获取请求头中的 rpid
const rpid = $request.headers.rpid || $request.headers.Rpid;

// 检查是否包含广告对应的 rpid
if (rpid && (rpid.includes("1000002") || rpid.includes("1000019"))) {
    // 拦截请求，直接向 APP 返回 204 No Content
    // 这会告诉 APP 网络请求完成了，但没有数据。APP 不会去触发 Protobuf 解析，从而避免报错弹窗。
    $done({
        response: {
            status: 204,
            headers: {},
            body: ""
        }
    });
} else {
    // 不是广告请求，正常放行
    $done({});
}
