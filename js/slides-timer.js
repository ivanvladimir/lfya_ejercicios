var timers = document.querySelectorAll(".timer");
var alert_done_sound = new Audio('../audio/chime.wav');

for (var i = 0; i < timers.length; i++) {
	(function(i) {
	timers[i].innerHTML = '<div class="buttons"><button class="button play">&#9658;</button><button class="button pause">&#9646;&#9646;</button><button class="button stop">&#9724;</button><input name="time-input" type="text" class="time-input"  autofocus/></div><div class="timer-text">&nbsp;</div>';

	var play  =timers[i].getElementsByClassName("play")[0];
	var pause =timers[i].getElementsByClassName("pause")[0];
	var stop  =timers[i].getElementsByClassName("stop")[0];
	var text  =timers[i].getElementsByClassName("timer-text")[0];
	var input  =timers[i].getElementsByClassName("time-input")[0];
	var time=timers[i].getAttribute('time');
	if (!time) time = 1;
    if (isNaN(time)) {
        alert('Please input valid number');
        return;
    }
	input.value=time;
	text.innerHTML=input.value*60;

	var timer = new Timer({
		onstart : function(millisec) {
			var sec = Math.round(millisec / 1000);
			text.innerHTML=sec;
		},
		ontick  : function(millisec) {
			var sec = Math.round(millisec / 1000);
			text.innerHTML=sec;
		},
		onpause : function() {
			text.innerHTML='pausa';
		},
		onstop  : function() {
			text.innerHTML=input.value*60;
		},
		onend   : function() {
			alert_done_sound.play();
			text.innerHTML='FIN';
		}
	});

	play.addEventListener("click", function () {
		if (timer.getStatus() === 'paused') {
			var rest=timer.getDuration();
			timer.start(rest/1000);
		}else{
			timer.start(input.value*60);
		}
	});
	pause.addEventListener("click", function () {
		if (timer.getStatus() === 'started') {
                timer.pause();
        }
	});
	stop.addEventListener("click", function () {
        timer.stop();
	});

	input.addEventListener("keydown", function(e){
		if (! /started|paused/.test(timer.getStatus())) {
			if (!input.value) return;
			if (isNaN(input.value)) {
				alert('Please input valid number');
				return;
			}
			text.innerHTML=input.value*60;
		}

	});
	})(i);
}
