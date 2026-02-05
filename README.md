# Anonymous Wall

A simple web application where users can anonymously share confessions and secrets. Built with HTML, CSS, and JavaScript, using Google Sheets as a database.

## Features

- Anonymous confession submissions
- No signup or login required
- Confessions displayed as colorful sticky notes
- Google Sheets integration for data storage
- Responsive design for mobile and desktop
- Category-based organization
- Character limit with counter (500 characters)

## Tech Stack

- HTML, CSS, JavaScript
- Bootstrap 5
- Tailwind CSS
- Google Sheets (database)
- Google Apps Script (API)

## How It Works

1. Users submit confessions through a form
2. Data is sent to Google Apps Script
3. Confessions are stored in Google Sheets
4. The confessions page fetches data from Google Sheets and displays them as sticky notes

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/upanshu-chilveri/Anonymous-Wall.git
cd Anonymous-Wall/Anonymous_Wall
```

### 2. Open in browser
Simply open `index.html` in your browser, or use a local server.

### 3. Configure Google Sheets Integration

**For Form Submissions:**
1. Create a Google Sheet with columns: Category, Message, Timestamp
2. Go to Extensions → Apps Script
3. Add this code:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([e.parameter.name, e.parameter.message, new Date()]);
  return ContentService.createTextOutput(JSON.stringify({'result':'success'}));
}
```
4. Deploy as Web App (Anyone can access)
5. Copy the Web App URL and paste it in `script_A.js` (line 2)

**For Displaying Confessions:**
1. Publish your Google Sheet: File → Share → Publish to web → CSV format
2. Copy the published URL and paste it in `sticky_notes.js` (line 9)
