import mongoDB from "../index";
import Application from "../models/Application";

// submitApplication(Application object) - create new document in "applications" DB
    // checks if invalid

// getAllApplications(ObjectID catID) - gets all applications associated with that catID

// getApplicationInfo(ObjectID applicationID) - gets all fields of an "applications" document based on ObjectID

// setApproved(ObjectID applicationID) - if all other applications' isApproved is false, change isApproved for that particular application to true
    // change cat's isAdopted to true