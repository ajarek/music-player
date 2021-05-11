const vocal = document.querySelector('.name')
const img = document.querySelector('.img')
const slider = document.querySelector('.bar')
const range = document.querySelector('.range')

let flag = false
let songIndex = 0

const songs = [{
        artist: 'Frank-Sinatra',
        title: 'Killing me softly',
        image: 'img/sinatra.jpg',
    },
    {
        artist: 'Louis-Armstrong',
        title: 'What a wonderful world',
        image: 'img/amstrong.jpg',
    },
    {
        artist: 'Ella-Fitzgerald',
        title: 'Summertime',
        image: 'img/Fitzgerald.jpg'
    },
    {
        artist: 'Vito-Bambino',
        title: 'Ale jazz',
        image: 'img/vito.jpg'
    }
]

const myAudio = new Audio();

let newPos = 0
myAudio.currentTime = 0

const loadSong = () => {
    myAudio.src = songs[songIndex].artist + '.mp3'
    vocal.innerHTML = `<h3>${songs[songIndex].artist}</h3><p>${songs[songIndex].title}`
    img.style.backgroundImage = `url('${songs[songIndex].image}')`

    range.addEventListener('click', (event) => {
        let longRange = event.offsetX
        slider.style.width = `${longRange/2.22}%`
        newPos = myAudio.duration * (longRange / 2.22) / 100;
        return newPos
    })
    myAudio.currentTime = newPos
}

window.onload = loadSong()

const forward = () => {
    if (songIndex > songs.length - 1) {
        songIndex = 0
        newPos = 0;
    } else {
        songIndex = songIndex + 1
        loadSong()
        img.classList.remove('active')
        newPos = 0
    }
}

const backward = () => {
    if (songIndex < 0) {
        songIndex = songs.length - 1
        newPos = 0
        console.log(newPos);
    } else {
        songIndex = songIndex - 1
        loadSong()
        img.classList.remove('active')
        newPos = 0
        console.log(newPos);
    }
}

const pause = () => {
    myAudio.pause()
    img.classList.remove('active')
    flag = true
}

const play = () => {
    if (flag === true) {
        myAudio.play()
        img.classList.add('active')
    } else {
        loadSong()
        myAudio.play()
        img.classList.add('active')
        flag = false
    }
}

const stop = () => {
    myAudio.pause()
    img.classList.remove('active')
    myAudio.currentTime = 0
}

const end = () => {
    newPos = 0;
    myAudio.pause;
    img.classList.remove('active')
}

document.querySelector('.fa-step-forward').addEventListener('click', forward)

document.querySelector('.fa-step-backward').addEventListener('click', backward)

document.querySelector('.fa-play-circle').addEventListener('click', play)

document.querySelector('.fa-stop-circle').addEventListener('click', stop)

document.querySelector('.fa-pause-circle').addEventListener('click', pause)

myAudio.addEventListener('ended', end)

const expandedList = document.querySelector('.expandedList')
const exite = () => expandedList.classList.remove('opa')
const opene = () => expandedList.classList.add('opa')

const list = document.querySelectorAll('li')
list.forEach((el, index) => {
    el.addEventListener('click', () => {
        songIndex = index
        loadSong()
        play()
    })
})

myAudio.addEventListener('timeupdate', (e) => {
    let timeAudio = myAudio.currentTime
    let timeAllAudio = myAudio.duration
    slider.style.width = `${timeAudio/timeAllAudio*100}%`
})