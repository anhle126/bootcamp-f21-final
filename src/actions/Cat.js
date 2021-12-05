// backend Cat file 1 - located in src/actions
// contains functions that frontend will call
// uses urls from "../../util/urls" for endpoints

import urls from "../../utils/urls";

// GET function, gets all the cats in the database
// requires no parameters
// function shouldn't have to be used by frontend but included for base case / necessity in future
export const getAllCats = () => {
    return fetch(urls.baseUrl + urls.api.shelter, {
        method: "GET",
        mode: "same-origin",
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API!");
        } else if (!json.success) {
            throw new Error(json.message);
        }

        return json.payload;
    })
}

// GET function, gets all adoptable cats in the database
// requires no parameters but creates parameter ?isAdopted=true
export const getAdoptableCats = () => {
    return fetch(urls.baseUrl + urls.api.shelter + "?isAdopted=true", {
        method: "GET",
        mode: "same-origin",
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API!");
        } else if (!json.success) {
            throw new Error(json.message);
        }

        return json.payload;
    })
}

// GET function, gets the detailed cat information of one specific cat
// requires catID parameter
export const getCatInfo = (catID) => {
    return fetch(urls.baseUrl + urls.api.shelter + "?catID=" + catID, {
        method: "GET",
        mode: "same-origin",
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API!");
        } else if (!json.success) {
            throw new Error(json.message);
        }

        return json.payload;
    })
}