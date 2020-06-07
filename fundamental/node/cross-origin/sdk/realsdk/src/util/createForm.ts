// import utils from './utils'

/**
 * 创建表单、填充数据
 * @param method {string} 请求 method
 * @param params {string} 请求 body
 * @param url {string} 请求 url (post请求若带query参数，直接拼在url后)
 */
function createForm(url: string, params: object, method: string, iframeId: string, ahsAgent: string) {

    console.log(url, params, method)

    // 创建一个 form
    const form1 = document.createElement("form");
    form1.id = "form1";
    form1.name = "form1";

    // 添加到 body 中
    document.body.appendChild(form1);

    // 填充 ahs-agent 以及 redirectUrl 

    // redirectUrl iframe 的回调地址
    const inputRedirectUrl = document.createElement("input");
    inputRedirectUrl.type = "hidden";
    inputRedirectUrl.name = "redirectUrl";
    inputRedirectUrl.value = location.href;
    form1.appendChild(inputRedirectUrl);

    // ahs-agent
    const inputAhsAgent = document.createElement("input");
    inputAhsAgent.type = "hidden";
    inputAhsAgent.name = "ahs-agent";
    inputAhsAgent.value = ahsAgent;

    // 将该输入框插入到 form 中
    form1.appendChild(inputAhsAgent);

    // form 的 target 指向 iframe
    form1.target = iframeId;

    // form 的提交方式
    form1.method = method;
    // form 提交路径
    form1.action = url;

    // 对该 form 执行提交
    form1.submit();
    // 删除该 form
    document.body.removeChild(form1);

}

export default createForm;