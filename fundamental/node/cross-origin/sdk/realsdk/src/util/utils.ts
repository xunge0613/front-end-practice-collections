
const utils = {
    getUrlValue: function (s: string) {
        if (s.search(/#/) > 0) {
            s = s.slice(0, s.search(/#/));
        }
        const r = {};
        if (s.search(/\?/) < 0) {
            return r;
        }
        const p = s.slice(s.search(/\?/) + 1).split('&');
        for (let i = 0, j = p.length; i < j; i++) {
            const tmp = p[i].split('=');
            r[tmp[0]] = tmp[1];
        }
        return r;
    }
}

export default utils;