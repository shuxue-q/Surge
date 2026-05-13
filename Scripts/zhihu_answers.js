let body = $response.body;
try {
    let obj = JSON.parse(body);
    
    // 移除全局广告信息
    if (obj.ad_info) delete obj.ad_info;
    if (obj.data && obj.data.ad_info) delete obj.data.ad_info;
    if (obj.query_info) delete obj.query_info;
    
    // 过滤列表中的付费回答/广告回答
    if (Array.isArray(obj.data)) {
        obj.data = obj.data.filter(item => {
            let type = (item.target && item.target.answer_type) ? String(item.target.answer_type) : "";
            return !type.includes("paid");
        });
    }
    
    body = JSON.stringify(obj);
} catch (e) {
    console.log("知乎回答列表去广告脚本解析错误:", e);
}

$done({ body });
