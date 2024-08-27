 // Function to set a cookie
 function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to erase a cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Check if user cookie exists and if the time limit has been reached
function checkSession() {
    let userName = getCookie('username');
    let startTime = getCookie('startTime');
    let currentTime = new Date().getTime();

    if (userName) {
        if (startTime && (currentTime - startTime) > 15 * 60 * 1000) {
            alert('Time limit reached');
            document.body.innerHTML = ''; // Clear the page
        } else {
            window.location.href = "coding_challenge.html"; // Redirect to coding challenge page
        }
    } else {
        document.getElementById('nameForm').style.display = 'block';
    }
}

// On form submission, save the name in a cookie, start the timer, and redirect to the coding challenge page
document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let userName = document.getElementById('username').value;
    if (userName) {
        setCookie('username', userName, 7); // Cookie valid for 7 days
        setCookie('startTime', new Date().getTime(), 1); // Set start time
        window.location.href = "coding_challenge.html"; // Redirect to coding challenge page
    }
});

// Initialize session check
checkSession();