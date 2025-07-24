const videoPlayer = document.getElementById('video-player');
const videoElement = document.getElementById('video-element');
const btnExit = document.getElementById('btn-exit');

let hlsInstance = null;

// Mostrar reproductor y reproducir stream
function playStream(url) {
    // Limpiar instancia anterior de HLS si existe
    if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
    }

    // Reproducir usando HLS.js si es compatible
    if (Hls.isSupported()) {
        hlsInstance = new Hls();
        hlsInstance.loadSource(url);
        hlsInstance.attachMedia(videoElement);
        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            videoPlayer.classList.add('show');
            videoElement.play();
        });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = url;
        videoPlayer.classList.add('show');
        videoElement.play();
    } else {
        alert('Este dispositivo no puede reproducir este tipo de stream.');
    }
}

// Ocultar reproductor
if (btnExit) {
    btnExit.addEventListener('click', () => {
        videoElement.pause();
        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }
        videoPlayer.classList.remove('show');
    });
}

// Salir con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoPlayer.classList.contains('show')) {
        videoElement.pause();
        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }
        videoPlayer.classList.remove('show');
    }
});
