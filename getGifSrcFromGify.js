async function getGifSrcFromGify(gifName, gifyCropResquestUrl) {
    const gifyResponse = await fetch(gifyCropResquestUrl + gifName, { mode: 'cors' });
    const gifSource = await gifyResponse.json().data.images.origin.url;
    return gifSource;
}

export default getGifSrcFromGify;