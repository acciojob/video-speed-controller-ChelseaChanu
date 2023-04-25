const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

//your code
const video = document.getElementsByTagName("video")[0];
const playBtn = document.querySelector(".player__buttton");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const volumeCont = document.querySelector(".volume-container");
const volumeRange = document.querySelector('input[name="volume"]');
const volumeBtn = document.querySelector(".volume__buttton");
const speedCont = document.querySelector(".speed-container");
const playbackSpeed = document.querySelector('input[name="playbackSpeed"]');
const speedBtn = document.querySelector(".speed__buttton");
const skipButtons = document.querySelectorAll('[data-skip]');
const speedP = document.querySelector(".speed-bar");

video.addEventListener('mouseover', ()=>{
	playBtn.style.display = "block";
	progress.style.display = "block";
	progressBar.style.display = "block";
});

video.addEventListener('mouseout', ()=>{
	if(!playBtn.matches(':hover') && !video.paused){
		playBtn.style.display = "none";
		progress.style.display = "none";
		progressBar.style.display = "none";
	}
});

video.addEventListener("timeupdate",()=>{
	const completed = (video.currentTime/video.duration)*100;
	progressBar.style.width = `${completed}%`;
	progressBar.style.backgroundColor = "white";
});

playBtn.addEventListener("click",()=>{
	if(video.paused){
		video.play();
		playBtn.textContent = '❚❚';
	}
	else{
		video.pause();
		playBtn.textContent = '►';
	}
});

volumeCont.addEventListener("mouseover",()=>{
	volumeCont.style.backgroundColor = "hsl(0,0%,25%)";
	volumeRange.style.opacity = "1";
});

volumeCont.addEventListener("mouseout",()=>{
	volumeCont.style.backgroundColor = "transparent";
	volumeRange.style.opacity = "0";
});

volumeRange.addEventListener("mousemove",()=>{
	let x = volumeRange.value * 100;
	let color = `linear-gradient(90deg, white ${x}%, hsl(0,0%,70%) ${x}%)`;
	volumeRange.style.background = color;
})

volumeRange.addEventListener("change",(ev)=>{
	video.volume = ev.target.value;
	if(video.volume===0){
		volumeBtn.style.backgroundImage = "url('image/volume-off.png')";
	}
	else{
		volumeBtn.style.backgroundImage = "url('image/volume.png')";
	}
});

speedCont.addEventListener("mouseover",()=>{
	speedCont.style.backgroundColor = "hsl(0,0%,25%)";
	playbackSpeed.style.opacity = "1";
});

speedCont.addEventListener("mouseout",()=>{
	speedCont.style.backgroundColor = "transparent";
	playbackSpeed.style.opacity = "0";
});

playbackSpeed.addEventListener("mousemove",()=>{
	let x = playbackSpeed.value;
	let color = `linear-gradient(90deg, white ${x}%, hsl(0,0%,70%) ${x}%)`;
	playbackSpeed.style.background = color;
	speedP.innerText = `${x}x`;
})

playbackSpeed.addEventListener("change",(ev)=>{
	video.playbackRate = ev.target.value;
});

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));