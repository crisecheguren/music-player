const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const genre = document.getElementById("genre");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");


// Music
const songs = [
    {
        name: "bix",
        displayName: "Singin' The Blues",
        genre: "Lofi Hip Hop",
        artist: "Dingo Dog"
    },
    {
        name: "family",
        displayName: "Family",
        genre: "Lofi Hip Hop",
        artist: "Dingo Dog"
    },
    {
        name: "tmonk",
        displayName: "'Round Midnight",
        genre: "Lofi Hip Hop",
        artist: "Dingo Dog"
    },
    {
        name: "reality",
        displayName: "Reality",
        genre: "Lofi Hip Hop",
        artist: "Dingo Dog"
    }
];

// Check if playing
let isPlaying = false;

// song index
let songIndex = 0;


// Play or Pause
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
    }
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
    }

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}




// add song to the DOM
function loadSong(song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    genre.innerText = song.genre;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.png`;
}

loadSong(songs[songIndex]);

// Update Progress Bar and time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // update time
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    // set progress bar when paused
    if (!isPlaying) {
        progress.style.width = `${(clickX / width) * 100}%`;
    }

}



// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);

