const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
const search=document.getElementById('searchbox')
const $searchbutton=document.querySelector('.searchbutton')
const $logoutbtn=document.querySelector('.logout-btn')

let usersContainer = document.getElementById("jobs");



$logoutbtn.addEventListener('click',async(e)=>{
  const confirmLogout=confirm("Are you sure you want to logout?");
  if(confirmLogout){
  const result = await fetch('/company/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+ token
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

window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/companypostedjobs?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     
    const mappedUsers = result.map((job, index) => {
        return `<div class="job">
        <h1>Job Description</h1>
        <p>Company Name : <span style="text-transform: uppercase; font-weight: bolder;"> ${job.companyname} </span> </p>
        <p>Job Title : ${job.title}</p>
        <p>Experience level : ${job.yoe} years</p>
        <p>
          Job Responsibilities : ${job.requirements}
        </p>
        <p>Work Type : ${job.worktype} </p>
        <p>Employee type : ${job.emptype} </p>
        <p>Salary : ${job.salary} </p>
        <p>Employee benifits : ${job.empbenefits} </p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="Aboutcompany.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}">  About Company</a></button><br />
      </div>`;
      });

      if(mappedUsers.length>0){
        usersContainer.innerHTML = mappedUsers;
        if(mappedUsers.length < 3){
          const  ab = document.getElementById("footer")
          ab.classList.add("foot");
        }
    }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
        location.href="/company/companyindex.html"
      }

}





$searchbutton.addEventListener('click',async (e)=>{
  const companyName = document.getElementById('companyName').value
  const jobTitle = document.getElementById('jobTitle').value
  const Exp = document.getElementById('experience').value
  const jobType = document.getElementById('jobType').value
  const salary = document.getElementById('salary').value
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result1 = await fetch(`/companypostedjobs?companyid=${localStorage.getItem('companyid')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    } 
  }).then((res) => res.json())
  
  
  var filter = {
 
  };
 
 let a1 = companyName , a2 = jobTitle ,a3 = jobType, a4= Exp , a5 = salary
 if(a1)
  filter.companyname = a1.toString().toLowerCase()
 if(a2)
  filter.title = a2.toString().toLowerCase()
 if(a3)
  filter.worktype = a3.toString().toLowerCase()
 if(a4)
  filter.yoe = a4.toString()
 if(a5)
  filter.salary= a5.toString()
 
 
 var users = result1.filter( function(item) {
   if(searchterm) {
     const job = item
     return  parseInt(job.yoe) == parseInt(searchterm) || job.companyname.toLowerCase().includes(searchterm) || job.title.toLowerCase().includes(searchterm) || job.worktype.toLowerCase().includes(searchterm) || parseInt(job.salary) == parseInt(searchterm)
    }
   for (var key in filter) {
     if (!item[key].toString().toLowerCase().includes(filter[key]))
       return false;
 
   }
   return true;
 });
 
 console.log(users)

  const mappedUsers = users.map((job, index) => {
    return `<div class="job">
    <h1>Job Description</h1>
    <p>Company Name: <span style="text-transform: uppercase; font-weight: bolder;"> ${job.companyname} </span> </p>
    <p>Job Title: ${job.title}</p>
    <p>Experience level: ${job.yoe} years</p>
    <p>
      Job Responsibilities:${job.requirements}
    </p>
    <p>Work Type: ${job.worktype} </p>
    <p>Employee type: ${job.emptype} </p>
    <p>Salary: ${job.salary} </p>
    <p>Employee benifits: ${job.empbenefits} </p>
    
    <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="Aboutcompany.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}">  About Company</a></button><br />
   
  </div>`;
  });

  if(mappedUsers.length>0){
    usersContainer.innerHTML = mappedUsers
    if(mappedUsers.length < 3){
      const  ab = document.getElementById("footer")
      ab.classList.add("foot")
    }
}
  else{
    alert("no matching results")
  }
})
 