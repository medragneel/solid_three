class Kit {
    constructor() {
        this.pads = document.querySelectorAll('.box')
        this.kickAudio = document.querySelector('.kick-sound')
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound')
        this.playBtn = document.querySelector('.play')
        this.muteBtns = document.querySelectorAll('.mute')
        this.selects = document.querySelectorAll('select')
        this.idx = 0
        this.tempo = document.querySelector('#tempo')
        this.bpm = 150
        this.isPlay = null

    }
    activePad() {
        this.classList.toggle('active')
    }
    repeat() {
        const step = this.idx % 8
        const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
            bar.style.animation = `animateTrack 0.3s alternate ease-in-out 2`
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0
                    this.kickAudio.play()

                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0
                    this.snareAudio.play()

                }

                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0
                    this.hihatAudio.play()
                }
            }

        });
        this.idx++
    }
    start() {
        let interval = (60 / this.bpm) * 1000
        if (!this.isPlay) {
            this.isPlay = setInterval(() => {
                this.repeat()
            }, interval);

        } else {
            clearInterval(this.isPlay)

            this.isPlay = null
        }
        console.log(this.isPlay)
    }

    select(e) {
        const { name, value } = e.target
        switch (name) {
            case "kick-select":
                this.kickAudio.src = value
                break;
            case "snare-select":
                this.snareAudio.src = value
                break;
            case "hihat-select":
                this.hihatAudio.src = value
                break;

            default:
                break;
        }

    }
    mute(e) {
        
        const muteIndex = e.target.dataset.track
        e.target.classList.toggle('muted')
        if (e.target.classList.contains('muted')) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0
                    break;
                case "1":
                    this.snareAudio.volume = 0
                    break;
                case "2":
                    this.hihatAudio.volume = 0
                    break;
                case "undefined":
                    alert('null')
                    break;
                default:
                    break;

            }

        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1
                    break;
                case "1":
                    this.snareAudio.volume = 1
                    break;
                case "2":
                    this.hihatAudio.volume = 1
                    break;

                default:
                    break;
            }


        }
    }

    changeTempo(e) {
        const { value } = e.target
        this.bpm = parseInt(value)

    }


}

const kit = new Kit()

kit.pads.forEach(pad => {
    pad.addEventListener('click', kit.activePad)
    pad.addEventListener('animationend', () => {
        pad.style.animation = ""
    })

});
kit.playBtn.addEventListener('click', e => {
    kit.start()
    if (!kit.isPlay) {
        kit.playBtn.innerHTML = 'Play'
    } else {
        kit.playBtn.innerHTML = 'Stop'
    }

})

kit.selects.forEach(s => {
    s.addEventListener('click', e => {
        kit.select(e)
    })
})


kit.muteBtns.forEach(mbtn => {
    mbtn.addEventListener('click', e => {
        kit.mute(e)
    })

})

kit.tempo.addEventListener('input', e => {
    kit.changeTempo(e)
})

