// backend Cat file 2 - located in src/pages/api
// api endpoints, called by src/actions/Cat
// uses functions in server/mongodb/actions/Cat to handle parameters of api endpoints

import mongodb from "../../../server/mongodb";
import { getAllCats } from "../../../server/mongodb/actions/Cat";
import { getAdoptableCats } from "../../../server/mongodb/actions/Cat";
import { getCatInfo } from "../../../server/mongodb/actions/Cat";

export default async function handler (req, res) {
    await mongodb()
    const catID = req.query.catID
    const isAdopted = req.query.isAdopted

    // Cat only has three GET methods: getAllCats, getAdoptableCats, and getCatInfo
    if (req.method === 'GET') {

        // if a catID is provided, will getCatInfo
        if (catID) {
            getCatInfo(catID)
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
        } else {
            // if isAdopted is true, will getAdoptableCats
            if (isAdopted) {
                getAdoptableCats()
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
            } else {
                // for all other cases, will getAllCats
                getAllCats()
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
        }
    }
}