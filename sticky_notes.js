const NOTE_COLORS = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200'];
        const MESSAGES = [
            "Don't forget the milk and bread.",
            "Call Sarah about the meeting on Friday.",
            "Idea: A cat that does taxes.",
            "Check the server logs before deployment.",
            "This note is a placeholder for greatness.",
            "Write that thank you email today!",
            "Need to research modular synthesizers.",
            "The early bird gets the worm, but the second mouse gets the cheese.",
            "Remember to water the plants.",
            "Set up the new project folder.",
            "Tomorrow's to-do: conquer the world."
        ];
        // NOTE_WIDTH, NOTE_HEIGHT, MIN_SPACING, and currentNotes array are removed.
        // The layout is now handled entirely by CSS Grid.

        // Helper to get a random item
        const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // --- Note Spawning Logic (Grid Layout) ---

        const addNewNote = () => {
            // All positioning/collision logic is removed as the grid handles layout automatically.
            
            const id = 'temp-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5); 
            const color = getRandomItem(NOTE_COLORS);
            const content = getRandomItem(MESSAGES);

            // Pass color and content only
            createNoteElement(id, content, color);
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
        
        window.addNewNote = addNewNote;