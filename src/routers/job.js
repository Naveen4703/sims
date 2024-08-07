const job=require("../models/jobs.js")
const multer = require('multer')
const path = require('path');
const fs = require("fs");
const express=require("express")
const auth=require("../middleware/companyauth.js")
const studentAuth = require("../middleware/auth.js")
const adminAuth = require("../middleware/adminauth.js")
const application = require("../models/applications.js");
const qualified = require("../models/qualified.js")
const selected = require("../models/selected.js")
const student = require("../models/students.js")
const rejected = require("../models/rejected.js")
const { json } = require("express");
const company = require("../models/companies.js");
const admin = require("../models/admins.js")
const jobs=require("../models/jobs.js");
const { title } = require("process");
const { sendJobMails }=require("../emails/account.js")
const router = new express.Router()

var studentmails = ["vasileveva.ap@gmail.com","alex47nr@gmail.com","naveenchintu470378@gmail.com"]


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
 
var upload = multer({ storage: storage })
router.get("/jobtest",(req,res)=>{
    res.status(200).send({
        name:"server is working"
    })
})

//endpoint for creating user
router.post("/company/addjob",auth,upload.single('aboutcompany'),async(req,res)=>{
    var aboutcompany = fs.readFileSync(req.file.path);
    var encode_aboutcompany = aboutcompany.toString('base64');
    var final_aboutcompany = {
        contentType:req.file.mimetype,
        companyData:Buffer.from(encode_aboutcompany,'base64')
    };
    var mailsLength = studentmails.length;
    const newJob = new job({...req.body,aboutcompany:final_aboutcompany})
   // console.log(newJob)
    try{
     await newJob.save()
     for(let i=0; i< mailsLength; i++){
        sendJobMails(studentmails[i]);
     }
     res.status(200).send({newJob})
    }catch(e){
     res.status(400).send({error:"unable to add job."})
    }
  
 
 })
 router.get("/studentviewapplications",studentAuth,async(req,res)=>{
     try{
        const studentid = req.query.studentid
        var applications = await application.find({studentid})
        let newApplications = []
        let newResults=[]
        let j=0
        for(i=0;i<applications.length;i++){
            newApplications[i] = applications[i].jobid.toString()
        }
        
         const resultjobs=await jobs.find({})
        for( i=0;i<newApplications.length;i++){
            resultjobs.forEach(job => {
                if(newApplications[i]==job._id.toString()){
                    newobj = {}
                    newobj.companyname = job.companyname
                    newobj.title = job.title
                   newResults.push(newobj)
    
                }
            });
        }
        
         res.status(200).send({applications,newResults})
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/studentqualifiedapplications",studentAuth,async(req,res)=>{
     try{
        const studentid = req.query.studentid
        const applications = await qualified.find({studentid})
        let newApplications = []
        let newResults=[]
        let j=0
        for(i=0;i<applications.length;i++){
            newApplications[i] = applications[i].jobid.toString()
        }
        
         const resultjobs=await jobs.find({})
        for( i=0;i<newApplications.length;i++){
            resultjobs.forEach(job => {
                if(newApplications[i]==job._id.toString()){
                    newobj = {}
                    newobj.companyname = job.companyname
                    newobj.title = job.title
                   newResults.push(newobj)
    
                }
            });
        }
        
         res.status(200).send({applications,newResults})
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/studentselectedapplications",studentAuth,async(req,res)=>{
     try{
        const studentid = req.query.studentid
        const applications = await selected.find({studentid})
        let newApplications = []
        let newResults=[]
        let j=0
        for(i=0;i<applications.length;i++){
            newApplications[i] = applications[i].jobid.toString()
        }
        
         const resultjobs=await jobs.find({})
        for( i=0;i<newApplications.length;i++){
            resultjobs.forEach(job => {
                if(newApplications[i]==job._id.toString()){
                    newobj = {}
                    newobj.companyname = job.companyname
                    newobj.title = job.title
                   newResults.push(newobj)
    
                }
            });
        }
        
         res.status(200).send({applications,newResults})
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/studentrejectedapplications",studentAuth,async(req,res)=>{
     try{
        const studentid = req.query.studentid
        const applications = await rejected.find({studentid})
        let newApplications = []
        let newResults=[]
        let j=0
        for(i=0;i<applications.length;i++){
            newApplications[i] = applications[i].jobid.toString()
        }
        
         const resultjobs=await jobs.find({})
        for( i=0;i<newApplications.length;i++){
            resultjobs.forEach(job => {
                if(newApplications[i]==job._id.toString()){
                    newobj = {}
                    newobj.companyname = job.companyname
                    newobj.title = job.title
                   newResults.push(newobj)
    
                }
            });
        }
        
         res.status(200).send({applications,newResults})
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/studentprofile",studentAuth,async(req,res)=>{
     try{
        const studentid = req.query.studentid
        const studentDetails = await student.findById(studentid)
         res.status(200).send(studentDetails)
         console.log(studentDetails)
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/companyprofile",auth,async(req,res)=>{
     try{
        const companyid = req.query.companyid
        const companyDetails = await company.findById(companyid)
         res.status(200).send(companyDetails)
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/adminprofile",adminAuth,async(req,res)=>{
     try{
        const adminid = req.query.adminid
        const adminDetails = await admin.findById(adminid)
         res.status(200).send(adminDetails)
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.patch("/editprofile",studentAuth,async(req,res)=>{
     try{
        const studentid = req.query.studentid
        const studentDetails = await student.findByIdAndUpdate(studentid,req.body)
         res.status(200).send(studentDetails)
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.patch("/editcompanyprofile",auth,async(req,res)=>{
     try{
        const companyid = req.query.companyid
        const companyDetails = await company.findByIdAndUpdate(companyid,req.body)
         res.status(200).send(companyDetails)
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.patch("/editadminprofile",adminAuth,async(req,res)=>{
     try{
        const adminid = req.query.adminid
        const adminDetails = await admin.findByIdAndUpdate(adminid,req.body)
         res.status(200).send(adminDetails)
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.post("/jobs",studentAuth,async(req,res)=>{
    job.find().then((jobs)=>{
        //console.log(jobs)
        res.status(200).json(jobs)

    }).catch((err)=>{
        // console.log(err)
        res.status(400).send({error:"unable to get jobs"})
    })
 }) 
router.post("/apply/:jobid",studentAuth,upload.single('resume'),async(req,res)=>{
    const jobid = req.params.jobid
    //console.log(jobid)
    var resu = fs.readFileSync(req.file.path);
    var encode_resu = resu.toString('base64');
    var final_resu = {
        contentType:req.file.mimetype,
        resumeData:Buffer.from(encode_resu,'base64')
    };
    //console.log(final_resu)
    const newApplication = new application({...req.body,jobid,resume:final_resu})
    // console.log(newApplication,"test")
    // console.log(req.body)
    try{
        await newApplication.save()
        res.status(200).send({message:"job applied successfully"})
    }catch(e){
        console.log(e)
        res.status(400).send({error:e})
    }
     
})

router.get("/totaljobs",studentAuth,async(req,res)=>{
   try{
   const jobsCount  = await job.find().count()
    res.status(200).send({jobsCount})
   }catch(e){
    res.status(400).send({error:e})
   }
})
router.get("/appliedjobs",studentAuth,async(req,res)=>{
    try{
        const studentid = req.query.studentid
        const applicationsCount = await application.find({studentid}).count()
        const qualifiedCount = await qualified.find({studentid}).count()
        const selectedCount = await selected.find({studentid}).count()
        const rejectedCount = await rejected.find({studentid}).count()
        jobsCount = applicationsCount+qualifiedCount+selectedCount+rejectedCount
        res.status(200).send({jobsCount})
    }catch(e){
        res.status(400).send({error:e})
    }
})
 router.get("/myjobs",auth,async(req,res)=>{
    //console.log(req.body.id)
    job.find({postedby:req.body.companyid}).then((jobs)=>{
        //console.log(jobs)
        res.json(jobs)
    }).catch((err)=>{
        console.log(err)
    })
 })

router.delete("/delete",auth,async(req,res)=>{
    job.deleteOne({_id:req.body._id}).then((jobs)=>{
        res.json(jobs)
    }).catch((err)=>{
        console.log(err)
    })
})

 module.exports = router