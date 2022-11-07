"use strict";

const score = document.querySelector('.score_count');
const bestcount = document.querySelector('.score_bestcount');
const miss = document.querySelector('.miss_count');
const playzone = document.querySelector('.playzone');
const dot = document.querySelector('.dotzone');
const playbutton = document.querySelector('.playbutton');

let spawnspeed;
let scoreCount = 0;
let sizechange = 0.5;
score.textContent = scoreCount;

let pointerX, pointerY;
function startgame(){
	spawnspeed = 60
	spawner();
	playbutton.style.display = 'none';
	setTimeout(endgame, 36000);
}

function endgame(){
	playbutton.style.display = 'block';
	if (bestcount.textContent <= scoreCount) {
		bestcount.textContent = scoreCount;
	}
	spawnspeed = 0;
	scoreCount = 0;
	score.textContent = scoreCount;
}

function spawner(){
	if(spawnspeed){
		spawnTarget();
		setTimeout(spawner, 1260 - spawnspeed);
	}
}

function spawnTarget(){
	const posX = Math.random() * (playzone.scrollWidth - 40) + 0;
	const posY = Math.random() * (playzone.scrollHeight - 40) + 0;

	const target = dot.cloneNode(true);
	target.style.margin = `${posY}px 0 0 ${posX}px`;
	playzone.prepend(target);
	destroy(target.firstChild);
	if (spawnspeed < 600) {
		spawnspeed += 30;
	}
}

function destroy(el){
	let widthChange = 40;
	func();
	function func(){
		if(spawnspeed){
			el.style.width = widthChange +'px';
			el.style.height = widthChange +'px';
			widthChange -= 0.5;
			
			if (el.offsetWidth >=5){
				setTimeout(func, 30 - (spawnspeed /600));
			}
			else if (el.offsetWidth !=0){
				console.log(el.parentNode.offsetWidth);
				el.parentNode.remove();
				scoreCount -= 60;
				score.textContent = scoreCount;				
			}
		}
		else{
			el.parentNode.remove();
		}
	}
}

document.onmousedown = function(event) {
	pointerX = event.pageX;
	pointerY = event.pageY;
	let el = document.elementFromPoint(pointerX,pointerY);
	if (el.className == 'dot') {
		el.parentNode.remove();
		scoreCount += 100;
		score.textContent = scoreCount;	
	}	
	else if ((el.className == 'playzone_button' || el.className == 'dotzone') && spawnspeed) {
		scoreCount -= 30;
		score.textContent = scoreCount;
	}
}

console.log(window.pageYOffset);
window.onscroll = function(){
	if (window.pageYOffset <739) {
		document.querySelector(`.wrapper`).style.background = '#a37c82';
	}
	else if (window.pageYOffset <2000) {
		document.querySelector(`.wrapper`).style.background = '#22161c';
	}
	else if (window.pageYOffset <3000) {
		document.querySelector(`.wrapper`).style.background = '#e2ae6c';
	}
	else
		document.querySelector(`.wrapper`).style.background = '#f2f1ef';
}
