class Timer {
    constructor() {
        this.timer = document.querySelector('.timer h1')
        this.playBtn = document.querySelector('.play')
        this.resetBtn = document.querySelector('.reset')
        this.modeSpan = document.querySelector('.mode')
        this.isPlay = null
        this.time = 10
        this.mode = "work"
    }
    formatTime() {
        const minutes = Math.floor(this.time / 60)
        const seconds = this.time % 60
        return `${minutes <= 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
    }
    start() {
        if (!this.isPlay) {
            console.log(this.time)
            this.isPlay = setInterval(() => {
                this.time--
                this.timer.innerHTML = this.formatTime(this.time) 
                if(this.time < 0){
                    console.log('negative')
                }

            }, 1000);
            console.log('start')
        } else {
            clearInterval(this.isPlay)
            this.isPlay = null
        }
    }
    reset() {
        clearInterval(this.isPlay)
        this.isPlay = null
        this.time = 1500
        this.playBtn.innerHTML = 'start'
        this.timer.innerHTML = this.formatTime(this.time)


    }
}


const timer = new Timer()
timer.playBtn.addEventListener('click', e => {
    timer.start()

    if (!timer.isPlay) {
        timer.playBtn.innerHTML = 'resume'
    } else {
        timer.playBtn.innerHTML = 'Stop'
    }


})


timer.resetBtn.addEventListener('click', e => {
    timer.reset()
})
