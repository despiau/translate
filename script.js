const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

const outputDiv = document.getElementById('output');
const outputSpanishDiv = document.getElementById('outputSpanish');
const toggleButton = document.getElementById('toggleButton');

let isRecording = false;

toggleButton.addEventListener('click', function() {
  if (isRecording) {
    recognition.stop();
    toggleButton.classList.remove('recording');
    toggleButton.innerText = 'Let\'s talk! 🗣️';
  } else {
    recognition.start();
    toggleButton.classList.add('recording');
    toggleButton.innerText = 'Stop talking 🤫';
    outputDiv.innerHTML = '';
    outputSpanishDiv.innerHTML = '';
  }
  isRecording = !isRecording;
});

recognition.onresult = function(event) {
  const result = event.results[event.results.length - 1];
  if (result.isFinal) {
    const words = result[0].transcript.split(' ');
    for (const word of words) {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      outputDiv.appendChild(span);

      // Translate the word to Spanish using Google Cloud Translation API
      const apiKey = 'AIzaSyBK3-IDTV4F4PQYrCDo3Iu--65TDwlG6S4';
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${word}&source=en&target=es`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const translatedWord = data.data.translations[0].translatedText;
          const spanSpanish = document.createElement('span');
          spanSpanish.innerText = translatedWord + ' ';
          outputSpanishDiv.appendChild(spanSpanish);
        })
        .catch(error => console.error(error));
    }
  }
};

recognition.onerror = function(event) {
  console.error(event.error);
};

recognition.onend = function() {
  toggleButton.classList.remove('recording');
  toggleButton.innerText = 'Let\'s talk! 🗣️';
  isRecording = false;
};
