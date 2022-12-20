const mongoose = require("mongoose")
<<<<<<< HEAD
const url="mongodb+srv://meseintoseguro:joelote123@titom.oms0y7u.mongodb.net/DataBase"

=======
const url="mongodb+srv://meseintoseguro:joelote123@titom.oms0y7u.mongodb.net/Queveo"
>>>>>>> master

mongoose.connect(url).then(e=>{console.log("we are conected to database")}).catch(e=>{console.log("base de datos no conectada")})