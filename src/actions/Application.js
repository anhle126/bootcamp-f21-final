// Call this file 2
// Located in src/actions
// Front end will call from here
// This file will wrap around a file in server/mongodb/actions (file 3)
// This file SENDS the appropriate request (GET or POST or DELETE or UPDATE) to file 3

import fetch from "isomorphic-unfetch"
import urls from "../../utils/urls"

export const submitApplication = (application) => {
    
}
