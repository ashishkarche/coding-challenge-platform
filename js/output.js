document.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Disable right-click context menu
});

document.addEventListener('copy', function (event) {
    event.preventDefault(); // Disable copying
});

document.addEventListener('keydown', function (event) {
    // Disable Ctrl+C, Ctrl+X, and Ctrl+V shortcuts
    if (event.ctrlKey && (event.key === 'c' || event.key === 'x' || event.key === 'v')) {
        event.preventDefault();
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function updateTimer() {
    let startTime = getCookie('startTime');
    if (!startTime) {
        return;
    }
    let now = new Date().getTime();
    let timeLeft = 15 * 60 * 1000 - (now - startTime);

    if (timeLeft <= 0) {
        document.body.innerHTML = ''; // Clear the content
        alert('Time limit reached');
    } else {
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('timer').textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        setTimeout(updateTimer, 1000); // Update the timer every second
    }
}

document.getElementById('outputForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const expectedOutput = `1 \n1 2 \n1 2 3 \n1 3 \n2 \n2 3 \n3 \n`;
    const userOutput = document.getElementById('output').value.trim();

    let resultElement = document.getElementById('result');

    let startTime = getCookie('startTime');
    let currentTime = new Date().getTime();
    let timePassed = currentTime - startTime;

    if (timePassed > 15 * 60 * 1000) {
        alert('Time limit reached');
        document.body.innerHTML = ''; // Clear the content
    } else {
        if (userOutput === expectedOutput.trim()) {
            resultElement.innerHTML = '<div class="alert alert-success">Correct! The output matches the expected result. Congratulations!</div>';
        } else {
            resultElement.innerHTML = '<div class="alert alert-danger">Incorrect! Please try again.</div>';
        }
    }
});

window.onload = function () {
    let startTime = getCookie('startTime');
    if (!startTime) {
        startTime = new Date().getTime();
        document.cookie = `startTime=${startTime}; path=/`;
    }
    updateTimer();
};