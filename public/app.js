document.addEventListener('DOMContentLoaded', function() {
    let app = firebase.app();
    fetch("http://localhost:5001/intro-to-cloud-functions/us-central1/api/dog")
    .then(console.log);
});