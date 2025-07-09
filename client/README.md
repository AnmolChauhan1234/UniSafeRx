# UniSafeRx Project

UniSafeRx is a full-stack application designed to ensure the safety and authenticity of medicines using blockchain technology, machine learning, and a user-friendly interface. The project consists of a React + Vite frontend and a Django REST Framework backend integrated with blockchain and AI components.

## Project Structure

- **client/**: React frontend built with Vite, TailwindCSS, and various React libraries.
- **server/**: Django backend providing REST APIs, blockchain interaction, and machine learning functionalities.

---

## Frontend Setup and Usage

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Development Server

Start the frontend development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

To build the optimized production bundle:

```bash
npm run build
```

You can preview the production build locally with:

```bash
npm run preview
```

---

## Backend Setup and Usage

### Prerequisites

- Python 3.10 or higher
- pip
- PostgreSQL (or your preferred database configured in Django settings)
- (Optional) virtualenv or venv for creating isolated Python environments

### Installation

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. (Optional but recommended) Create and activate a virtual environment:

   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure your database and environment variables as needed. You may use a `.env` file or set environment variables directly. Ensure the Django settings reflect your configuration.

### Running the Backend Server

Run the Django development server:

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000` by default.

---

## Running the Full Application

1. Start the backend server first (`python manage.py runserver` in `server` directory).
2. Start the frontend development server (`npm run dev` in `client` directory).
3. Access the frontend at `http://localhost:5173`, which will communicate with the backend API.

---

## Additional Notes

- The backend integrates blockchain functionality using Web3.py and smart contracts.
- Machine learning models are used for medicine verification and image processing.
- The frontend uses React Router for navigation and Axios for API requests.
- TailwindCSS is used for styling.

---
