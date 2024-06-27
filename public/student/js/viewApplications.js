const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
const $logoutbtn=document.querySelector('.logout-btn')

let usersContainer = document.getElementById("jobs");
//const base64 = require('base64topdf');


//console.log(localStorage.getItem('studentid'),localStorage.getItem('token'))

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

window.onload=async()=>{
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    console.log("onload")
    const result = await fetch(`/studentviewapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    const result1 = await fetch(`/studentqualifiedapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    const result2 = await fetch(`/studentselectedapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    const result3 = await fetch(`/studentrejectedapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     
    const mappedUsers1 = result.applications.map((application, index) => {
        
        return `<div class="job">
        <p >First name: <span style ="text-transform: capitalize;" > ${application.firstname} </span> </p>
        <p>Last Name: <span style ="text-transform: capitalize;" > ${application.lastname}  </span> </p>
        <p> Applied Company: <span style ="text-transform: capitalize;" > ${result.newResults[index].companyname} </span> </p>
        <p>Applied job Title: <span style ="text-transform: capitalize;" > ${result.newResults[index].title} </span> </p>
        <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a> </p>
        <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
        <p>gender: <span style ="text-transform: capitalize;" > ${application.gender} </span> </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong><span style="text-transform: uppercase; font-weight: bolder;"> Applied</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
    const mappedUsers2 = result1.applications.map((application, index) => {

        return `<div class="job">
        <p >First name: <span style ="text-transform: capitalize;" > ${application.firstname} </span> </p>
        <p>Last Name: <span style ="text-transform: capitalize;" > ${application.lastname} </span> </p>
        <p> Applied Company: <span style ="text-transform: capitalize;" > ${result1.newResults[index].companyname} </span> </p>
        <p>Applied job Title: <span style ="text-transform: capitalize;" > ${result1.newResults[index].title} </span> </p>
        <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a></p> 
        <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
        <p>gender: <span style ="text-transform: capitalize;" > ${application.gender} </span> </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong> <span style="text-transform: uppercase; font-weight: bolder;">Qualified</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
    const mappedUsers3 = result2.applications.map((application, index) => {

        return `<div class="job">
        <p >First name: <span style ="text-transform: capitalize;" > ${application.firstname} </span> </p>
        <p>Last Name: <span style ="text-transform: capitalize;" > ${application.lastname} </span> </p>
        <p> Applied Company: <span style ="text-transform: capitalize;" > ${result2.newResults[index].companyname} </span> </p>
        <p>Applied job Title: <span style ="text-transform: capitalize;" > ${result2.newResults[index].title} </span> </p>
        <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a></p> 
        <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
        <p>gender: <span style ="text-transform: capitalize;" > ${application.gender} </span> </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong> <span style="text-transform: uppercase; font-weight: bolder;">Selected</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
    const mappedUsers4 = result3.applications.map((application, index) => {

        return `<div class="job">
        <p >First name: <span style ="text-transform: capitalize;" > ${application.firstname} </span> </p>
        <p>Last Name: <span style ="text-transform: capitalize;" > ${application.lastname} </span> </p>
        <p> Applied Company: <span style ="text-transform: capitalize;" > ${result3.newResults[index].companyname} </span> </p>
        <p>Applied job Title: <span style ="text-transform: capitalize;" > ${result3.newResults[index].title} </span> </p>
        <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a></p> 
        <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
        <p>gender: <span style ="text-transform: capitalize;" > ${application.gender} </span> </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong> <span style="text-transform: uppercase; font-weight: bolder;">Rejected</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
      
      console.log(mappedUsers1.length + mappedUsers2.length + mappedUsers3.length + mappedUsers4.length)
      let load = document.getElementById("loadingDiv")
      load.remove()
      if(mappedUsers1.length >0 || mappedUsers2.length>0 || mappedUsers3.length>0 || mappedUsers4.length>0){
        usersContainer.innerHTML = [...mappedUsers1,...mappedUsers2,...mappedUsers3,...mappedUsers4]
        if((mappedUsers1.length + mappedUsers2.length + mappedUsers3.length + mappedUsers4.length) < 3){
         const  ab = document.getElementById("footer")
          ab.classList.add("foot")
        }
    }
      else{
        alert("Applications Empty") 
           usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/student/studentindex.html"
      }

}
 

  






