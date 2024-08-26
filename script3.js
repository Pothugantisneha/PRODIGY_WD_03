document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const heading = document.getElementById('heading'); // Get the heading element
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] !== null || !gameActive) return;

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        console.log(`Player ${currentPlayer} clicked on index ${index}`);
        console.log(`Board state: `, boardState);

        if (checkWinner()) {
            gameActive = false;
            console.log(`${currentPlayer} wins!`);
            setTimeout(() => {
                confettiBurst();  // Call the confetti burst function here
                heading.textContent = `${currentPlayer} wins!!!`;  // Update the heading text
            }, 100);
        } else if (boardState.every(cell => cell !== null)) {
            gameActive = false;
            console.log('Game is a draw.');
            setTimeout(() => heading.textContent = 'Draw!', 100);  // Update the heading text for a draw
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            console.log(`Next player: ${currentPlayer}`);
        }
    }

    function checkWinner() {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    }

    function confettiBurst() {
        const colors = ['#ff9966', '#ff5e62', '#6dd5ed', '#2193b0', '#ff758c', '#ff7eb3'];

        confetti({
            particleCount: 500,
            spread: 170,
            origin: { y: 0.6 },
            colors: colors,
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
});
