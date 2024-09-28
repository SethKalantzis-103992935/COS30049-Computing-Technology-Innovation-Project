![image](./images/logo-anit-pesto-party.png "Anti Pesto Party")

# Machine Learning Analysis of NSW Air Quality and Health Outcomes

Swinburne University of Technology\
COS30049 Computing Technology Innovation Project\
Semester 2, 2024

Henry Richardson - 104 420 453\
Seth Kalantzis - 103 992 935\
Matthew Cross - 101 828 627

# Overview

This project was completed as part of a student project for unit COS30049 at Swinburne University of Technology. The goal of the project was to develop machine learning models capable of analyzing the impact of air pollutants on health outcomes. Specifically, the project focused on data collected over a 10-year time span from 2014 to 2023 from within New South Wales (NSW), Australia.

The project implements relevant Regression, Classification and Clustering models in order to address different elements of the problem statement. Python 3.12, and relevant libraries, are utilized within the project for data preprocessing and analysis. All work is completed within Jupyter Notebooks.

# Environment Setup

### Prerequisites

Ensure that the following tools are installed on your local machine. Follow installation instructions for your specific Operating System.

- [pip](https://pip.pypa.io/en/stable/installation/)
- [Python](https://www.python.org/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Anaconda](https://docs.anaconda.com/anaconda/install/windows/)

### Dependencies

Install the following required dependencies.

```bash
pip install jupyter
pip install pandas
pip install matplotlib
pip install numpy
pip install seaborn
pip install scikit-learn
pip install ipywidgets
pip install kneed
pip install widgetsnbextension
```

Alternatively, you can choose to install all dependencies at once.
```bash
pip install jupyter pandas matplotlib numpy seaborn scikit-learn ipywidgets kneed widgetsnbextension
```

# Directory Structure
The provided .zip file contains all necessary raw data and scripts. The directory structure is as follows.

```bash
├── analysis/                           # Jupyter notebooks containing models and results
├── datasets/                           # Raw and processed data, processing scripts, and source information
│   ├── _integrate-data_/               # The final integrated and processed datasets
│   ├── air-quality/                    # Air quality datasets
│   │   ├── air-quality/                # Monthly data from 2000 - 2024 in 4 year intervals
│   ├── geography/                      # Data to map recording sites to local health districts
│   ├── health-stats/                   # Data for different health outcomes
│   │   ├── asthma-deaths/              # NSW Asthma deaths data
│   │   ├── asthma-edp/                 # NSW Asthma emergency department presentation data
│   │   ├── asthma-edp-monthly/         # NSW Asthma emergency department presentation data (monthly intervals)
│   │   ├── asthma-hospitalisations/    # NSW Asthma hospitalisations data
│   │   ├── asthma-pic/                 # NSW Asthma prevelance in children data
│   │   ├── copd-deaths/                # NSW Chronic Obstructive Pulmonary Disease deaths data
│   │   ├── copd-hospitalisations/      # NSW Chronic Obstructive Pulmonary Disease deaths data
│   │   ├── iap-deaths/                 # NSW Influenza and Pneumonia deaths data
│   │   ├── iap-hospitalisations/       # NSW Influenza and Pneumonia deaths data
├── images/                             # Images used in this README.md file
```

Individual datasets are processed within their unique directory, and all data and processing scripts are identified by the directory within which they are stored.

Each leaf directory will contain the following four files:

1. `raw.csv` / `raw.xls` / `raw.xlsx` [ Contains the raw data. ]
2. `processed.csv` [ Contains the processed data. ]
3. `process.ipynb` [ Contains the processing logic. ]
4. `source.md` [ Contains the source of the data. ]


# Data Preprocessing

### Individual Datasets

Data within each file has already been processed in the provided .zip file. To re-run the processing script, either navigate to the process.ipynb file and select 'run all'.

Alternatively, you can run the following command to execute the notebook in a browser window.

```bash
jupyter notebook path/to/file/process.ipynb          # Replace path/to/file with local path.
```
The processed data will be saved as `processed.csv`.

### Integrated Datasets

To uncover the greatest range of correlations possible, for separate integrated datasets were developed for use in the machine learning models.

Two of the four datasets were cleaned to prevent aggregated data based on 1-year intervals beginning from the start of the 2014/2015 financial year. These datasets incorporate a larger number of labels (Health Stats), which were typically provided in 1-year aggregates. The other two datasets present data in monthly intervals. These datasets contain fewer labels (Health Stats), but allow for the identification of cyclical trends within Air Pollutant levels. It was important for the analysis to be able to analyze the data at both levels of analysis.

The second division is whether the labels are divided into *male per 100,000 population* and *female per 100,000 population*, or whether they are left as simply *persons per 100,000 population*. Having the data divided in both ways allowed for the team to analyze how significant the impact on the health outcomes was for different genders.

The four final processed datasets are as follows:

- `processed-annual-gendered.csv`
- `processed-annual-genderless.csv`
- `processed-monthly-gendered.csv`
- `processed-monthly-genderless.csv`


# Model Training

Each model has been trained within the provided Jupyter Notebook. Each notebook within the `analysis` directory is named for the specific machine learning model it implements.

- `clusterin-k-means.ipynb` implements and PCA and K-Means analysis.
- `regression-linear.ipynb` implements a Linear Regression analysis.
- `classification-knn.ipynb` implements a KNN analysis.

Each of these models can be trained and reviewed by navigating to the `analysis` directory, opening the file and selecting 'run all'. 

Alternatively, you can run the following command to execute the notebook in a browser window.

```bash
jupyter notebook path/to/file/filename.ipynb          # Replace path/to/file with local path.
                                                      # Replace filename with the name of the file. 
```

# Selecting Different Datasets

Most of the models have been developed to accommodate the multiple datasets outlined in the Data Processing section. There are slight differences in how the specific dataset is selected and changed within each Jupyter Notebook. The steps to change the dataset are outlined below.

### Linear Regression Model

<p style='color: salmon'>Henry</p>

### K-Means Clustering Model

The model is designed to dynamically respond to any number of labels (Health Stats). The number of components used in the Principle Component Analysis is determined by analyzing the Cumulative Explained Variance and setting a minimum threshold of 0.8, and the number of clusters for the K-Means analysis is determined dynamically using the KneeLocator library. Additionally, output plots are designed to handle varying numbers of clusters and components. Therefore, no additional configuration is required after setting the path to the desired dataset for processing.

The change the dataset used, the user should follow the below steps:

1. Locate the `Load Data` section near the beginning of the notebook.
2. Review the `first code snippet` in the section to find the index of their desired dataset.
3. In the `second code snippet` change the `chosen_dataset` value to the index of their desired dataset.
4. Select `Run All` at the top left of the notebook to execute the analysis.

### KNN Classification Model

Unfortunately, unlike the other models, this model was designed to work with the aggregate data of the monthly genderless dataset, alongside the Asthma EDPs due to the larger amount of data compared to the other datasets. Due to this, only the provided dataset already implemented into the model currently provides training and prediction. No additional configuration is required to utilize the model in its current state.

The only required action to perform and review the analysis is to simply hit `Run All` in the top right of the Jupyter notebook.



# Prediction Guide

<p style='color: salmon'>Not sure. Anyone have thoughts on what to put for this? (if anything...)</p>
