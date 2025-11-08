
// Global variable to hold the list of values

let sheet_names = [];
let sheet_messages = [];

async function fetchAndPopulateAppValues() {
    // This URL requests the CSV format:
    const queryUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRoyRvIBPOb7KCtMAe6we-T26Gizc0NM1gBuC2wOiUR4NAqDvEioHgCL19PuErD2Mf_lOgGdPPOUOwN/pub?output=csv';

    try {
        const response = await fetch(queryUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const csvText = await response.text();

        const rows = csvText.trim().split('\n');

        const dataRows = rows.slice(1);

        const values = dataRows.map(row => {
            const columns = row.split(',');
            return columns[0].trim().replace(/^"(.*)"$/, '$1');
        });

        const message = dataRows.map(row => {
            const columns = row.split(',');
            return columns[1].trim().replace(/^"(.*)"$/, '$1');
        });

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

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


const addNewNote = () => {
   
    for (var i = 0; i < sheet_messages.length; i++) {
        const id = 'temp-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        const color = getRandomItem(NOTE_COLORS);
        const content = sheet_messages[i];

        createNoteElement(id, content, color);
    }
};

const createNoteElement = (id, content, color) => {
    const notesContainer = document.getElementById('notes-container');

    const note = document.createElement('div');
    note.id = id;
    const rotation = (Math.random() * 4 - 2).toFixed(1);

    note.className = `${color} p-4 shadow-xl rounded-lg flex flex-col transform rotate-[${rotation}deg] h-64`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'flex-grow w-full bg-transparent text-sm leading-snug text-gray-800 p-2 overflow-y-auto font-inter select-none';
    contentDiv.innerText = content;
    note.appendChild(contentDiv);

    notesContainer.appendChild(note);
};

fetchAndPopulateAppValues();


const form2 = document.getElementById("search-form");

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form2);
    console.log("from submitted");
    for (item of data) {
        console.log(item[0])
    }
});


