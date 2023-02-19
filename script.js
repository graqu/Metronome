const tempoInfo = document.querySelector('.tempo-info')
const tempoSlider = document.querySelector('#tempo')
const blink = document.querySelector('.metronome__blink')
const tempoBtns = document.querySelectorAll('.tempo-btn')
const soundBtns = document.querySelectorAll('.sound-btn')
const tapTempoBtn = document.querySelector('.tap-tempo')

let audio = new Audio('./media/hihat.wav')
let audio1 = new Audio('./media/hihat1.wav')

let tempo = 1000
let bpm
let count = 0
let timeSignature = 4

let lastClickTime = 0

const handleSlider = () => {
	tempo = parseInt(1000 / (tempoSlider.value / 60))
	console.log(tempo)
	tempoInfo.textContent = tempoSlider.value
	bpm !== undefined ? runMetronome() : {}
}

const runBeat = () => {
	audio.pause()
	audio.currentTime = 0
	audio1.pause()
	audio1.currentTime = 0

	if (count % timeSignature === 0) {
		audio1.play()
		console.log('pu')
	} else {
		audio.play()
		console.log('ka')
	}
	count++
}
const runMetronome = () => {
	clearInterval(bpm)
	bpm = setInterval(runBeat, tempo)
}
const handleKeyboard = e => {
	if (e.key === ' ') {
		clearInterval(bpm)
	} else if (e.key === 'T' || e.key === 't') {
		tapTempoBtn.click()
	}
}
const changeTempo = e => {
	timeSignature = parseInt(e.target.getAttribute('data-signature'))
	console.log(timeSignature)
}
const changeSound = e => {
	const sound = e.target.getAttribute('data-voice')
	switch (sound) {
		case 'dog':
			audio = new Audio('./media/bark.wav')
			audio1 = new Audio('./media/bark_one.wav')
			break
		case 'plates':
			audio = new Audio('./media/hihat.wav')
			audio1 = new Audio('./media/hihat1.wav')
			break
		case 'toms':
			audio = new Audio('./media/kick.wav')
			audio1 = new Audio('./media/tom.wav')
			break
		default:
			console.log('nic')
			break
	}
}
const tapTempo = e => {
	const clickTime = e.timeStamp - lastClickTime

	lastClickTime = e.timeStamp

	clearInterval(bpm)

	if (!audio.paused) {
		audio.pause()
		audio.currentTime = 0
		audio1.pause()
		audio1.currentTime = 0
	}

	audio.play()
	setTimeout(() => {
		audio.pause()
		audio.currentTime = 0
	}, 100)

	if (clickTime <= 1200 && clickTime >= 214) {
		tempo = clickTime
		tempoInfo.textContent = parseInt(60000 / clickTime)
		tempoSlider.value = parseInt(60000 / clickTime)
	} else if (clickTime <= 214) {
		console.log('za szybko')
		tempo = 214
		tempoInfo.textContent = 280
		tempoSlider.value = 280
	} else {
		console.log('za wolno')
		tempo = 1200
		tempoInfo.textContent = 50
		tempoSlider.value = 50
	}

	bpm !== undefined ? runMetronome() : {}
}

blink.addEventListener('click', runMetronome)
tempoSlider.addEventListener('input', handleSlider)
window.addEventListener('keydown', handleKeyboard)
tempoBtns.forEach(btn => btn.addEventListener('click', changeTempo))
soundBtns.forEach(btn => btn.addEventListener('click', changeSound))
tapTempoBtn.addEventListener('click', tapTempo)
