# Assignment 3

### Project Overview
Lorem Ipsum...

### Prerequisites
- Python 3.8+
- Node.js 14+
- pip
- npm

## Directory Structure
```bash
assignmnet-3/
|
├── backend/
│   ├── __data/
│   │   ├── annual.csv
│   │   └── monthly.csv
│   │   
│   ├── __main.py
│   ├── __clustermodel.py
│   ├── __knnmodel.py
│   ├── __regressionmodel.py
│   └── ... (Multiple .pkl files)
|
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ... (other stuff maybe)
│
└── README.md
```

## Backend
Navigate to to `backend` folder, and run the following commands. ### UPDATE ONCE DIRECTORY STRUCTURE IS SET ###

### Set Up and Activate Virtual Environemnt
```bash
python -m venv venv

# Windows
venv\Scripts\activate.bat

#Linux/ Mac
source venv/bin/activate
```

### Install Dependencies
```bash
pip install fastapi uvicorn joblib pydantic pandas numpy scikit-learn
```

### Activate FastAPI
Navigate to wherever we end up putting main.py, and run the following command.
```bash
uvicorn __main:app --reload
```

## Front End
Navigate to to `frontend` folder, and run the following commands.

### Install Dependencies
```bash
npm install react-router-dom mui @mui/material @emotion/react @emotion/styled @mui/icons-material
```

### Activate React
```bash
npm start
```