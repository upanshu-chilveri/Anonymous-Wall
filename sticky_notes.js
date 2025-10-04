
        // Global variable to hold the list of values

let sheet_names = []; 
let sheet_messages = []; 

/**
 * Fetches data from the Google Sheet CSV output and populates the global list.
 * @returns {Promise<string[]>} A promise that resolves to the list of values.
 */
async function fetchAndPopulateAppValues() {
    // This URL requests the CSV format:
    const queryUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRoyRvIBPOb7KCtMAe6we-T26Gizc0NM1gBuC2wOiUR4NAqDvEioHgCL19PuErD2Mf_lOgGdPPOUOwN/pub?output=csv';
    
    try {
        const response = await fetch(queryUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const csvText = await response.text();
        
        // --- CSV PARSING LOGIC ---
        // 1. Split the text into individual rows
        const rows = csvText.trim().split('\n');
        
        // 2. Remove the header row (assuming the first row is the header)
        const dataRows = rows.slice(1);

        // 3. Extract the value from the *first column* of each row
        const values = dataRows.map(row => {
            // Split the row by comma (CSV delimiter)
            const columns = row.split(',');
            // Return the value in the first column (index 0), trimmed of whitespace and quotes
            return columns[0].trim().replace(/^"(.*)"$/, '$1'); 
        });

        const message = dataRows.map(row => {
            // Split the row by comma (CSV delimiter)
            const columns = row.split(',');
            // Return the value in the first column (index 0), trimmed of whitespace and quotes
            return columns[1].trim().replace(/^"(.*)"$/, '$1'); 
        });

        // Store the result in the global variable as requested
        sheet_names = values; 
        sheet_messages = message;

        addNewNote();
        console.log(sheet_messages);

        return sheet_names;

    } catch (error) {
        console.error('Network or fetch error:', error);
        return []; 
    }
}


const NOTE_COLORS = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200'];
    
        // NOTE_WIDTH, NOTE_HEIGHT, MIN_SPACING, and currentNotes array are removed.
        // The layout is now handled entirely by CSS Grid.

        // Helper to get a random item
        const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // --- Note Spawning Logic (Grid Layout) ---

        const addNewNote = () => {
            // All positioning/collision logic is removed as the grid handles layout automatically.
            

            for( var i=0; i<sheet_messages.length ;i++){
                const id = 'temp-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5); 
            const color = getRandomItem(NOTE_COLORS);   
            const content = sheet_messages[i];

            // Pass color and content only
            createNoteElement(id, content, color);
            }   
        };

        const createNoteElement = (id, content, color) => {
            const notesContainer = document.getElementById('notes-container');

            // 1. Create Note Wrapper
            const note = document.createElement('div');
            note.id = id;
            const rotation = (Math.random() * 4 - 2).toFixed(1); 

            // Updated classes for grid item: Removed 'absolute' and position styling.
            // Added 'h-64' for fixed height within the grid cell.
            note.className = `${color} p-4 shadow-xl rounded-lg flex flex-col transform rotate-[${rotation}deg] h-64`;

            // 2. Static Content Div (Read-only message)
            const contentDiv = document.createElement('div');
            contentDiv.className = 'flex-grow w-full bg-transparent text-sm leading-snug text-gray-800 p-2 overflow-y-auto font-inter select-none';
            contentDiv.innerText = content;
            note.appendChild(contentDiv);
            
            // Add note to the grid container
            notesContainer.appendChild(note);
        };

fetchAndPopulateAppValues();
