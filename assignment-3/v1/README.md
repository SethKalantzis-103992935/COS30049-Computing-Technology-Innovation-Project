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
In the `backend` folder, run the following.

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
pip install ...
```

## Front End
In the `frontend` folder, run the following.

### Install Dependencies
```bash
npm install react-router-dom mui @mui/material @emotion/react @emotion/styled @mui/icons-material
```

### Activate React
```bash
npm start
```