const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
const search=document.getElementById('searchbox')
const $searchbutton=document.querySelector('.searchbutton')
const studentName = localStorage.getItem("name");
const $logoutbtn=document.querySelector('.logout-btn')
var ab
let usersContainer = document.getElementById("jobs");

// $applybtn.addEventListener('click',(e)=>{
//     location.href='/student/applypage.html'
// })



$logoutbtn.addEventListener('click',async(e)=>{
  const confirmLogout=confirm("Are you sure you want to logout?");
  if(confirmLogout){
  const result = await fetch('/student/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+ localStorage.getItem('token')
      },
      body: JSON.stringify({
         
      })
  }).then((res)=>{
      localStorage.clear()
      location.href="/"
     // alert("success")
 return res.json()
  })
  console.log(result)
}
})


$searchbutton.addEventListener('click',async (e)=>{
  $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
  const companyName = document.getElementById('companyName').value
  const jobTitle = document.getElementById('jobTitle').value
  const Exp = document.getElementById('experience').value
  const jobType = document.getElementById('jobType').value
  const salary = document.getElementById('salary').value
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result = await fetch('/jobs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    },
    body: JSON.stringify({
 
})
  }).then((res) => res.json())
  //console.log(result);
   
  //  console.log(job)
   // console.log(document.getElementById("filtertype").value)
  // const filtertype = document.getElementById("filtertype").value
  // console.log(job)
 // return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)


 var filter = {
 
 };

let a1 = companyName , a2 = jobTitle ,a3 = jobType, a4= Exp , a5 = salary
if(a1)
 filter.companyname = a1
if(a2)
 filter.title = a2
if(a3)
 filter.worktype = a3
if(a4)
 filter.yoe = a4
if(a5)
 filter.salary = a5

console.log(filter)

var users = result.filter( function(item) {
  if(searchterm) {
    const job = item
    return  parseInt(job.yoe) == parseInt(searchterm) || job.companyname.toLowerCase().includes(searchterm) || job.title.toLowerCase().includes(searchterm) || job.worktype.toLowerCase().includes(searchterm) || parseInt(job.salary) == parseInt(searchterm)
   }
  for (var key in filter) {
    if (!item[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase()))
      return false;

  }
  return true;
});

console.log(users)

  const mappedUsers = users.map((job, index) => {
    return `<div class="job">
    <h1>Job Description</h1>
    <p>Company Name: ${job.companyname} </p>
    <p >Job Title : <span style="text-transform: uppercase; font-weight: bolder;">${job.title}</span></p>
    <p>Experience level: ${job.yoe} years</p>
    <p>
      Job Responsibilities:${job.requirements}
    </p>
    <p>Work Type: ${job.worktype} </p>
    <p>Employee type: ${job.emptype} </p>
    <p>Salary: ${job.salary} </p>
    <p>Employee benifits: ${job.empbenefits} </p>
    <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company</a></button><br />
      <button class="apply-btn btns"  onclick="window.location.href='applypage.html?jobid=${job._id}'" type="submit" value="Submit" > Apply </button>
      <button class="apply-btn btns"  onclick="window.location.href='applypage.html?jobid=${job._id}'" type="submit" value="Submit" > Share </button>  
  </div>`;
  });  

  console.log(mappedUsers)
  let load = document.getElementById("loadingDiv")
  load.remove()
  if(mappedUsers.length>0){

    usersContainer.innerHTML = mappedUsers
}
  else{
 
    alert("no matching results")
  }
})

window.onload=async()=>{

  $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');

    console.log("onload") 
    const result = await fetch('/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({
           
        })
    }).then((res) => res.json())
    console.log(result)

/*    let a = result.length;
    var companyName = document.getElementById('companyName').value
    var jobTitle = document.getElementById('jobTitle').value
    var Exp = document.getElementById('experience').value
*/

    const mappedUsers = result.map((job, index) => {
        return `<div class="job">
        <h1>Job Description</h1>
        <p>Company Name : ${job.companyname} </p>
        <p >Job Title : <span style="text-transform: uppercase; font-weight: bolder;">${job.title}</span></p>
        <p>Experience level : ${job.yoe} years</p>
        <p>
          Job Responsibilities :${job.requirements}
        </p>
        <p>Work Type : ${job.worktype} </p>
        <p>Employee type : ${job.emptype}</p>
        <p>Salary: ${job.salary} </p>
        <p>Employee benifits : ${job.empbenefits} </p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company </a></button><br/>
          <button class="apply-btn btns"  onclick="window.location.href='applypage.html?jobid=${job._id}'" type="submit" value="Submit" > Apply </button>
          <a href="#popup1"><button class="apply-btn btns" style="margin-left: 20px;" onclick= "getMail('${job.companyname}','${job.title}','${job.yoe}','${job.requirements}','${job.worktype}','${job.emptype}','${job.empbenefits}')">Share</buttton></a>
          
      </div>`;
      });
      var loader =document.getElementById("loadingDiv")
      loader.remove()
      if(mappedUsers.length>0){
        usersContainer.innerHTML += mappedUsers
    //    console.log(mappedUsers)
    }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
          // location.href="../student/studentindex.html"     <button class="apply-btn btns" style="margin-left: 20px;"  onclick= "getMail('${job.companyname}','${job.title}','${job.yoe}','${job.requirements}','${job.worktype}','${job.emptype}','${job.empbenefits}')"> Share </button> 
      }
}

async function getMail(companyname,title,yoe,requirements,worktype,emptype,empbenefits){

   ab = {
    companyname : companyname,
    title :title,
    yoe : yoe,
    requirements : requirements,
    worktype: worktype,
    emptype : emptype,
    empbenefits : empbenefits
  }
}

function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $( "#loadingDiv" ).remove(); //makes page more lightweight 
}); 
}

function btnClicked(mailid){
 
console.log(ab)
refer(ab.companyname,ab.title,ab.yoe,ab.requirements,ab.worktype,ab.emptype,ab.empbenefits,mailid)

}

async function refer(companyname,title,yoe,requirements,worktype,emptype,empbenefits,mailid){
console.log(companyname,title,yoe,requirements,worktype,emptype,empbenefits,mailid)
 if(mailid){
 const result2 = await fetch('/refer', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    name : studentName,
    mail : mailid,
    company : companyname,
    title : title,
    exp : yoe,
    responsibilities : requirements,
    worktype : worktype,
    emptype : emptype,
    empbenefits : empbenefits
})
  }).then((res) => res.json())
  console.log(result2)
}
}
