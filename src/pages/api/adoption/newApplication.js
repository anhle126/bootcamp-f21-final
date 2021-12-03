// Call this file 1
// Located in src/pages/api
// This file is the api endpoint definition. 
// Here, we will call appropriate functions from file 2 when handling the parameter of the api
// endpoints and requests.

import { submitApplication } from "../../../../server/mongodb/actions/Application";

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(400).json({
            success: false,
            message: "Only POST method allowed here."
        })
    } else {
        submitApplication(req.body)
        .then((application) => {
            console.log("Returning application from submitApplication")
            console.log(application)
            return res.status(200).json({
                success: true,
                payload: application
            })
        }).catch((err) => {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        })
        
    }      
}