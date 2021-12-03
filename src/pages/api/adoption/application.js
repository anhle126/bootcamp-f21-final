// Call this file 1
// Located in src/pages/api
// This file is the api endpoint definition. 
// Here, we will call appropriate functions from file 2 when handling the parameter of the api
// endpoints and requests.

import { getAllApplications } from "../../../../server/mongodb/actions/Application";
import { getApplicationInfo } from "../../../../server/mongodb/actions/Application";
import { setApproved } from "../../../../server/mongodb/actions/Application";


// How to handle POST/GET Request on an endpoint
// https://stackoverflow.com/questions/66739797/how-to-handle-a-post-request-in-next-js

export default async function handler (req, res) {

    const applicationID = req.query.applicationID
    const catID = req.query.catID
    if (req.method === 'GET') {
        // Either getAllApplications or getApplicationInfo

        if (!applicationID) {
            if (!catID) {
                return res.status(400).json({
                    success: false,
                    message: "Need either an application ID or a cat ID. " +
                    "Can't access all applications in database."
                })
            } else {
                getAllApplications(catID)
                .then((result) => {
                    return res.status(200).json({
                        success: true,
                        payload: result
                    })
                }).catch ((err) => {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    })
                })
            }
        } else {
            getApplicationInfo(applicationID)
            .then((result) => {
                return res.status(200).json({
                    success: true,
                    payload: result
                })
            }).catch ((err) => {
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            })
        }
    } else if (req.method === 'PUT') {
        // Update the application to approved
        console.log("HERE AT THE BEGINNING")
        console.log(applicationID)
        console.log("ApplicationID just printed")
        if (!applicationID) {
            console.log("ApplicationID is null or something.")
            return res.status(400).json({
                success: false,
                message: "Can't update an application without application ID."
            })
        } else {
            console.log("About to set approved")
            await setApproved(applicationID)
            .then((result) => {
                console.log("Out of setapproved")
                return res.status(200).json({
                    success: true,
                    payload: result
                })
            }).catch((err) => {
                console.log("Got an error")
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Can't process this request at this endpoint."
        })
    }
}