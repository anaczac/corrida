document.addEventListener("DOMContentLoaded", function() {
  let balance = 100; // Saldo inicial
  const betAmountInput = document.getElementById("betAmount");
  const placeBetButton = document.getElementById("placeBet");
  const cars = document.querySelectorAll(".car");
  const balanceDisplay = document.getElementById("balanceDisplay");

  updateBalanceDisplay(); // Atualiza o display de saldo inicialmente

  placeBetButton.addEventListener("click", function() {
    const betAmount = parseInt(betAmountInput.value);
    const selectedCar = document.querySelector('input[name="selectedCar"]:checked').value;

    if (isNaN(betAmount) || betAmount < 5) {
      alert("Invalid bet amount. Minimum bet is R$5.");
      return;
    }

    if (betAmount > balance) {
      alert("Insufficient balance. You cannot bet more than your current balance.");
      return;
    }

    // Start the race
    startRace(selectedCar, betAmount);
  });

  function startRace(selectedCar, betAmount) {
    const raceDuration = 5000; // Race duration in milliseconds
    const distancePerInterval = 10; // Distance covered by cars in each interval
    let positions = [0, 0, 0, 0, 0]; // Initial positions of the cars

    const raceInterval = setInterval(() => {
      // Update the position of each car
      positions = positions.map((position,i) => { 
        let newposition 
        if (i == 0) {
          newposition = position + Math.random() * distancePerInterval * 2 ;
        }
        else {
          newposition = position + Math.random() * distancePerInterval;
        }
        return newposition
      }); 

      // Update the visual position of cars on the track
      cars.forEach((car, index) => {
        car.style.left = positions[index] + "px";
      });

      // Check if any car has reached the finish line
      if (positions.some(position => position >= 500)) {
        clearInterval(raceInterval); // Stop the race
        showResult(positions, selectedCar, betAmount); // Show the race result
      }
    }, 50);
  }

  function showResult(positions, selectedCar, betAmount) {
    console.log("Race finished!");
    console.log("Positions:", positions);

    // Determine the winning car index
    const winningPosition = Math.max(...positions);
    const winnerIndex = positions.indexOf(winningPosition) + 1;

    let message;
    if (winnerIndex === parseInt(selectedCar)) {
      balance += betAmount; // Aumenta o saldo se o jogador ganhar
      message = `Congratulations! Car ${winnerIndex} won! You won R$${betAmount * 2}.`;
    } else {
      balance -= betAmount; // Diminui o saldo se o jogador perder
      message = `Sorry! Car ${winnerIndex} won. You lost your bet of R$${betAmount}.`;
    }

    updateBalanceDisplay(); // Atualiza o display de saldo
    alert(message);
  }

  function updateBalanceDisplay() {
    balanceDisplay.textContent = `Balance: R$${balance.toFixed(2)}`;
  }
});
