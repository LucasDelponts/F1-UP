document.addEventListener('DOMContentLoaded', function () {
    const saldoElement = document.getElementById('saldo');
    const betValueElement = document.getElementById('betValue');
    const driversElement = document.getElementById('drivers');
    const resultElement = document.getElementById('result');
    const raceButton = document.getElementById('race');
    const betButton = document.getElementById('bet');

    let saldo = 100;
    let raceStarted = false;
    let raceInterval;

    betButton.addEventListener('click', function () {
        const betValue = parseInt(betValueElement.value);
        const chosenDriver = parseInt(driversElement.value);

        if (betValue <= saldo && betValue >= 5) {
            saldo -= betValue;
            saldoElement.textContent = `$${saldo}`;
            betButton.disabled = true;
            raceButton.disabled = false;
        } else {
            alert('Insufficient balance or invalid bet value!');
        }
    });

    raceButton.addEventListener('click', function () {
        if (!raceStarted) {
            raceStarted = true;
            race();
        }
    });

    function race() {
        const cars = document.querySelectorAll('.car');
        let winner = null;

        raceInterval = setInterval(() => {
            if (!winner) {
                cars.forEach(car => {
                    const distance = Math.floor(Math.random() * 20);
                    const currentPosition = parseInt(car.style.left) || 0;
                    car.style.left = `${currentPosition + distance}px`;

                    if (currentPosition + car.offsetWidth >= window.innerWidth) {
                        winner = car.id;
                        clearInterval(raceInterval);
                        showResult(winner);
                    }
                });
            }
        }, 50);
    }

    function showResult(winner) {
        const chosenDriver = parseInt(driversElement.value);
        if (parseInt(winner.substring(3)) === chosenDriver) {
            resultElement.textContent = `You won!`;
            saldo += parseInt(betValueElement.value) * 2;
        } else {
            resultElement.textContent = `You lost!`;
        }
        saldoElement.textContent = `$${saldo}`;
        betButton.disabled = false;
        raceStarted = false;
    }
});
