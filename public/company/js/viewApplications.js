//const { application } = require("express");

const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");
const search=document.getElementById('searchbox')
const $searchbutton=document.querySelector('.searchbutton')
var userfilter = false;



window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/viewapplications?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     
    const mappedUsers = result.map((application, index) => {
        return `<div class="job">
        <h1>Application details</h1>
        <p>Student Name: <span id="findname"> ${application.firstname} </span></p>
        <p>Email: ${application.email}</p> 
        <p>Age: <span id="findage">${application.age}</span></p>
        <p>Phone: ${application.phone}</p>
        <p>Gender: ${application.gender}</p>
        <button class="btn" ><i class="fa-solid fa-download fa-1x"></i><a innerHtml="Download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download Resume</a></button><br />

        <button class="btn"  onclick="window.location.href='qualified.html?applicationid=${application._id}'" type="submit" value="Submit" > Qualify </button>    
        <button class="btn"  onclick="window.location.href='rejected.html?applicationid=${application._id}'" type="submit" value="Submit" > Reject </button> 
          
      </div>`;
      });
      if(mappedUsers.length>0){
        usersContainer.innerHTML = mappedUsers
    }
      else{
           alert("Applications Empty") 
           usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/company/companyindex.html"
      }
}


$searchbutton.addEventListener('click',async (e)=>{
  let searchterm = search.value.toLowerCase();

  const result1 = await fetch(`/viewapplications?companyid=${localStorage.getItem('companyid')}`, {
    method: 'GET',
    headers: {
       
        'Authorization':'Bearer '+token
    },
    
}).then((res) => res.json())
 
  const mappedUser = result1.map((application, index) => {
    return `<div class="job">
    <h1>Application details</h1>
    <p>Student Name: <span id="findname"> ${application.firstname} </span></p>
    <p>Email: ${application.email}</p> 
    <p>Age: <span id="findage">${application.age}</span></p>
    <p>Phone: ${application.phone}</p>
    <p>Gender: ${application.gender}</p>
    <button class="btn" ><i class="fa-solid fa-download fa-1x"></i><a innerHtml="Download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download Resume</a></button><br />

    <button class="btn"  onclick="window.location.href='qualified.html?applicationid=${application._id}'" type="submit" value="Submit" > Qualify </button>    
    <button class="btn"  onclick="window.location.href='rejected.html?applicationid=${application._id}'" type="submit" value="Submit" > Reject </button> 
      
  </div>`;
  });


  if(mappedUser.length>0){
  usersContainer.innerHTML = ""
  for(let z=0; z<mappedUser.length;z++){
    const parser = new DOMParser();
    var str1 = parser.parseFromString(mappedUser[z], "text/html");
    var str2 = str1.getElementById("findname").textContent.toLowerCase()
    var str3 = str1.getElementById("findage").textContent

    

   if(str2.includes(searchterm)){
     usersContainer.innerHTML += mappedUser[z]
     console.log(str2.includes(searchterm) , str2 , searchterm)
     userfilter = true
    }
    if(str3 == searchterm){
    usersContainer.innerHTML += mappedUser[z]
    console.log(str2 == searchterm , searchterm)
    userfilter = true
    }
    }
  /*  document.getElementById("jobs").innerHTML = " ";
    for(let y=0; y< userfilter.length; y++){ 
     usersContainer.innerHTML += userfilter[y] ;
    }
    mappedUser == null? alert("no Such results") : 0

*/

if(!userfilter){
  alert("No such result")
  location.href="/company/viewapplications.html"
}
  }
  else{
    alert("Applications Empty") 
  usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
    location.href="/company/companyindex.html"
}

})
