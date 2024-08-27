// Function to hide the loading overlay
function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('hidden');
}

// Show loading overlay while the page is loading
window.addEventListener('load', function () {
    setTimeout(hideLoadingOverlay, 2000); // Stay visible for 3 seconds
});

// Handle offline/online status
window.addEventListener('offline', function () {
    document.getElementById('loadingOverlay').classList.remove('hidden');
    document.getElementById('loadingOverlay').innerHTML = '<div class="spinner-border text-danger" role="status"><span class="visually-hidden">No Internet Connection</span></div>';
});

window.addEventListener('online', function () {
    document.getElementById('loadingOverlay').classList.add('hidden');
    // Restore the original content if needed
    document.getElementById('loadingOverlay').innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
});