/** 
 * @fileoverview App.js
 * 
 * Author: Patrick Mejia
 * Date: 2025-02-26
 * Description: This file contains the main logic for the application.
 * 
 * @license Copyright (c) 2025 Patrick Mejia. All rights reserved.
 */

// Importing the required modules
import { createApp } from 'vue';

/**
 * @description This function initializes the Vue application.
 * @param {Object} app - The Vue application instance.
 * @returns {void}
 * @throws {Error} If the app is not a Vue instance.
 */
function initApp(app) {
    if (!app) {
        throw new Error('App is not a Vue instance');
    }
    // Initialize the app with the required components and plugins
    app.mount('#app');
}

/**
 * 
 * @param {string} name - The name of the person
 * @returns {void}
 */
function onSubmitForm(name){
    console.log("Birthday submitted");
    const birthday = document.getElementById("birthday").value;
    console.log(birthday);
    const birthdayDate = new Date(birthday);
    const today = new Date();
}

/**
 * @description This function shows how long until the persons next birthday.
 * @param {string} name - The name of the person
 * @param {string} birthday - The birthday of the person
 * @returns {void}
 */
function showNextBirthday(name, birthday) {
    const birthdayDate = new Date(birthday);
    const today = new Date();
    birthdayDate.setFullYear(today.getFullYear());
    if (today > birthdayDate) {
        birthdayDate.setFullYear(today.getFullYear() + 1);
    }
    const timeDiff = birthdayDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(`Hello ${name}, your next birthday is in ${daysDiff} days.`);
}

/**
 * @description This function displays the age of the person.
 * @param {string} name - The name of the person
 * @param {string} birthday - The birthday of the person
 * @returns {void}
 */
function displayAge(name, birthday) {
    const birthdayDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthdayDate.getFullYear();
    const m = today.getMonth() - birthdayDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
        age--;
    }
    console.log(`Hello ${name}, you are ${age} years old.`);
}

// Create the Vue application instance
const app = createApp({});
// Initialize the app
initApp(app);
// Export the app instance
export default app;
// Export the initApp function
export { initApp };
// Export the app instance
export { app };

