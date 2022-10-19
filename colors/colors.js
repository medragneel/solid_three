const colorsDiv = document.querySelectorAll('.color')
const range = document.querySelectorAll('input[type="range"]')
const generateNew = document.querySelector('.generate')
const hexH2 = document.querySelectorAll('.color h2')
const adjust = document.querySelectorAll('.adjust')
const close_adjust = document.querySelectorAll('.close-adjustement')
const copy_conatiner = document.querySelector('.copy-container')
const slider_conatiners = document.querySelectorAll('.sliders')
let intialColors

adjust.forEach((a,idx)=>{
    a.addEventListener('click',()=>{
        slider_conatiners[idx].classList.toggle('active')
    })
    
})

close_adjust.forEach((close,idx)=>{
    close.addEventListener('click',()=>{

        slider_conatiners[idx].classList.remove('active')

    })
})

const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
};


const hex = () => chroma(`#${Math.floor(Math.random() * 0xfffff).toString(16).padEnd(6, '0')}`)

const colorizer = (cclr, hue, sat, light) => {

    //saturation shit
    const noSat = cclr.set("hsl.s", 0)
    const withSat = cclr.set("hsl.s", 1)
    const sScale = chroma.scale([noSat, cclr, withSat])
    sat.style.backgroundImage = `linear-gradient(to right,${sScale(0)},${sScale(1)})`
    //lightness shit
    const ml = cclr.set('hsl.l', 0.5)
    const lScale = chroma.scale(['#000', ml, '#fff'])
    light.style.backgroundImage = `linear-gradient(to right,${lScale(0)},${lScale(0.5)},${lScale(1)})`

    //hue shit
    hue.style.backgroundImage = `
linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))
    `
}
const checkLum = (clr, txt) => {
    if (chroma(clr).luminance() > 0.5) {
        txt.style.color = '#333'
    } else {

        txt.style.color = '#f7f7f7'
    }
}


intialColors = []

range.forEach(r => {
    r.addEventListener('input', (e) => {
        const { hue, brightness, saturation } = r.dataset
        const idx = hue || brightness || saturation
        const slds = e.target.parentElement.querySelectorAll('input[type="range"]')
        const h_input = slds[0]
        const b_input = slds[1]
        const s_input = slds[2]
        const bg_clr = intialColors[idx]
        let clr = chroma(bg_clr)
            .set('hsl.s', s_input.value)
            .set('hsl.l', b_input.value)
            .set('hsl.h', h_input.value)
        colorsDiv[idx].style.background = clr.hex()


    })
})


colorsDiv.forEach((clr, idx) => {
    const color = hex()
    intialColors.push(color.hex())
    clr.style.backgroundColor = color
    hexH2[idx].innerHTML = color
    checkLum(color, hexH2[idx])
    const cclr = chroma(color)
    const slds = clr.querySelectorAll('.sliders input')
    const hue = slds[0]
    const light = slds[1]
    const sat = slds[2]
    colorizer(cclr, hue, sat, light)
    clr.addEventListener('change', () => {
        const aDiv = colorsDiv[idx]
        const clr = chroma(aDiv.style.backgroundColor)
        const txt = aDiv.querySelector('h2')
        const ics = aDiv.querySelectorAll('.controls button')
        txt.innerHTML = clr.hex()
        checkLum(clr, txt)
        for (ic of ics) {
            checkLum(clr, ic)
        }
    })


})

hexH2.forEach(h2 => {
    h2.addEventListener('click', (e) => {
        copy_conatiner.classList.add('active')
        setTimeout(() => {
            copy_conatiner.classList.remove('active')
        }, 1000)
        copyToClipboard(e.target.innerText)
    })
})

//update input values
const sliders = document.querySelectorAll('.sliders input[type="range"]')
sliders.forEach(s => {
    if (s.name = 'hue') {
        const hc = intialColors[parseInt(s.dataset.hue)]
        const hv = chroma(hc).get('hsl.h')
        s.value = Math.floor(hv * 100) / 100
    }
    if (s.name = 'saturation') {
        const sc = intialColors[parseInt(s.dataset.saturation)]
        const sv = chroma(sc).get('hsl.s')
        s.value = Math.floor(sv * 100) / 100
    }
    if (s.name = 'brightness') {
        const lc = intialColors[parseInt(s.dataset.brightness)]
        const lv = chroma(lc).get('hsl.l')
        s.value = Math.floor(lv * 100) / 100
    }
})

