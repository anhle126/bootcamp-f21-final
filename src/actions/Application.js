// Call this file 2
// Located in src/actions
// Front end will call from here
// This file will wrap around a file in server/mongodb/actions (file 3)
// This file SENDS the appropriate request (GET or POST or DELETE or UPDATE) to file 3

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

export const getAllApplications = (catID) => {
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