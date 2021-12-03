import mongodb from "../../../server/mongodb";
import { getAllCats } from "../../../server/mongodb/actions/Cat";
import { getAdoptableCats } from "../../../server/mongodb/actions/Cat";
import { getCatInfo } from "../../../server/mongodb/actions/Cat";

export default async function handler (req, res) {
    await mongodb()

    if (req.method === 'GET') {
        const catID = req.query.catID
        const isAdopted = req.query.isAdopted

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