import mongodb from "../../../server/mongodb";
import { getAllCats } from "../../../server/mongodb/actions/Cat";
import { getAdoptableCats } from "../../../server/mongodb/actions/Cat";
import { getCatInfo } from "../../../server/mongodb/actions/Cat";

// what should the file name be? should there just be a file called shelter.js?

export default async function handler (req, res) {
    await mongodb()

    if (req.method === 'GET') {
        const catID = req.query.catID
        const isAdopted = req.query.isAdopted

        if (catID) {
            await getCatInfo(catID)
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
                await getAdoptableCats()
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
                await getAllCats()
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