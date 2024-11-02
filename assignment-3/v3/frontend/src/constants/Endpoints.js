/**
 * Endpoint.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 29, 2024.
 * Last Modified: October 29, 2024.
 * 
 * Purpose:
 * This file exports constants representing the API endpoints used for accessing different machine 
 * learning model predictions in the application. These constants can be imported wherever API calls 
 * are made to ensure consistent endpoint usage.
 * 
 * Usage:
 * To use these endpoints, import them as follows:
 * import { linearEndPoint, kMeanEndPoint, knnEndPoint } from '../constants/Endpoint';
 */

// API Endpoints
export const linearEndPoint = 'http://127.0.0.1:8000/regression-model';  // Linear regression model
export const kMeanEndPoint = 'http://127.0.0.1:8000/cluster-model';      // K-Means clustering model
export const knnEndPoint = 'http://127.0.0.1:8000/knn-model';            // KNN model