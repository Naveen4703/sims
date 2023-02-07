const express=require('express')
require("./db/mongoose.js")
const path=require('path')
const student=require("./models/students.js")
const studentRouter=require("./routers/student.js")
const company=require("./models/companies.js")
const companyRouter=require("./routers/company.js")
const admin=require("./models/admins.js")
const adminRouter=require("./routers/admin.js")
const jobsRouter = require('./routers/job.js')
const contactRouter = require('./routers/contact.js')

const app=express()

const port=process.env.PORT || 4000
const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(studentRouter)
app.use(companyRouter)
app.use(adminRouter)
app.use(jobsRouter)
app.use(contactRouter)

app.listen(port,()=>{
    console.log("server is up and running on ",port)
})