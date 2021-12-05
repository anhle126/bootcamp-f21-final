/api/shelter?isAdopted={true, false, undefined}: 
    GET request. Returns all the cats currently in the shelter that satisfies the isAdopted query parameter.

/api/shelter?catID={_id}: 
    returns the information of the specific cat. GET request.

/api/adoption/newApplication
    Handle POST requests. This is where we take in information from the adoption form and store it in our application database
    Adoption form in application database when sent should be sent along with the catID
/api/adoption/application?applicationID={}&catID={}&setApproved={true, false, undefined}
    Handle PUT requests
        Approve a specific application for this cat.
    Handle GET requests:
        Returns all applications for adoptions
        If catID is included, return all applications for that specific cat
        If applicationID is included, return all information of that specific application
