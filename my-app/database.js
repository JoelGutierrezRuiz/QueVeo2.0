const mongoose = require("mongoose")
const url="mongodb+srv://meseintoseguro:joelote123@titom.oms0y7u.mongodb.net/Queveo"

mongoose.connect(url).then(e=>{console.log("we are conected to database")}).catch(e=>{console.log("base de datos no conectada")})