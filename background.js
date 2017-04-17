
(async function () {
    // const inoreaderUrl = "https://www.inoreader.com/m/";
    const inoreaderUrl = "https://www.inoreader.com/";

    const ffVersion = /Firefox\/(.+?)$/.exec(navigator.userAgent) ? RegExp.$1 : '53.0';
    const mobileUA = `Mozilla/5.0 (Android 7.1; Mobile; rv:${ffVersion}) Gecko/${ffVersion} Firefox/${ffVersion}`;

    const sidebarUrl = await browser.sidebarAction.getPanel({});

    browser.webRequest.onBeforeSendHeaders.addListener(function (details) {
        if (details.tabId !== -1 || details.originUrl !== sidebarUrl) {
            return;
        }

        return {
            requestHeaders: details.requestHeaders.map(header => {
                if (header.name.toLowerCase() === "user-agent") {
                    return Object.assign({}, header, { value: mobileUA });
                } else {
                    return header;
                }
            })
        };
    }, {urls: [inoreaderUrl]}, ["blocking", "requestHeaders"]);
})();
