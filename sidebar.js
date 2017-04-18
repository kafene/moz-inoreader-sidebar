
document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.createElement("iframe");
    iframe.sandbox = "allow-popups allow-forms allow-scripts allow-same-origin";
    iframe.src = "https://www.inoreader.com/";
    document.body.appendChild(iframe);
});
