		function jsonpcallback(rs) {
		  var resultHtml = '：<strong>' + rs.result.songs[0].name + '</strong>' + '：<strong>' + rs.result.songs[0].artists[0].name + '</strong>' + '<a href="javascript:;" id="playNow">立即播放</a>';	
		  result.innerHTML = resultHtml;
		  result.setAttribute('data-audio', rs.result.songs[0].audio);
		  result.setAttribute('data-img', rs.result.songs[0].album.picUrl);
		  result.setAttribute('data-music', rs.result.songs[0].name);
		  result.setAttribute('data-singer', rs.result.songs[0].artists[0].name);
		  result.style.opacity = '1';        	
	   	}