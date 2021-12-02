// Call this file 3
// Located in server/mongodb/actions
// This is where the connection to the database actually happens

// Mongoose important documentation https://devdocs.io/mongoose/
// Mongoose original documentation from the website (but I think the one above works better) https://mongoosejs.com/docs/guide.html
import mongodb from "../index"
import Application from "../models/Adoption"
import Cat from "../models/Cat"

export async function getApplicationInfo(id) {
    if ((!id) || (id == null)) {
        throw new Error("Application ID is null.")
    }

    await mongodb()
    const application = await Application.find({_id: id})

    // How to check if the query returned is empty https://stackoverflow.com/questions/45172700/what-does-mongoose-return-when-a-find-query-is-empty

    if (application.length === 1) {
        // Found exactly one application
        return {
            _id: id,
            name: application.name,
            location: application.location,
            email: application.email,
            phone: application.phone,
            explanation: application.explanation,
            isApproved: application.isApproved,
            catID: application.catID
        }
    } else {
        // Something went wrong. Either found > 1 applications with the id passed in, or 
        // no application was found
        throw new Error("Error when finding the application you requested.")
    }
}

// https://codedec.com/tutorials/how-to-setup-up-schema-for-mongodb-using-mongoose/#:~:text=Use%20the%20Mongoose.Schema%20%28%29%20function%20to%20specify%20the,created%20automatically%20and%20is%20unique%20for%20each%20object.
export async function submitApplication(application) {
    await mongodb()

    Adoption.create({
        name: application.name,
        location: application.location,
        email: application.email,
        phone: application.phone,
        explanation: application.exaplanation,
        isApproved: false,
        catID: application.catID
    }).then ((err, newApplication) => {
        if (err) {
            throw new Error(err);
        } else {
            return "Successfully saved your application."
        }
    })
}

export async function getAllApplications(catID) {
    if (catID == null) {
        throw new Error("Cat ID is null. Can't proceed.")
    }

    await mongodb()
    const allApplications = await Adoption.find( {catID: catID} )

    if (allApplications.length === 0) {
        throw new Error("Can't find any applications for this cat :( .")
    } else {
        return allApplications
    }
}


// How to update document in mongoose https://masteringjs.io/tutorials/mongoose/update
export async function setApproved(applicationID) {
    if (applicationID == null) {
        throw new Error("Can't find the application with a null ID.")
    }

    await mongodb()
    const application = await Application.find( {_id: id} )

    if (application.length === 1) {
        // Found exactly one application
        const approvedApplication = await Application.findOne( {isApproved: true} ) 

        if (approvedApplication.length === 0) {
            // Approve this application
            application.isApproved = true
            await application.save()
            
            // Set cat to alread adopted
            const catAdopted = await Cat.find( {_id: approvedApplication.catID} )
            catAdopted.isAdopted = true
            await catAdopted.save()
        } else {
            throw new Error("This cat already has an approved application. Can't approve 2 applications.")
        }
    } else {
        // Something went wrong. Either found > 1 applications with the id passed in, or 
        // no application was found
        throw new Error("Error when finding the appliation you requested.")
    }
}