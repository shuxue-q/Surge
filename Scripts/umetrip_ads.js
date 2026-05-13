const rpid = $request.headers.rpid || $request.headers.Rpid;

if (rpid && (rpid.includes("1000002") || rpid.includes("1000019"))) {
    // 兼容 Surge、Loon、QX 的写法
    // 1. 如果在 Surge 环境，推荐直接返回空数据，而不是玩 404 状态码
    if (typeof $httpClient !== "undefined") {
        // Surge 环境：直接清空响应体，让 APP 拿到一个空的 JSON 从而不渲染酒店
        $done({ body: JSON.stringify({ obj: null, code: 200, msg: "success" }) });
    } else {
        // Loon / QX 环境：保持原作者的强力 404 拦截
        $done({ status: "HTTP/1.1 404 Not Found", body: "" });
    }
} else {
    // 放行其他正常请求
    $done({});
}
