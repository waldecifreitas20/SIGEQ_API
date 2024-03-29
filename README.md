# SIGEQ API
 A NodeJS application made using expressJS framework and postgreSQL as a database. For security it uses bcryptJS and JWT. All Endpoints of equipments require JWT to be reached. The user password is save into database as a hash, generated by bcrypt library. The goals of this project at first is becoming equipments control better and efficient, personal deveplopment, and aggregate knowledge about web development.

API's Endpoints:

 For authentication:
 
 - /auth/authenticate (POST)
 - /auth/register     (POST)
 - /auth/check_token  (POST)
 
 For CRUD of equipments:
 
 - /equipment/create                            (POST)
 - /equipment/all/?start_id=${id}&&limit=${int} (GET)
 - /equipment/delete/:id                        (DELETE)
 - /equipment/search/limit=${int}               (POST)
 - /equipment/update                            (PUT)

 
HTTP STATUS SENT:

 - 200 : Sucess
 - 204 : Sucess, but response does not have body
 - 400 : Invalid request
 - 401 : Not authorized to reach that endpoint
 - 404 : Url requested does not exist

ERROR CODES SENT ON RESPONSES:
 
 <> For Equipment:
 - '11001' : Equipment not registered yet, 
 - '11002' : Required fields missing
 - '11004' : Id not found on request body
 - '11005' : Id sent is not integer
 
 <> For Authentication:
 - '12101' : No token found on request headers
 - '12102' : Bearer not found on token
 - '12103' : Invalid token
 
 <> For Authorization:
 - '12201' : CREATE's permission is required to reach this route
 - '12202' : READ's permission is required to reach this route
 - '12203' : UPDATE's permission is required to reach this route
 - '12204' ; DELETE's permission is required to reach this route

 <> For Login
 - '12301' : Invalid credentials at login
 
 <> For Requests
 - '13101' : Endpoint does not exist
 - '13102' : Invalid http method for this endpoint
 - '13103' : Request body is empty

 <> For Request Body
 - '22P02' : Invalid value of foreign key
 - '23503' : Id does not exist into the database
 - '23505' : Object already existing
 - '42883' : Resquest body is not a JSON 
 - '22001' : There is at least one field on request body too much long
