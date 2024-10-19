from setuptools import setup, find_packages

setup(
    name='k-means',
    version='0.1',
    description='KMeans clustering model for respiratory health and air quality data',
    packages=find_packages(),
    install_requires=[
        'pandas',
        'numpy',
        'joblib',
        'scikit-learn'
    ]
)