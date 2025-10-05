const form1 = document.getElementById('myForm'); // 1. Get the form element
const scriptURL = 'https://script.google.com/macros/s/AKfycbxiAnl8kZCrkYH54jhRYIWln_m2w-2q71VmN1vQT37bXANaA6jrQXyryHel-XE3H1j9OQ/exec'; // 2. Replace with your actual Web App URL
const submitButton = document.getElementById('submit-btn');
const messageStatus = document.getElementById('statusMessage');

form1.addEventListener('submit', e => {
    e.preventDefault(); // 3. Stop the default form submission

    // Disable button and show loading status
    submitButton.disabled = true;
    messageStatus.textContent = 'Sending...';

    // 4. Create a FormData object from the form
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form1) 
    })
    .then(response => {
        // Success response from Apps Script
        messageStatus.textContent = '✅ Message sent successfully!';
        form1.reset(); // Clear the form fields
        console.log('Success!', response);
    })
    .catch(error => {
        // Handle any network or script errors
        messageStatus.textContent = '❌ An error occurred. Please try again.';
        console.error('Error!', error.message);
    })
    .finally(() => {
        // Re-enable the submit button
        submitButton.disabled = false;
    });
});

