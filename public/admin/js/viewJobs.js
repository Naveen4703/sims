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
  const result = await fetch('/admin/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+token
      },
      body: JSON.stringify({
         
      })
  }).then((res)=>{
      localStorage.clear()
      location.href="/"
     // alert("success")
     return res.json()
  })
}   
})


$searchbutton.addEventListener('click',async (e)=>{
  const companyName = document.getElementById('companyName').value
  const jobTitle = document.getElementById('jobTitle').value
  const Exp = document.getElementById('experience').value
  const jobType = document.getElementById('jobType').value
  const salary = document.getElementById('salary').value
  const searchterm = search.value.toLowerCase();
  const result = await fetch('/adminjobs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    },
    body: JSON.stringify({
 
})
  }).then((res) => res.json())
 
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
filter.empbenefits= a5

console.log(filter)

var users = result.filter( function(item) {
 if(searchterm) {
   const job = item
   return  parseInt(job.yoe) == parseInt(searchterm) || job.companyname.toLowerCase().includes(searchterm) || job.title.toLowerCase().includes(searchterm) || job.worktype.toLowerCase().includes(searchterm)|| job.empbenefits.toString().includes(searchterm)
  }
 for (var key in filter) {
  var abc =  item[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase())
  console.log(!item[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase()))
 //  if (item[key].toString().toLowerCase() === undefined || item[key].toString().toLowerCase().includes(!filter[key].toString().toLowerCase()))
  if(!item[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase())) 
   return false;
 }
 return true;
});

console.log(users)

 
 const mappedUsers = users.map((job, index) => {
    return `<div class="job">
    <h1>Job Description</h1>
    <p>Company Name: ${job.companyname} </p>
    <p>Job Title: ${job.title}</p>
    <p>Experience level: ${job.yoe} years</p>
    <p>
      Job Responsibilities:${job.requirements}
    </p>
    <p>Work Type: ${job.worktype} </p>
    <p>Employee type: ${job.emptype} </p>
    <p>Employee benifits: ${job.empbenefits} </p>
    <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company</a></button><br />   
  </div>`;
  });

 //console.log("mpusers",mappedUsers)
  if(mappedUsers.length>0){
    usersContainer.innerHTML = mappedUsers;
    if(mappedUsers.length < 3){
      const  ab = document.getElementById("footer")
       ab.classList.add("foot")
     }
}
  else{
    alert("no matching results")
  }   
})




window.onload=async()=>{
    console.log("onload") 
    const result = await fetch('/adminjobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({ 
          
        })
    }).then((res) => res.json())
    console.log(result)

    const mappedUsers = result.map((job, index) => {
        return `<div class="job">
        <h1>Job Description</h1>
        <p>Company Name: ${job.companyname} </p>
        <p>Job Title: ${job.title}</p>
        <p>Experience level: ${job.yoe} years</p>
        <p>
          Job Responsibilities:${job.requirements}
        </p>
        <p>Work Type: ${job.worktype} </p>
        <p>Employee type: ${job.emptype} </p>
        <p>Employee benifits: ${job.empbenefits} </p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company</a></button><br />
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
        alert("Matching job not found") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/admin/adminindex.html"
      }

}
 

  






// var list = document.createElement('ul');

// Create a list item for each wizard
// and append it to the list
// result.forEach(function (res) {
// 	// var li = document.createElement('li');
// 	// li.textContent = wizard;
// 	// list.appendChild(li);
//     console.log(res)
// });
 