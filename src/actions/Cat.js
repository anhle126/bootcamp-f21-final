import fetch from "ismorphic-unfetch";
import urls from "../../utils/urls";

export const getAllCats = () => {
    return fetch(url.baseUrl + urls.api.shelter, {
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

export const getAdoptableCats = () => {
    return fetch(url.baseUrl + urls.api.shelter + "?isAdopted=true", {
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

export const getCatInfo = (catID) => {
    return fetch(url.baseUrl + urls.api.shelter + "?catID=" + catID, {
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