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
│   ├── arima-timeseries/
│   │   ├── main.py # Initial FastAPI work
│   │   ├── model.py
│   │   └── model.pkl
│   │   
│   ├── k-means/
│   │   ├── main.py # Initial FastAPI work
│   │   ├── model.py
│   │   └── model.pkl
│   │   
│   ├── knn/
│   │   ├── main.py # Initial FastAPI work
│   │   ├── model.py
│   │   └── model.pkl
│   │   
│   ├── linear-regression/
│   │   ├── main.py # Initial FastAPI work
│   │   ├── model.py
│   │   └── model.pkl
│   │   
│   └── main.py
│
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
uvicorn main:app --reload
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