import mongoDB from "../index";
import Cat from "../models/Cat";

// getAllCats() function - gets all cats in the "cats" DB - unsure if used

// getAdoptableCats() function - gets all cats in the "cats" DB that have isAdopted = false

// getCatInfo(ObjectID catID) function - gets all fields of a "cats" document based on ObjectID

export async function getAllCats() {
    await mongoDB();

    try {
        const cats = shelter.find();

        return {
            cats
        }
    } catch (e) {
        throw new Error("cats could not be found")
    }
}

export async function getAdoptableCats() {
    await mongoDB();

    try {
        const adoptableCats = shelter.find({ isAdoptable: {$eq: true}})

        return {
            adoptableCats
        }

    } catch (e) {
        throw new Error("adoptable cats could not be found")
    }
}

export async function getCatInfo({ catID }) {
    if (catID == null) {
        throw new Error("no ID inputted")
    }
    await mongoDB();

    try {
        const cat = shelter.find({ ObjectID: {$eq: catID}})

        return {
            cat
        }

    } catch (e) {
        throw new Error("Invalid catID");
    }
}