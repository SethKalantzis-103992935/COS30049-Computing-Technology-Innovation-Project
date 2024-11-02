/**
 * DataNames.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 29, 2024.
 * Last Modified: October 29, 2024.
 * 
 * Purpose:
 * This file exports arrays containing the pollutants and health statistics used in the application. 
 * These constants can be imported and used in components where pollutant and health data are 
 * needed for visualization and analysis.
 * 
 * Usage:
 * To use these constants, import them as follows:
 * import { pollutants, healthStats } from '../constants/DataNames';
 */

// Pollutants
export const pollutants = [
    'CO ppm',                        // Carbon monoxide concentration in parts per million (ppm)
    'NO pphm',                       // Nitric oxide concentration in parts per hundred million (pphm)
    'NO2 pphm',                      // Nitrogen dioxide concentration in parts per hundred million (pphm)
    'OZONE pphm',                    // Ozone concentration in parts per hundred million (pphm)
    'PM10 µg/m³',                    // Particulate matter (10 micrometers or smaller) in micrograms per cubic meter
    'SO2 pphm'                       // Sulfur dioxide concentration in parts per hundred million (pphm)
];

// Health Stats
export const healthStats = [
    'asthma deaths',                 // Number of deaths due to asthma
    'asthma edp',                    // Emergency department visits for asthma
    'asthma hospitalisations',       // Number of hospitalisations due to asthma
    'asthma pic',                    // Peak inspiratory capacity related to asthma
    'copd deaths',                   // Number of deaths due to chronic obstructive pulmonary disease (COPD)
    'copd hospitalisations',         // Number of hospitalisations due to COPD
    'iap deaths',                    // Number of deaths due to interstitial lung disease
    'iap hospitalisations'           // Number of hospitalisations due to interstitial lung disease
];
