# CVE Dashboard

A lightweight CVE (Common Vulnerabilities and Exposures) dashboard to fetch, store, and display vulnerability data using Node.js, HTML, CSS, and JavaScript.

## 📌 Project Overview

This project is built to serve as an interactive interface for browsing CVE entries. It retrieves the latest CVE data from trusted sources and displays it in a user-friendly format. This tool is useful for cybersecurity enthusiasts, researchers, and IT professionals who want quick access to vulnerability information.

## ⚙️ Features

- Fetches and stores CVE data from public sources.
- Displays a list of recent vulnerabilities.
- Detailed CVE information view with CVSS score and description.
- Simple, responsive frontend interface.
- Node.js-powered backend for data retrieval and processing.

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **Others**: 
  - `fetchAndStore.js` for fetching and storing CVE data
  - `server.js` for serving web pages and data
  - Express.js (assumed via `package.json`)

## 🗂️ Project Structure

```
CVE/
│
├── public/
│   ├── index.html           # Main CVE listing page
│   ├── details.html         # Detailed CVE view page
│   ├── style.css            # Styles for index
│   ├── cvedetails.css       # Styles for CVE detail page
│   ├── script.js            # JS for interactivity
│   └── cvedetails.js        # JS for CVE detail page
│
├── fetchAndStore.js         # Script to fetch and store CVE data
├── server.js                # Node.js server script
├── package.json             # Project dependencies
└── .vscode/                 # Editor configurations
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shriehariac/CVE.git
cd CVE
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
node server.js
```

### 4. View in browser

Open your browser and navigate to:

```
http://localhost:3000
```

## 📄 Notes

- Ensure Node.js is installed on your system.
- The CVE data source and structure may be subject to API limits or schema changes—update fetch logic accordingly.

## 📌 Future Enhancements

- Search/filter functionality
- CVE data source selection (e.g., NVD, Mitre)
- Automatic data refresh scheduling
- Dark mode UI

## 📜 License

This project is for educational purposes. Please refer to the CVE data source license terms when using it in production.
