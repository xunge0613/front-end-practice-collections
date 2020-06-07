import utils from './utils';
import actions from '../action/index'
import { ICustomWindow } from '../interface/custom.window'


declare const window: ICustomWindow;

/**
 * 使用隐藏的 iframe 发送表单提交
 * options参数说明： 
 *  @param action {string} 当前请求名 TBD 改成枚举类型
 *  @param params {object} 请求参数
 *  @param blankUrl {string} 当前域下blank.html页面的url地址 
 *  @param formId {string} form表单ID，随意设置，唯一即可
 *  @param iframeId {string}  隐藏iframe 的id，随意设置，唯一即可
 *  @param success {Function}  表单提交成功后的回调函数，参数为返回的data数据
 *  @param error {Function}  表单提交失败后的回调函数
 */
class IframeSubmit {
    private action: string;
    private options: object;
    private params: object;
    private blankUrl: string;
    private iframeId: string;
    private ahsAgent: string;
    constructor(
        options: {
            action: string, params?: object, blankUrl?: string, iframeId?: string, ahsAgent: string,
            success?: (params?: any) => void, error?: (params?: any) => void
        }) {
        this.options = options;
        this.action = options.action;
        this.params = options.params || {};
        this.blankUrl = options.blankUrl || "about:blank;";
        this.iframeId = options.iframeId || 'hidden_iframe_' + options.action;
        this.ahsAgent = options.ahsAgent;
    }

    // 初始化入口
    public init = async () => {

        if (window.stopSSO) {
            // window.stopSSO == true 表示，当前页面是嵌套的子iframe，
            // 此时已获取到后端返回的数据，此时应禁止继续发送后续请求，以避免死循环
            return false;
        }

        const self = this;
        console.log(self.options)
        console.log(self.blankUrl)
        const urlParams: any = utils.getUrlValue(decodeURIComponent(location.href));
        console.log(urlParams.ssodata)
        // 创建隐藏 iframe

        // 如果 url 参数带着后端已取得的数据，代表是嵌套的 iframe
        // 标记 stopSSO ，️以阻止后续请求
        if (urlParams.ssodata) {
            window.stopSSO = true;
            return false;
        } else {
            // url 参数不带 ssodata，父页面，啥都不用做
            // 提交表单数据            
            self.initIframe();

            self.submit();

            // 监听并获取数据
            // console.log("iframe loaded")
            // const iframeNode: any = document.getElementById(self.iframeId);
            // iframe.style = "display:none;";
            const ssodata = await this.getSSOData()
            return ssodata;
        }
    }

    // 提交表单
    // 调用其他预置的 action，例如：check-login、password-login 等
    private submit() {
        // this.$form.attr('action', this.url).submit();
        console.log(this.params)
        switch (this.action) {
            case 'checkLogin':
                actions.checkLogin({
                    iframeId: this.iframeId,
                    ahsAgent: this.ahsAgent
                });
                break;
            default:
                break;
        }
    }

    // iframe 加载成功后的回调
    private async getSSOData() {
        // console.log("iframe loaded")
        const self = this;
        const iframeNode: any = document.getElementById(self.iframeId);
        if (iframeNode) {
            const promise = new Promise((resolve, reject) => {
                try {
                    iframeNode.onload = () => {
                        const res: any = utils.getUrlValue(decodeURIComponent(iframeNode.contentWindow.location.href));
                        if (res) {
                            if (res.ssodata) {
                                // ssodata 参数是和后端约定好的参数,用于避免第一次加载空白页时触发该操作
                                // self.success(res);
                                // 同时移除该 iframe
                                const parentNode = iframeNode.parentNode;
                                parentNode.removeChild(iframeNode);
                                resolve(res);
                            }
                            return false;
                        } else {
                            // self.error();
                            reject(false);
                            return false;
                        }
                    }
                    return false;

                } catch (err) {
                    // self.error(err);
                    return false;
                }
            })
            return await promise;
        } else {
            return false;
        }
    }


    // 创建并插入隐藏的iframe
    private initIframe() {

        const self = this;
        const iframe: HTMLIFrameElement = document.createElement('iframe');
        iframe.src = self.blankUrl;
        iframe.name = self.iframeId;
        iframe.id = self.iframeId;

        document.body.appendChild(iframe);
    }

}

export default IframeSubmit;