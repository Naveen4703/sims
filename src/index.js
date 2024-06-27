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
const dotnev = require('dotenv').config()
const treblle = require('@treblle/express')

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

//  API Documentation tool
app.use(
    treblle({
      apiKey: "tGMM21jm4cYeSi9ySK0Gtn1YcNivgz7m",
      projectId: "83LQQqokF1SAoJhb",
      additionalFieldsToMask: [],
    })
  )

app.listen(port,()=>{
    console.log(`server is up and running on http://localhost:${port}`)
})
