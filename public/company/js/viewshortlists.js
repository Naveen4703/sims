const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body');
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


window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/viewshortlists?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     console.log(result)
    const mappedUsers = result.map((application, index) => {
        return `<div class="job">
        <h1>Application details</h1>
        <p>Student Name: ${application.firstname} ${application.lastname}</p>
        <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a></p> 
        <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
        <p>Phone: ${application.phone}</p>
        <p>Gender: ${application.gender}</p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="Download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download Resume</a></button><br />
        <br />
        <button class="btns"  onclick="window.location.href='shortlistqualify.html?applicationid=${application._id}'" type="submit" value="Submit" > Accept </button>    
        <button class="btns"  onclick="window.location.href='shortlistreject.html?applicationid=${application._id}'" type="submit" value="Submit" > Reject </button> 
          
      </div>`;
      });
      if(mappedUsers.length>0)
      usersContainer.innerHTML = mappedUsers;
      if(mappedUsers.length < 3){
        const  ab = document.getElementById("footer")
        ab.classList.add("foot")
      }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/company/companyindex.html"
      }
}
 

$searchbutton.addEventListener('click',async (e)=>{
  const studentName = document.getElementById('studentName').value
  const mail = document.getElementById('mail').value
  
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result1 = await fetch(`/viewshortlists?companyid=${localStorage.getItem('companyid')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
  }).then((res) => res.json())

  console.log(result1)


  var filter = {
 
  };
 
 let a1 = studentName.toLowerCase() , a2 = mail.toLowerCase()
 if(a1){
  filter.firstname = a1
}
 if(a2)
  filter.email = a2

 
 console.log(filter)
 
 var users = result1.filter( function(item) {
  if(searchterm) {
    const application = item
    return  application.firstname.toLowerCase().includes(searchterm) || application.lastname.toLowerCase().includes(searchterm) || application.email.includes(searchterm) // || job.empbenefits.toString().includes(searchterm)
   }
   for (var key in filter) {
     if (!item[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase()))
       return false;
   }
   return true;
 });
 
 console.log(users)

  const mappedUsers = users.map((application, index) => {
    return `<div class="job">
    <h1>Application details</h1>
    <p>Student Name: ${application.firstname} ${application.lastname} </p>
    <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a></p> 
    <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
    <p>Phone: ${application.phone}</p>
    <p>Gender: ${application.gender}</p>
    <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="Download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download Resume</a></button><br />
    <br />
    <button class="btns"  onclick="window.location.href='shortlistqualify.html?applicationid=${application._id}'" type="submit" value="Submit" > Accept </button>    
    <button class="btns"  onclick="window.location.href='shortlistreject.html?applicationid=${application._id}'" type="submit" value="Submit" > Reject </button> 
      
  </div>`;
  });
  if(mappedUsers.length>0){
  usersContainer.innerHTML = mappedUsers;
  if(mappedUsers.length < 3){
    const  ab = document.getElementById("footer")
    ab.classList.add("foot")
  }
  else{
    alert("Applications Empty") 
    //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
       location.href="/company/companyindex.html"
  }
}else{
  alert("no matching results")
}

})
 





