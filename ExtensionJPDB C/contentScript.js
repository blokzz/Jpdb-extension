const port = chrome.runtime.connect({ name: 'contentScript' });


port.onMessage.addListener((message) => {
  console.log('Otrzymano odpowiedź od background script:', message.response);
  if(message.response){
  switch (message.response[0]) {
    case 'jlpt-n5':
      wordElement.style.color = "darkgreen"
      break;
    case 'jlpt-n4':
      wordElement.style.color = "lightblue"
      break;
    case 'jlpt-n3':
      wordElement.style.color = "lightgreen"
      break;
    case 'jlpt-n2':
      wordElement.style.color = "orange"
      break;
    case 'jlpt-n1':
      wordElement.style.color = "rgb(204, 54, 54)"
      break;
    
  }
  message.response[1] === true ? wordElement.style.textDecoration = 'underline' : '';
}
});

const wordElement = document.querySelector('.plain');
if (wordElement) {
  const word = wordElement.textContent;
  const messageData = { action: 'myAction', data: word };
  

  port.postMessage(messageData);
} else {
  console.log('Element o klasie "plain" nie został znaleziony.');
}