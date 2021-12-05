// Front end will call the functions in here to fetch data / post data.
// Wrap around the fetching operations for front end to use
// This file sends the appropriate request (GET or POST or DELETE or UPDATE) to APIs endpoints

import fetch from "isomorphic-unfetch"
import urls from "../../utils/urls"

export const submitApplication = (application) => {
    fetch(urls.dbUrl + urls.adoption.newApplication, {
        method: "POST",
        mode: "same-origin",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {application} )
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API")
        } else if (!json.success) {
            throw new Error(json.message)
        }
        return json.payload
    })
};

export const getAllApplications = (catName) => {
    fetch(urls.dbUrl + urls.adoption.applicationQuery + `?catID=${catID}`, {
        method: "GET",
        mode: "same-origin",
        credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API.")
        } else if (!json.success) {
            throw new Error(json.message)
        } 
        return json.payload
    })
}

export const getApplicationInfo = (applicationID) => {
    fetch(urls.dbUrl + urls.adoption.applicationQuery + `?applicationID=${applicationID}`, {
        method: "GET",
        mode: "same-origin",
        credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API.")
        } else if (!json.success) {
            throw new Error(json.message)
        } 
        return json.payload
    })
}

export const setApproved = (applicationID) => {
    fetch(urls.dbUrl + urls.adoption.applicationQuery + `?applicationID=${applicationID}`, {
        method: "PUT",
        mode: "same-origin",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API.")
        } else if (!json.success) {
            throw new Error(json.message)
        } 
        return json.success
    })
}