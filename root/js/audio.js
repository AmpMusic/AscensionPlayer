window.onload = function() {
  var audio = document.getElementById('audio'),
  sourceList = audio.getElementsByTagName('source'),
  play = document.getElementById('play'),
  prev = document.getElementById('prev'),
  next = document.getElementById('next'),
  mute = document.getElementById('mute'),
  voiceBar = document.getElementById('voiceBar'),
  voicedBar = document.getElementById('voicedBar'),
  musicBar = document.getElementById('musicBar'),
  playedBar = document.getElementById('playedBar'),
  loadBar = document.getElementById('loadBar'),
  songName = document.getElementById('songName'),
  playTime = document.getElementById('playTime'),
  totalTime = document.getElementById('totalTime'),
  musicImg = document.getElementById('music-img'),
  cycle = document.getElementById('cycle'),
  musicList = document.getElementById('musicList'),
  currentSrcIndex = 0;


  audio.loop = true;

	audio.preload = true;

  audio.autoplay = false;


  audio.volume = 0.1;
  var voicedBarWidth = (audio.volume / 1) * voiceBar.clientWidth;
  voicedBar.style.width = voicedBarWidth + 'px';


  audio.autobuffer = true;
  

  play.onclick = function() {
    if (audio.paused) {

	  var minute = parseInt(audio.duration / 60);
	  var second = parseInt(audio.duration % 60);
	    if (second < 10) {
	      second = '0' + second;
	    }
		totalTime.innerHTML = minute + ':' + second;
		//songName.innerHTML = sourceList[currentSrcIndex].title;
		this.innerHTML = '<img src="root/img/pause.png">';
		//musicImg.style.animation = 'Rotate 30s linear infinite';
    currentImg = sourceList[currentSrcIndex].getAttribute('data-img');
    musicImg.setAttribute('src', currentImg);
		//updateSong();
		audio.play();
	} else {
	    audio.pause();
		this.innerHTML = '<img src="root/img/play.png">';
		musicImg.removeAttribute('style');
	  }
  };

  musicList.addEventListener('click', function(ev) {
    var t = ev.target || ev.srcElement;
    if (t.tagName.toLowerCase() === 'a') {

	  var index = ([].indexOf.call(t.parentNode.parentNode.children, t.parentNode));
	  currentSrcIndex = index;
	  updateSong();
	  musicTime();
	  audio.play();
	}
  });

  function updateSong() {
  	currentSrc = sourceList[currentSrcIndex].getAttribute('src');
	  currentImg = sourceList[currentSrcIndex].getAttribute('data-img');
	  musicImg.setAttribute('src', currentImg);
	  audio.setAttribute('src', currentSrc);
  }

	function musicTime() {
	  songName.innerHTML = sourceList[currentSrcIndex].title;
	  audio.addEventListener("canplay", function() {
	    var minute = parseInt(audio.duration/ 60);
		var second = parseInt(audio.duration % 60);
		if (second < 10) {
		  totalTime.innerHTML = minute + ':0' + second;
		} else {
		    totalTime.innerHTML = minute + ':' + second;
		  }
		play.innerHTML = '<img src="root/img/pause.png">';
		//musicImg.style.animation = 'Rotate 30s linear infinite';
	  });
	}

  next.onclick = function() {
  	changeMusic('next');
  };

  prev.onclick = function() {
  	changeMusic('prev');
  };

  function changeMusic(direct) {
    if (direct === 'next') {
      ++ currentSrcIndex > sourceList.length - 1 && (currentSrcIndex = 0 );
	} else {
	    --currentSrcIndex < 0 && (currentSrcIndex = sourceList.length - 1 )
	  }
	updateSong();
	audio.play();
	musicTime();
  }

  voiceBar.onclick = function(event) {
    var voiceBarWidth = voiceBar.clientWidth;
    var newVolume = (event.offsetX / voiceBarWidth);
    audio.volume = newVolume;
    var voicedBarWidth = (audio.volume / 1) * voiceBarWidth;
    voicedBar.style.width = voicedBarWidth + 'px';
  };

  mute.onclick = function() {
  	if (!audio.muted) {
	  audio.muted = true;
	  voicedBar.style.width = 0 + 'px';
	} else {
		audio.muted = false;
		var voiceBarWidth = voiceBar.clientWidth;
	var voicedBarWidth = (audio.volume / 1) * voiceBarWidth;
	voicedBar.style.width = voicedBarWidth + 'px';
	}
  };



  cycle.onclick = function() {
  	if (audio.loop) {
	  audio.loop = false;
	  this.innerHTML = 'Repetir<br>Tudo';
	} else {
		audio.loop = true;
		this.innerHTML = 'Repetir<br>Atual';
	  }
  };


  musicBar.onclick = function(event) {
	var musicBarWidth = musicBar.clientWidth;
	var newCurrentTime = (event.offsetX / musicBarWidth) * audio.duration;
	audio.currentTime = newCurrentTime;
	var playedBarWidth = (audio.currentTime / audio.duration) * musicBarWidth;
	playedBar.style.width = playedBarWidth + 'px';
  };

  setInterval(function updatePlayedBar() {
  	var musicBarWidth = musicBar.clientWidth;
	var playedBarWidth = (audio.currentTime / audio.duration) * musicBarWidth;
	playedBar.style.width = playedBarWidth + 'px';
	if (audio.currentTime % 60 < 10) {
	  playTime.innerHTML = parseInt(audio.currentTime / 60) + ':0' + parseInt(audio.currentTime % 60);
	} else {
		playTime.innerHTML = parseInt(audio.currentTime / 60) + ':' + parseInt(audio.currentTime % 60);
	  }
	if (audio.currentTime === audio.duration && !audio.loop) {
	  next.onclick();
	}
  }, 1000);


  setInterval(function updateCache() {
	var buffered, percent;
	audio.readyState === 4 && (buffered = audio.buffered.end(0));
	audio.readyState === 4 && (percent = Math.round(buffered / audio.duration * 100) + '%');
	loadBar.style.width = (Math.round(buffered / audio.duration * 100) * musicBar.clientWidth * 0.01) + 'px';
  }, 1000);



  musicImg.addEventListener('mouseover', function() {
  //var arr = shishi.src.split("/");//	
  if (musicImg.src.indexOf('miao.png') > 0) {
	cuteCat.innerHTML = 'Clique na música vai ouvir';
		}
  });
  musicImg.addEventListener('mouseout', function() {
	cuteCat.innerHTML = '';
  });


  result.addEventListener('click', function(ev) {
    var t = ev.target || ev.srcElement;
	if (t.tagName.toLowerCase() === 'a') {
	  var oMusicSrc = result.getAttribute('data-audio');
	  var oMusicImg = result.getAttribute('data-img');
	  var oMusicName = result.getAttribute('data-music');
	  var oSinger = result.getAttribute('data-singer');
	  musicImg.setAttribute('src', oMusicImg);
	  songName.innerHTML = oMusicName + '-' + oSinger;
	  audio.setAttribute('src', oMusicSrc);
	  audio.play();
	  musicTime();
	  t.innerHTML = '';
	}

  });
	
  
  function CreateScript(src) {
  	var el = document.createElement('script');
		el.src = src;
		el.async = true;
		el.defer = true;
		document.body.appendChild(el);
  }

};

