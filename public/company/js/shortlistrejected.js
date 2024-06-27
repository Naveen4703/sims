const $logoutbtn=document.querySelector('.logout-btn')
const token = localStorage.getItem('token')


window.onload=async()=>{
    console.log("onload")
    const url = window.location.href
    const applicationId = url.split('=')
    const result = await fetch(`/shortlistreject?applicationid=${applicationId[1]}`, {
        method: 'DELETE',
        headers: {
           
            'Authorization':'Bearer '+localStorage.getItem('token')
        },
        
    }).then((res) => res.json())
    console.log(result)
    alert("success")
    window.location = "viewshortlists.html"

}

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