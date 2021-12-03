// Call this file 1
// Located in src/pages/api
// This file is the api endpoint definition. 
// Here, we will call appropriate functions from file 2 when handling the parameter of the api
// endpoints and requests.

import mongodb from "../../../../server/mongodb";
import { getAllApplications } from "../../../../server/mongodb/actions/Application";
import { getApplicationInfo } from "../../../../server/mongodb/actions/Application";
import { setApproved } from "../../../../server/mongodb/actions/Application";


// How to handle POST/GET Request on an endpoint
// https://stackoverflow.com/questions/66739797/how-to-handle-a-post-request-in-next-js

export default async function handler (req, res) {
    await mongodb()

    if (req.method === 'GET') {
        // Either getAllApplications or getApplicationInfo
        const applicationID = req.query.applicationID
        const catID = req.query.catID

        if (!applicationID) {
            if (!catID) {
                return res.status(400).json({
                    success: false,
                    message: "Need either an application ID or a cat ID. " +
                    "Can't access all applications in database."
                })
            } else {
                await getAllApplications(catID)
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
            await getApplicationInfo(applicationID)
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
        if (!applicationID) {
            return res.status(400).json({
                success: false,
                message: "Can't update an application without application ID."
            })
        } else {
            await setApproved(applicationID)
            .then((result) => {
                return res.status(200).json({
                    success: true,
                    payload: result
                })
            }).catch((err) => {
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