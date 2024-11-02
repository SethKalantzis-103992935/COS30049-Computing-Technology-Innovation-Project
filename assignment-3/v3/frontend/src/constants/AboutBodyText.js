/**
 * AboutBodyText.js
 * 
 * Author: Seth Kalantzis, Matthew Cross (Anti-Pesto Party)
 * Created: November 01, 2024.
 * Last Modified: November 01, 2024.
 * 
 * Purpose:
 * This object contains key informational sections related to the Breathe web app, covering the 
 * app's mission, data sources, machine learning models, backend framework, and frontend 
 * implementation. It is designed to provide structured information for use in the application's
 * about page.
 * 
 * Usage:
 * To access the body text information, import it as follows:
 * import { AboutBodyText } from '../constants/AboutBodyText';
 */

export const AboutBodyText = {
    ourMission: [
        "We created the Breathe web app out of a desire to raise awareness for environmental and respiratory health, especially in a day and age where climate change and air quality are of an ever-growing concern for the everyday person. Air quality directly impacts daily life across the world, and influences everything from general well-being to long-term health risks. As developers, we wanted to apply the technical skills we’ve gathered through various projects and experiences to provide a tool that could make real-world data on air quality and health impacts available to everyone. By harnessing machine learning, our application aims to deliver important insights that can guide personal and potentially policy-level decisions for improving environmental quality.",
        "Our mission is to provide a platform that empowers users to better understand the impact of air quality on health. With this application, we aim to create an intuitive, data-driven experience where users can engage with real data and predictions. Through this tool, we hope we can increase awareness and foster informed decision-making which benefits individuals and communities alike. In essence, our goal is to transform complex, illegible data into practical, accessible insights for the layman that encourage healthier lifestyles, environmental awareness, and inspire positive environmental change."
    ],
    dataSources: [
        "We leveraged high-quality data collected from reliable sources (predominantly government datasets) to ensure our predictions are accurate and grounded in real-world statistics. Our primary datasets were sources from HealthStats NSW and Air Quality NSW. The health stats provide accurate and essential information on public health trends, while the air quality data supplies the pollution metrics that power our machine learning models. These resources enable our application to predict health risks associated with air quality as accurately as possible.",
        "You can explore how the Air Quality Recording Sites map to the Local Health Districts in NSW in the map below."
    ],
    machineLearning: [
        "In order to deliver meaningful insights, we integrated several machine learning models, each with unique applications of the collected data. Our Linear Regression model predicts health statistics based on air pollutant levels, establishing correlations that help users understand the potential health impacts of pollutants commonly found in the air. Additionally, we implemented a K-Nearest Neighbour model to classify health risk levels, enabling users to enter new data and provide predictions on health outcomes, and their risk. Finally, we implemented our K-Means Clustering model to group data points based on pollutant concentration, providing a segmented view of pollutants by data cluster. Together, these models transform raw data into interactive, actionable insights that the everyday user can understand."
    ],
    fastApi: [
        "We chose FastAPI as our backend framework to facilitate a fast, efficient connection between the front end and the machine learning models. FastAPI allows for smooth, real-time API requests that provide users with a responsive experience. By handling user inputs and delivering model outputs, our FastAPI backend ensures reliable communication between the server and user, making it an ideal choice for our interactive, real-time AI application."
    ],
    react: [
        "Our application’s frontend, built with React, enables a responsive and user-friendly interface where users can submit pollutant data, received AI-driven insights, and explore visualized results seamlessly. React’s component-based structure allowed us to build modular and reusable elements, including input forms with real-time validation and Axios integration for smooth interaction with our FastAPI backend. Once user data is processed on the backend, the React state updates with the AI model’s predictions, triggering automatic re-rendering of the visualization components. To present model outputs interactively, we integrated Plotly in React for rich data visualizations. Plotly allows for responsive and interactive charts to explore classifications, trends and predictive insights produced by the machine learning models. Users can explore the insights further by zooming, panning, and hovering over data points, making complex results accessible and engaging. The application’s responsive design, combined with React and Plotly’s capabilities, enables users across devices to navigate air quality and health insights in an intuitive, dynamic experience."
    ]
};
