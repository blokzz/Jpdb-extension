async function fetchWord(word) {
  try {
    const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${word}`);
    if (!response.ok) {
      throw new Error('Błąd podczas pobierania danych z Jisho API.');
    }
    const json = await response.json();
    return json.data; 
  } catch (error) {
    console.error('Wystąpił błąd:', error);
    return null; 
  }
}
chrome.runtime.onConnect.addListener((port) => {
port.onMessage.addListener(async (message) => {
  if (message.action === 'myAction') {
    console.log(message.data);
    const dataFromContentScript = message.data;

    try {
   
      const entry = await fetchWord(dataFromContentScript);

      if (entry) {
        console.log('Otrzymano wiadomość od content script:', entry);
        const response1 =  entry[0].jlpt[0];
        const response2 =  entry[0].is_common;
        const response = [];
        response.push(response1)
        response.push(response2)
        port.postMessage({ response });
      } else {
        console.log('Wystąpił błąd podczas pobierania danych.');
        const response =  null;
        port.postMessage({ response });
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      const response =  null;
      port.postMessage({ response });
    }
  }
})});