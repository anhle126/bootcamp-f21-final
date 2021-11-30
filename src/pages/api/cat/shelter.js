import { getAllCats } from "../../../../server/mongodb/actions/Cat";

const handler = (req, res) =>
    getAllCats()

    // unsure what to do with getAdoptableCats and getCatInfo

export default handler;