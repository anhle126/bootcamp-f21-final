import mongodb from "../index";
import Cat from "../models/Cat";

export async function getAllCats() {
    await mongodb();
    const cats = Cat.find();
    if (cats !== null) {
        return cats
    } else {
        throw new Error("Cats could not be found")
    }
}

export async function getAdoptableCats() {
    await mongodb();
    const adoptableCats = Cat.find({isAdopted: {$eq: true}})
    if (adoptableCats !== null) {
        return adoptableCats
    } else {
        throw new Error("Adoptable cats could not be found")
    }
}

export const getCatInfo = async (catID) => {
    if ((!catID) || catID == null) {
        throw new Error("no ID inputted")
    }
    await mongodb();

    const cat = await Cat.find({_id: catID})

    if (cat !== null) {
        return cat
    } else {
        throw new Error("Error when finding the cat you requested.");
    }

}