var isChrome = window.chrome;
var myVendorName = window.navigator.vendor;
var urlButton = document.getElementById("urlButton");
var showHideInstructions = document.getElementById("showHideInstructions");
var keyShortcutsButton = document.getElementById('keyShortcutsButton');
var lightsButton = document.getElementById('lightsButton');
var fader = document.getElementById('fader');
var anchorURL = document.getElementById('anchorURL');
anchorURL.target="_blank";
var resizeButton = document.getElementById('resizeButton');
var hiddenMenu = document.getElementById('hiddenMenu');
var myRegex = /^https:\/\/.*\/;
var link;
var videoArea = document.getElementById('videoArea');

if (isChrome !== null && myVendorName === "Google Inc.") {
	// pass
} else {
	document.body.innerHTML = "<p style=\"font-size:30px;\">You need <a href=\"http:\/\/google.com/chrome\" target=\"blank\">Google Chrome</a> to view this content</p>";
}

function triggerCloudy() {
	link = document.getElementById("urlArea").value;
	if (link.length > 15 && myRegex.test(link)) {
		anchorURL.href=link;
		var myPlayer = videojs("player");
		myPlayer.src(link);
		myPlayer.play();
	} else {
		$("#urlArea").effect( "highlight", {color:"#ff0000"}, 500 );
	}
}

urlButton.onclick = triggerCloudy;

showHideInstructions.onclick = function() {
	$("#imgInstructions").toggle("blind", 250);
};

lightsButton.onclick = function() {
	$("#fader").fadeToggle(250);
};

$("#keyShortcutsButton").tooltip({
    content: '<p>UP: Volume up<p>DOWN: Volume down<p>LEFT: (5 sec) backward<p>RIGHT: (5 sec) forward<p>SPACE: Play/Pause'
});

resizeButton.onclick = function() {
	$("#menu ul ul").toggle();
};

hiddenMenu.addEventListener("click", function(e) {
	var myPlayer = videojs("player");
	var playerSize = e.target.innerHTML;
	switch(playerSize) {
		case "480p":
			myPlayer.width(768);
			myPlayer.height(432);
			break;
		case "720p":
			myPlayer.width(1280);
			myPlayer.height(720);
			break;
		case "1080p":
			myPlayer.width(1920);
			myPlayer.height(1080);
			break;
		case "Fit to screen":
			var windowWidth = $('body').innerWidth();
			myPlayer.width(windowWidth);
			myPlayer.height(Math.floor((windowWidth / 16) * 9));
			break;
	}
	$("#menu ul ul").toggle();
}, false);


videoArea.onkeydown = function() {
	var myPlayer = videojs("player");
    var currentTime = myPlayer.currentTime();
    var volume = myPlayer.volume();
    var e = window.event;
    switch (window.event.keyCode) {
        case 37:
            myPlayer.currentTime(currentTime - 5);
            break;
        case 38:
        	myPlayer.volume(volume + 0.1);
        	break;
        case 39:
            myPlayer.currentTime(currentTime + 5);
            break;
        case 40:
        	myPlayer.volume(volume - 0.1);
        	e.preventDefault();
        	break;
        case 32:
        	if (myPlayer.paused()) {
        		e.preventDefault();
        		myPlayer.play();
        		break;
        	} else {
        		e.preventDefault();
        		myPlayer.pause();
        		break;
        	}
    }
};
