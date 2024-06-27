const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
const search=document.getElementById('searchbox')
const $searchbutton=document.querySelector('.searchbutton')
const $logoutbtn=document.querySelector('.logout-btn')

let usersContainer = document.getElementById("jobs");

// $applybtn.addEventListener('click',(e)=>{
//     location.href='/student/applypage.html'
// })


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


window.onload=async()=>{
    console.log("onload") 
    const result = await fetch('/viewstudents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({ 
           
        })
    }).then((res) => res.json())
    console.log(result)
    const mappedUsers = result.map((student, index) => {
      let blockValue
      if(student.block){
        blockValue = "Unblock"
      }else blockValue = "Block"
        return `<div class="job">
        <h1>Student Details</h1>
        <p>Student Name: ${student.firstname} ${student.lastname} </p>
        <p>Email: <a href="mailto:${student.email}" target="_blank">${student.email}</a></p>
        <p>DOB (MM/Year) : ${student.month} / ${student.year} </p>
        <p>SSN:  ${student.ssn} </p>
        <p>Gender: ${student.gender}</p>
        <p> University Id: ${student.universityid}</p>
        <p>phone: ${student.phone}</p>
        <button class="btns" id="blockbutton"> <a href="studentblock.html?companyid=${student._id}&value=${!student.block}"> ${blockValue}</a></button><br/>       

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
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/admin/adminindex.html"
      }

}
 

 

$searchbutton.addEventListener('click',async (e)=>{
  const studentName = document.getElementById('studentName').value
  const universityId = document.getElementById('universityId').value
  const mail = document.getElementById('email').value
  const ssn = document.getElementById('ssn').value
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result = await fetch('/viewstudents', {
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

let a1 = studentName , a2 = mail ,a3 = universityId, a4= ssn
if(a1)
  filter.firstname = a1.toLowerCase()
if(a2)
  filter.email = a2.toLowerCase()
if(a3)
  filter.universityid = a3.toString()
if(a4)
  filter.ssn = a4.toString()


console.log(filter)

var users = result.filter( function(item) {
 if(searchterm) {
   const student = item
   return  parseInt(student.ssn) == parseInt(searchterm) || parseInt(student.universityid) == parseInt(searchterm) || student.firstname.toLowerCase().includes(searchterm) || student.lastname.toLowerCase().includes(searchterm) || student.email.toLowerCase().includes(searchterm)// || job.empbenefits.toString().includes(searchterm)
  }
 for (var key in filter) {
  
   if ( item[key].toString().toLowerCase() != filter[key] )
  
     return false;

 }
 return true;
});

console.log(users)
 
 const mappedUsers = users.map((student, index) => {
  let blockValue
  if(student.block){
    blockValue = "Unblock"
  }else blockValue = "Block"
    return `<div class="job">
    <h1>Student Details</h1>
    <p>Student Name: ${student.firstname} ${student.lastname} </p>
    <p>Email: <a href="mailto:${student.email}" target="_blank">${student.email}</a></p>
    <p>DOB (MM/Year) : ${student.month} / ${student.year} </p>
    <p>SSN:  ${student.ssn} </p>
    <p>Gender: ${student.gender}</p>
    <p> University Id: ${student.universityid}</p>
    <p>phone: ${student.phone}</p>
    <button class="btns" id="blockbutton"> <a href="studentblock.html?companyid=${student._id}&value=${!student.block}"> ${blockValue}</a></button><br/>       

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
    alert("Matching application not found") 
    //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
   // location.href="/admin/viewapplications.html"
  }  
})






// var list = document.createElement('ul');

// Create a list item for each wizard
// and append it to the list
// result.forEach(function (res) {
// 	// var li = document.createElement('li');
// 	// li.textContent = wizard;
// 	// list.appendChild(li);
//     console.log(res)
// });
 