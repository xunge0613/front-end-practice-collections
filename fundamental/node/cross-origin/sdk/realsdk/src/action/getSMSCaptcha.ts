import createForm from '../util/createForm';

/** 
 * HUO
 * @param options {object}
 * @returns {ticket} string
 */

async function getSMSCaptcha(options: { iframeId: string, url?: string, params?: object, ahsAgent: string }) {
    console.log("hello check login")
    await createForm(
        "http://47.96.53.33:8080/user-sso/sso/check-login",
        {},
        "GET",
        options.iframeId,
        options.ahsAgent
    )
}

export default getSMSCaptcha;