# Translation App


## Introduction

The Translation App is a web-based application that leverages Gemini AI for translating text and converting speech to text. This application is built using Node.js for the backend and React with Vite for the frontend.

## Features

- **Text Translation:** Translate text from one language to another.
- **Speech-to-Text:** Convert spoken words into text.
- **User-Friendly Interface:** Easy-to-use and intuitive UI.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js
- **AI Service:** Gemini AI

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Zeeshan6871/Puntpartners.git
   cd Puntpartners
   ```

2. **Install dependencies:**
   ```sh
   # For backend
   cd Server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory of both the frontend and backend folders and add environment variables of GEMINI API KEY.

4. **Run the application:**
   ```sh
   # Start backend server
   cd Server
   npm server

   # Start frontend server
   cd ../Client
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5000`.
2. Use the interface to input text or speech.
3. Select the target language for translation.
4. View the translated text.

## Screenshots

![Home Page](path_to_home_page_screenshot)
![Translation Page](path_to_translation_page_screenshot)
![Speech-to-Text Page](path_to_speech_to_text_page_screenshot)

## API Reference

### Endpoints

- **GET /api/translate**
  - **Description:** Translate text from one language to another.
  - **Parameters:**
    - `text`: The text to be translated.
    - `targetLang`: The target language code.
  - **Response:** JSON object containing the translated text.

## Contributing

We welcome contributions to improve the Translation App. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.
