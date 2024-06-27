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
    const result = await fetch('/viewcompanies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({ 
           
        })
    }).then((res) => res.json())
    
    const mappedUsers = result.map((company, index) => {
      let blockValue
      if(company.block){
        blockValue = "Unblock"
      }else blockValue = "Block"
        return `<div class="job">
        <h1>Company Details</h1>
        <p>Company Name: ${company.firstname} ${company.lastname} </p>
        <p>Email: <a href="mailto:${company.email}" target="_blank">${company.email}</a></p>
        <p>Company Id: ${company.companyid} </p>
        <p>Phone: ${company.phone}</p>
        <button class="btns" id="blockbutton"> <a href="block.html?companyid=${company._id}&value=${!company.block}"> ${blockValue}</a></button><br/>       
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
           location.href="/student/studentindex.html"
      }

}
 


$searchbutton.addEventListener('click',async (e)=>{
  const companyName = document.getElementById('companyName').value
  const companyId = document.getElementById('companyId').value
  
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result1 = await fetch('/viewcompanies', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    },
    body: JSON.stringify({
 
})
  }).then((res) => res.json())

console.log(result1)


var filter = {
 
};

let a1 = companyName.toLowerCase() , a2 = companyId.toString()
if(a1){
filter.firstname = a1
}
if(a2)
filter.companyid = a2


console.log(filter)

var users = result1.filter( function(item) {
if(searchterm) {
  const company = item
  return  parseInt(company.companyid) == parseInt(searchterm) || company.firstname.toLowerCase().includes(searchterm) || company.lastname.toLowerCase().includes(searchterm) // || job.empbenefits.toString().includes(searchterm)
}
 for (var key in filter) {
   if (item[key] === undefined || item[key].toString().toLowerCase() != filter[key].toString().toLowerCase())
     return false;
 }
 return true;
});

console.log(users)
const mappedUsers = users.map((company, index) => {
  let blockValue
  if(company.block){
    blockValue = "Unblock"
  }else blockValue = "Block"
    return `<div class="job">
    <h1>Company Details</h1>
    <p>Company Name: ${company.firstname} ${company.lastname} </p>
    <p>Email: <a href="mailto:${company.email}" target="_blank">${company.email}</a></p>
    <p>company Id: ${company.companyid} </p>
    <p>Phone: ${company.phone}</p>
    <button class="btns" id="blockbutton"> <a href="block.html?companyid=${company._id}&value=${!company.block}"> ${blockValue}</a></button><br/>       
  </div>`;
  });

console.log("mpusers",mappedUsers)
 if(mappedUsers.length>0){
   usersContainer.innerHTML = mappedUsers;
   if(mappedUsers.length < 3){
     const  ab = document.getElementById("footer");
      ab.classList.add("foot");
    }
}
 else{
   alert("Matching company not found");
 } 


});


  






