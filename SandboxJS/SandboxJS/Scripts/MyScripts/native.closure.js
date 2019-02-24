function makeArmy() {
	var shooters = [];
	console.log(shooters);
	for (var i = 0; i < 10; i++) {
		var shooter = (function (x) {
			return function () {
				console.log(x);   // функция-стрелок
				return x;
			}; // выводит свой номер
		})(i);
		shooters.push(shooter);
	}
	return shooters;
}

function getNumber() {
	var nShooter = parseInt(document.getElementById('nShooter').value);
	var army = makeArmy();
	document.getElementById('outputShooter').innerText = army[nShooter]();
}

document.getElementById('showShooter').onclick = getNumber;
// .. все стрелки выводят 10 вместо 0,1,2...9
