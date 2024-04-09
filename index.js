document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = []; // Array to store references to each cell in the board
    let currentPlayer = 'X'; // Player X starts the game
    let winner = null; // Initially, there is no winner
    const title = document.querySelector('h1'); // Reference to the heading element
    const resetButton = document.getElementById('reset-button'); // Reference to the reset button
  
    // Create the Tic Tac Toe board
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.textContent = '';
        board.appendChild(cell);
        cells.push(cell);
        cell.addEventListener('click', handleMove);
      }
    }
  
    // Function to handle a player's move
    function handleMove(event) {
      const cell = event.target;
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
  
      if (!winner && cell.textContent === '') {
        cell.textContent = currentPlayer;
        winner = checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
      }
  
      if (winner) {
        title.textContent = `Player ${winner} wins!`; // Update the heading with the winner
        title.style.color = winner === 'X' ? 'red' : 'blue'; // Optionally, change the color based on the winner
      } else if (isBoardFull()) {
        title.textContent = "It's a draw!";
      }
    }
  
    // Function to check for a winner
    function checkWinner() {
      const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent !== '' && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          return cells[a].textContent; // Return the winning player ('X' or 'O')
        }
      }
  
      return null; // No winner yet
    }
  
    // Function to check if the board is full (i.e., it's a draw)
    function isBoardFull() {
      return cells.every(cell => cell.textContent !== '');
    }
  
    // Reset the game when the reset button is clicked
    resetButton.addEventListener('click', function () {
      // Clear the board
      cells.forEach(cell => {
        cell.textContent = '';
      });
  
      // Reset game variables
      currentPlayer = 'X';
      winner = null;
      title.textContent = 'Tic Tac Toe';
      title.style.color = 'black'; // Reset the title color
    });
  });
  