const signInBtn = document.getElementById("signIn");  
const signUpBtn = document.getElementById("signUp");  
const fistForm = document.getElementById("company-login");  //c
const secondForm = document.getElementById("student-login"); // s 
const container = document.querySelector(".container");  
signInBtn.addEventListener("click", () => {  
     container.classList.remove("right-panel-active");  
});  
signUpBtn.addEventListener("click", () => {  
     container.classList.add("right-panel-active");  
});  
fistForm.addEventListener("submit", (e) => e.preventDefault());  
secondForm.addEventListener("submit", (e) => e.preventDefault());


/*const checklogin = ()=>{
    const coockievalue=document.cookie
    console.log(coockievalue,"coockies")
    if(coockievalue){
        console.log("test")
        const coockieArray=coockievalue.split(";")
        const auth=coockieArray[0].split("=")
        const type=coockieArray[1].split("=")
        console.log("auth ",auth[1])
        console.log("type ",type[1])
        if(auth[1] && type[1] ==="student"){
            location.href="/student/studentindex.html"
        }
        if(auth[1] && type[1] ==="company"){
            location.href="/company/companyindex.html"
        }
        if(auth[1] && type[1] ==="admin"){
            location.href="/admin/adminindex.html"
        }
    
    }
   
    
}
checklogin()

*/


const $studentLoginForm=document.getElementById("student-login")
const $companyLoginForm=document.getElementById("company-login")

$studentLoginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("student login intiated")
    const $email=document.getElementById("s-mail").value
    const $password=document.getElementById("s-pass").value

  const result = await fetch('/student/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:$email,
            password:$password
        })
    }).then((res) => res.json())
   // console.log(result,result)
    if (!result.error) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('name',result.user.firstname)
        localStorage.setItem('studentid',result.user._id)
        location.href="/student/studentindex.html"
       // alert("success")
    } else {
      //  alert(result.error)
      document.getElementById("s-pass").classList.add("wrong")
      setTimeout(
        () => {
            document.getElementById("s-pass").classList.remove("wrong")
        },1200
    )
    }

})





$companyLoginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("company login intiated")
    const $email=document.getElementById("c-mail").value
    const $password=document.getElementById("c-pass").value

    const result = await fetch('/company/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:$email,
            password:$password
        })
    }).then((res) => res.json())
    console.log(result)
    if (!result.error) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('name',result.user.firstname)
        localStorage.setItem('companyid',result.user._id)
        localStorage.setItem('usertype','company')
        location.href="/company/companyindex.html"
     //   alert("success")
    } else {
        document.getElementById("c-pass").classList.add("wrong")
        setTimeout(
          () => {
              document.getElementById("c-pass").classList.remove("wrong")
          },1200
      )
    }
})




