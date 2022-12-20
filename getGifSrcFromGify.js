async function getGifSrcFromGify(gifName, gifyCropRequestUrl) {
    const gifyResponse = await fetch(gifyCropRequestUrl + gifName, { mode: 'cors' });
    const gifResponseData = await gifyResponse.json();
    const gifSource = await gifResponseData.data.images.original.url;
    return gifSource;
}

export default getGifSrcFromGify;