// This file is the api endpoint definition. 
// Here, we will call appropriate functions from server/mongodb/actions/application to 
// interact with the database

import { getAllApplications } from "../../../../server/mongodb/actions/Application";
import { getApplicationInfo } from "../../../../server/mongodb/actions/Application";
import { setApproved } from "../../../../server/mongodb/actions/Application";


// How to handle POST/GET Request on an endpoint
// https://stackoverflow.com/questions/66739797/how-to-handle-a-post-request-in-next-js

export default async function handler (req, res) {

    const applicationID = req.query.applicationID
    const catName = req.query.catName
    if (req.method === 'GET') {
        // Either getAllApplications or getApplicationInfo

        if (!applicationID) {
            if (!catName) {
                return res.status(400).json({
                    success: false,
                    message: "Need either an application ID or a cat name. " +
                    "Can't access all applications in database."
                })
            } else {
                getAllApplications(catName)
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