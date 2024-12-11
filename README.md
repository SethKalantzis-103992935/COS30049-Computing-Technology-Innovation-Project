
![image](.assignment-3/v3/img/logo-anti-pesto-party.png "Anti Pesto Party")

# Full-Stack Web Development for AI Application

Swinburne University of Technology\
COS30049 Computing Technology Innovation Project\
Semester 2, 2024

Henry Richardson - 104 420 453\
Seth Kalantzis - 103 992 935\
Matthew Cross - 101 828 627

# Overview

This project was completed as part of a student project for unit COS30049 at Swinburne University of
Technology. The goal of the project was to develop a full stack web application where integrated the
machine learning models developed int previous projects to create meaningful and interactive 
visualisations.

The project implement a FastAPI backend, and React with MaterialUI components on the frontend.

# Environment Setup

### Prerequisites

Ensure that the following tools are installed on your local machine. Follow installation instructions for your specific Operating System.

- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 14+](https://nodejs.org/en/download/package-manager)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Directory Structure
```bash
assignment-3/
|
├── backend/
│   ├── __data/
│   │   └── annual.csv
│   │   
│   ├── __main.py
│   ├── __clustermodel.py
│   ├── __knnmodel.py
│   ├── __regressionmodel.py
│   └── ... (multiple .pkl files)
|
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components    # Custom React Components
│   │   ├── constants     # Constants used within the application
│   │   └── theme         # Color Pallette
│   │   
│   ├── package-lock.json
│   ├── package.json
│   └── ... (other stuff maybe)
|
├── img/
│   └── logo-anti-pesto-arty.png
│
└── README.md
```

## AI Models

The trained pickle files have already been generated and are included within the repository.\
To generate new files if changes are made to the models, navigate to the `backend` folder and run 
the following command for the desired mdoel.

```bash
# Linear Regression Model
python _regressionmodel.py

# KNN Classification Model
python _knnmodel.py

# K-Mean CLustering Model
python __clustermodel.py
```

## Backend

Navigate to to `backend` folder, and run the following commands.

### Set Up and Activate Virtual Environemnt
```bash
python -m venv venv

# Windows
venv\scripts\activate.bat

#Linux/ Mac
source venv/bin/activate
```

### Install Dependencies
```bash
pip install fastapi uvicorn logging joblib pydantic pandas numpy scikit-learn
```

### Activate FastAPI

Navigate to wherever we end up putting main.py, and run the following command.
```bash
uvicorn __main:app --reload
```

## Front End

Navigate to to `frontend` folder, and run the following commands.

### Install Dependencies

This step is not required. All dependencies have been included in the zip file provided with this assignment. If you would like 
to reinstall them, please fun the following command. 

```bash
npm install @emotion/react @emotion/styled @mui/icons-material @mui/material @testing-library/jest-dom @testing-library/react @testing-library/user-event axios plotly plotly.js react-select react-router react-router-dom react-router-hash-link
```

### Activate React
```bash
npm start
```
