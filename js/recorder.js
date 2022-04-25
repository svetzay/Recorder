const title = document.querySelector('.title');
const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const audioPlay = document.querySelector('.audio');
const timer = document.querySelector('.timer');

let typeOfMedia = {
    audio: true
};

let counter = 0;

// Function to record stream
let recordStream;
const recordFunction = async() => {
    try {
        const mediaDevices = await navigator.mediaDevices.getUserMedia(typeOfMedia)
        if (mediaDevices.active === true) {
            recordStream = new MediaRecorder(mediaDevices);
            recordStream.ondataavailable = e => {
                    chunks.push(e.data);
                    if (recordStream.state == 'inactive') {
                        let blob = new Blob(chunks);
                        createAudioElement(URL.createObjectURL(blob))
                    }
                }
            let chunks = []
            recordStream.start()
        }
    } catch (error) {
        if (error) console.log(error);
    }
    //console.log(recordFunction)
}

let linkStyles = "display: block; padding: 5px; color: white; text-decoration: none;"

// Function to create an audio element to playback and dowload recording
function createAudioElement(blobUrl) {
    const divEl = document.createElement('div');
    divEl.className = 'div-audio'
    const downloadEl = document.createElement('a');
    downloadEl.style = linkStyles;
    downloadEl.innerHTML = `Download-${counter = counter + 1}`;
    downloadEl.download = `Audio-${counter}.webm`;
    downloadEl.href = blobUrl;
    const audioEl = document.createElement('audio');
    audioEl.className = 'audio'
    audioEl.controls = true;
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    sourceEl.type = 'audio/webm';
    audioEl.appendChild(sourceEl);
    divEl.appendChild(audioEl)
    divEl.appendChild(downloadEl)
    document.body.appendChild(divEl);
    console.log(createAudioElement)
}

window.onload = function() {
    // Record click button
    record.onclick = e => {
        record.disabled = true;
        record.style.backgroundColor = '#86519C';
        record.classList.add('scale');
        stop.disabled = false;
        stop.style.background = '#51519A';
        stop.style.color = '#ffffff';
        title.style.color = '#50509A'
        recordFunction()
        clearInterval(swInterval);
        swIternal = setInterval(timerFunction, 1000);
    }

    // Stop record button
    stop.onclick = e => {
        record.disabled = false;
        record.style.backgroundColor = 'rgba(255, 245, 215, 0.1)';
        record.classList.remove('scale');
        stop.disabled = true;
        stop.style.backgroundColor = '#86519C';
        stop.style.color = 'white';
        title.style.color = 'white'
        clearInterval(swIternal);
        sec = 0;
        min = 0;
        recordStream.stop()
    }

    // Timer
    let swInterval;
    let displayTimer;
    let sec = 0;
    let min = 0;
    let timerFunction = () => {
    sec++
    if (sec <= 9) {
        sec = '0' + sec;
    }
    if (sec === 60) {
        sec = 0;
        min++
        if (min <= 9) {
            min = '0' + min;
        }
    }
    if (min === 60) {
        min = 0;
    }
    displayTimer = 'Minutes: ' + min + ' ' + 'Seconds: ' + sec;
    timer.innerHTML = displayTimer;
   };

}

