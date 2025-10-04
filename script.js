const form = document.getElementById('myForm'); // 1. Get the form element
const scriptURL = 'https://script.google.com/macros/s/AKfycbxiAnl8kZCrkYH54jhRYIWln_m2w-2q71VmN1vQT37bXANaA6jrQXyryHel-XE3H1j9OQ/exec'; // 2. Replace with your actual Web App URL
const submitButton = document.getElementById('submit-btn');
const messageStatus = document.getElementById('statusMessage');

form.addEventListener('submit', e => {
    e.preventDefault(); // 3. Stop the default form submission

    // Disable button and show loading status
    submitButton.disabled = true;
    messageStatus.textContent = 'Sending...';

    // 4. Create a FormData object from the form
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form) 
    })
    .then(response => {
        // Success response from Apps Script
        messageStatus.textContent = '✅ Message sent successfully!';
        form.reset(); // Clear the form fields
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

async function fetchRawGoogleSheetJson() {
    // URL format for Google Visualization API to get JSON output
    const baseUrl = 'https://docs.google.com/spreadsheets/d/';
    const queryUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRoyRvIBPOb7KCtMAe6we-T26Gizc0NM1gBuC2wOiUR4NAqDvEioHgCL19PuErD2Mf_lOgGdPPOUOwN/pub?gid=0&single=true&output=csv';
    try {
        const response = await fetch(queryUrl);
        
        // Throw an error if the HTTP response status is not successful (e.g., 404, 500)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        
        // Google wraps the JSON data in a function call (JSONP format).
        // The format is typically: /*O_o*/google.visualization.Query.setResponse({...});

        // 1. Remove the prefix: /*O_o*/google.visualization.Query.setResponse(
        let jsonText = text.replace('/*O_o*/google.visualization.Query.setResponse(', '');
        
        // 2. Remove the suffix: );
        jsonText = jsonText.slice(0, -2); 

        // The result is now a valid JSON string containing the 'table' and 'cols'.
        console.log(jsonText);
        return jsonText;

    } catch (error) {
        console.error('Network or fetch error:', error);
        return null; 
    }

}
fetchRawGoogleSheetJson();