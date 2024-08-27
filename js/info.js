// Function to update the information box
function updateInfoBox() {
    document.getElementById('hintCount').textContent = `${hintChances} hints remaining`;
    document.getElementById('attemptCount').textContent = `${outputAttempts} attempts remaining`;
    let startTime = getCookie('startTime');
    if (startTime) {
        let now = new Date().getTime();
        let timeLeft = 15 * 60 * 1000 - (now - startTime);
        if (timeLeft <= 0) {
            timeLeft = 0; // Ensure time left doesn't go negative
        }
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('timeLeft').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

// Call updateInfoBox initially and every second
window.onload = function () {
    let startTime = getCookie('startTime');
    if (!startTime) {
        startTime = new Date().getTime();
        document.cookie = `startTime=${startTime}; path=/`;
    }
    updateTimer();
    setInterval(updateInfoBox, 1000); // Update the information box every second
};
