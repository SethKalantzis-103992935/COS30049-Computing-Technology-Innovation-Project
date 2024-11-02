/**
 * DisplayNames.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 29, 2024.
 * Last Modified: October 29, 2024.
 * 
 * Purpose:
 * This file exports an object that maps health statistics to their display names used in the 
 * application. This mapping is useful for presenting user-friendly names in the UI when displaying 
 * health-related data.
 * 
 * Usage:
 * To use these display names, import the object as follows:
 * import { displayNames } from '../constants/DisplayNames';
 */

// Display names for health statistics
export const displayNames = {
    "asthma deaths": "Asthma Deaths",
    "asthma edp": "Asthma Emergency Department Presentations",
    "asthma hospitalisations": "Asthma Hospitalisations",
    "asthma pic": "Asthma Prevalence in Children",
    "copd deaths": "Chronic Obstructive Pulmonary Disease Deaths",
    "copd hospitalisations": "Chronic Obstructive Pulmonary Disease Hospitalisations",
    "iap deaths": "Influenza and Pneumonia Deaths",
    "iap hospitalisations": "Influenza and Pneumonia Hospitalisations",
    "knn": 'KNN Classification',
    "linear": 'Linear Regression',
    "kmeans": 'K-Means Clustering',
};
