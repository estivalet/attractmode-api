# attractmode-api

# retropie-api

mongod.exe --dbpath data

C:\Users\luisoft\apps\mongodb-3.6.4\bin\mongoimport --db retropiedb --collection systems --file data.json --jsonArray

show dbs;
use retropiedb;
show collections;
db.systems.find();
db.systems.drop();

nodemon server.js

----
mongoose add an 's' at the end of model definition, if want to keep original name:

schema.set('collection', 'actor');

----
drop old collection
 db.system.drop();