async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}