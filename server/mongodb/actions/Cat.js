import mongodb from "../index";
import Cat from "../models/Cat";

// getAllCats() function - gets all cats in the "cats" DB - unsure if used

// getAdoptableCats() function - gets all cats in the "cats" DB that have isAdopted = false

// getCatInfo(ObjectID catID) function - gets all fields of a "cats" document based on ObjectID

export async function getAllCats() {
    await mongodb();
    try {
        const cats = Cat.find();
        return {
            cats
        }
    } catch (e) {
        throw new Error("Cats could not be found")
    }
}

export async function getAdoptableCats() {
    await mongodb();

    try {
        const adoptableCats = Cat.find({ isAdoptable: {$eq: true}})
        return {
            adoptableCats
        }
    } catch (e) {
        throw new Error("Adoptable cats could not be found")
    }
}

export const getCatInfo = async (catID) => {
    if ((!catID) || catID == null) {
        throw new Error("no ID inputted")
    }
    await mongodb();
    const parsedID = new ObjectID(id)

    const cat = await Cat.find({_id: parsedID}).exec()
    console.log(cat)

    if (cat !== null) {
        return cat
    } else {
        throw new Error("Error when finding the cat you requested.");
    }

}