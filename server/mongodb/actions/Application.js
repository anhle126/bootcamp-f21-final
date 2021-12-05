// This is where the connection to the database actually happens

// Mongoose important documentation https://devdocs.io/mongoose/
// Mongoose original documentation from the website (but I think the one above works better) https://mongoosejs.com/docs/guide.html
import mongodb from "../index"
import Cat from "../models/Cat"
import Application from "../models/Application"

const ObjectId = require('mongodb').ObjectId

export const getApplicationInfo = async (id) => {
    if ((!id) || (id == null)) {
        throw new Error("Application ID is null.")
    }

    await mongodb()
    const parsedID = new ObjectId(id)

    const application = await Application.find({_id: parsedID}).exec()
    
    // How to check if the query returned is empty https://stackoverflow.com/questions/45172700/what-does-mongoose-return-when-a-find-query-is-empty
    if (application !== null) {
        return application
    } else {
        throw new Error("Error when finding the application you requested.")
    }
}

// https://codedec.com/tutorials/how-to-setup-up-schema-for-mongodb-using-mongoose/#:~:text=Use%20the%20Mongoose.Schema%20%28%29%20function%20to%20specify%20the,created%20automatically%20and%20is%20unique%20for%20each%20object.
export const submitApplication = async (application) => {
    await mongodb()

    const newApplication = await new Application(application)
    await newApplication.save(function(err) {
        if (err) {
            throw new Error(err)
        } 
    })
    return newApplication
}

export const getAllApplications = async (catID) => {
    if (catID == null) {
        throw new Error("Cat ID is null. Can't proceed.")
    }

    await mongodb()
    const allApplications = await Application.find( {catID: catID} )

    if (allApplications.length === 0) {
        throw new Error("Can't find any applications for this cat :( .")
    }
    
    return allApplications
}

// How to update document in mongoose https://masteringjs.io/tutorials/mongoose/update
export const setApproved = async (applicationID) => {
    if (applicationID == null) {
        throw new Error("Can't find the application with a null ID.")
    }

    console.log("Inside setApproved")
    await mongodb()

    const parsedID = new ObjectId(applicationID)
    await Application.find( {_id: parsedID} ).exec()
    .then(async (appToSetArray) => {
        if (!appToSetArray) {
            throw new Error("Can't find the application with this ID.")
        } else {
            if (appToSetArray.length === 1) {
                const catID = appToSetArray[0].catID
                const parsedCatID = new ObjectId(catID)

                const appToSet = appToSetArray[0]
                await Cat.find( {_id: parsedCatID} ).exec()
                .then(async (catToAdoptArray) => {
                    if (!catToAdoptArray) {
                        throw new Error("Can't find the cat you want to adopt.")
                    } else {
                        if (catToAdoptArray.length === 1) {
                            // Set the cat to adopted (check to see if it has already been adopted)
                            // Set application to approved

                            const catToAdopt = catToAdoptArray[0]

                            if (catToAdopt.isAdopted === false) {
                                catToAdopt.isAdopted = true
                                await catToAdopt.save()

                                appToSet.isApproved = true
                                await appToSet.save()

                                return "Application approved sucessfully."
                            } else {
                                throw new Error("This cat has already been adopted.")
                            }
                        } else {
                            throw new Error("There was en error when looking for this cat.")
                        }
                    }
                })
            } else {
                throw new Error("There was an error when looking for your application.")
            }
        }
    })

    return "Successfully approved this application."
}