let studentName = localStorage.getItem("name")
studentName = studentName.charAt(0).toUpperCase() + studentName.slice(1)

document.getElementById("welcome").innerHTML = "Welcomes "+studentName+" You logged in as a Student"

const $totaljobs=document.querySelector(".totaljobs")
const $totalapplied=document.querySelector(".totalapplied")
const $logoutbtn=document.querySelector(".logout-btn")

const token=localStorage.getItem('token')

window.onload=async()=>{
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    console.log("onload")
    const result = await fetch('/totaljobs', {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        } 
    }).then((res) => res.json())
    
    console.log(result.jobsCount)
    document.getElementById("totaljobscount").innerHTML=result.jobsCount
    const result1 = await fetch(`/appliedjobs?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    }).then((res) => res.json())
    
    console.log(result1.jobsCount)
    let load = document.getElementById("loadingDiv")
    load.remove()
    document.getElementById("appliedjobscount").innerHTML=result1.jobsCount
}

 

$totaljobs.addEventListener('click',(e)=>{
    location.href="/student/viewjobs.html"
})

$totalapplied.addEventListener('click',(e)=>{
    location.href="/student/viewapplications.html"
})

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

