// Disable right-click, copy, cut, and paste
document.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Disable right-click context menu
});

document.addEventListener('copy', function (event) {
    event.preventDefault(); // Disable copying
});

document.addEventListener('keydown', function (event) {
    // Disable Ctrl+C, Ctrl+X, and Ctrl+V shortcuts
    if (event.ctrlKey && ['c', 'x', 'v'].includes(event.key)) {
        event.preventDefault();
    }
});
// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

// Initialize hint chances and output attempts from cookies or set defaults
let hintChances = parseInt(getCookie('hintChances')) || 5;
let outputAttempts = parseInt(getCookie('outputAttempts')) || 10;

// Function to update cookies with the current state of hint chances and output attempts
function updateCookies() {
    setCookie('hintChances', hintChances, 1); // Store for 1 day
    setCookie('outputAttempts', outputAttempts, 1); // Store for 1 day
}

// Function to handle hint display
function showHint() {
    if (hintChances > 0) {
        const hintContent = document.getElementById('hintContent');
        const randomHint = hints[Math.floor(Math.random() * hints.length)];

        // Display the hint
        hintContent.textContent = randomHint;
        hintContent.style.display = 'block';

        // Hide the hint after 5 seconds
        setTimeout(() => {
            hintContent.style.display = 'none';
        }, 5000); // 5000 milliseconds = 5 seconds

        // Decrease hint chances and update the cookie
        hintChances--;
        updateCookies();
        if (hintChances === 0) {
            document.getElementById('hintButton').disabled = true;
        }
    } else {
        alert('No more hints available.');
    }
}

// Function to handle output form submission
document.getElementById('outputForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const expectedOutput = `1\n1 2\n1 2 3\n1 3\n2\n2 3\n3`;
    let userOutput = document.getElementById('output').value.trim();

    // Normalize the outputs by trimming each line and joining back
    userOutput = userOutput.split('\n').map(line => line.trim()).join('\n');
    const normalizedExpectedOutput = expectedOutput.split('\n').map(line => line.trim()).join('\n');

    let resultElement = document.getElementById('result');

    if (outputAttempts > 0) {
        const startTime = getCookie('startTime');
        const currentTime = new Date().getTime();
        const timePassed = currentTime - startTime;

        if (timePassed > 15 * 60 * 1000) {
            alert('Time limit reached');
            document.body.innerHTML = ''; // Clear the content
        } else {
            if (userOutput === normalizedExpectedOutput) {
                resultElement.innerHTML = '<div class="alert alert-success"><span class="alert-icon">&#10004;</span>Correct! The output matches the expected result. Congratulations!</div>';
            } else {
                resultElement.innerHTML = '<div class="alert alert-danger"><span class="alert-icon">&#10008;</span>Incorrect! Please try again.</div>';
                outputAttempts--;
                updateCookies();
                if (outputAttempts === 0) {
                    document.getElementById('outputForm').reset();
                    alert('No more attempts left.');
                }
            }
        }
    } else {
        alert('No more attempts left.');
    }
});

// Timer setup on page load
window.onload = function () {
    let startTime = getCookie('startTime');
    if (!startTime) {
        startTime = new Date().getTime();
        setCookie('startTime', startTime, 1); // Store start time in a cookie
    }
    updateTimer();

    // Disable the hint button if no hint chances left
    if (hintChances === 0) {
        document.getElementById('hintButton').disabled = true;
    }
};

// Timer update function to handle the countdown
function updateTimer() {
    const startTime = getCookie('startTime');
    if (!startTime) return;

    const now = new Date().getTime();
    const timeLeft = 15 * 60 * 1000 - (now - startTime);

    if (timeLeft <= 0) {
        showAnswerWithCodeAndLogic(); // Show the answer with code and logic
        alert('Time limit reached');
    } else {
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('timer').textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        setTimeout(updateTimer, 1000); // Update the timer every second
    }
}

// Function to show the correct answer with code and logic
function showAnswerWithCodeAndLogic() {
    document.body.innerHTML = ''; // Clear the content

    const explanation = `
        <div class="container my-5">
            <div class="card shadow-lg border-light rounded">
                <div class="card-header bg-primary text-white text-center">
                    <h3>Correct Answer & Explanation</h3>
                </div>
                <div class="card-body">
                    <h5>Correct Output:</h5>
                    <pre><code>1
1 2
1 2 3
1 3
2
2 3
3</code></pre>

                    <h5>Logic Explanation:</h5>
                    <p>This problem involves generating all possible subsets of a given array. The logic behind the code involves using a recursive function to explore all possible combinations of the array elements. The key steps include:</p>
                    <ol>
                        <li>Start with an empty subset and add it to the results.</li>
                        <li>Iterate through each element in the array, adding it to the current subset.</li>
                        <li>Recursively generate all subsets that include the current element.</li>
                        <li>Backtrack by removing the last element and move to the next.</li>
                    </ol>

                    <h5>Code Explanation:</h5>
                    <p>The code recursively builds subsets and stores them in a result list. It efficiently handles all possible combinations by iterating through the array and using a helper function to manage the recursion and backtracking.</p>

                    <h5>Example:</h5>
                    <p>Given the array [1, 2, 3], the function generates subsets in the following order:</p>
                    <ul>
                        <li>[]</li>
                        <li>[1]</li>
                        <li>[1, 2]</li>
                        <li>[1, 2, 3]</li>
                        <li>[1, 3]</li>
                        <li>[2]</li>
                        <li>[2, 3]</li>
                        <li>[3]</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.body.innerHTML = explanation; // Insert the explanation content
}

// Array of hints
const hints = [
    "Think about how to handle subsets of different sizes.",
    "Consider using recursion to solve the problem.",
    "Make sure your function is generating all possible subsets.",
    "Check how different programming languages handle arrays or lists.",
    "Remember to include edge cases, like an empty array."
];

// Add event listener to hint button
document.getElementById('hintButton').addEventListener('click', showHint);
