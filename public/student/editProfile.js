const token=localStorage.getItem('token')
const $studentRegForm=document.getElementById("student-register")

//const base64 = require('base64topdf');
const $firstname=document.getElementById("first-name")
const $lastname=document.getElementById("last-name")
const $email=document.getElementById("email")
const $gender= document.getElementById("gender")
const $universityid=document.getElementById("universityid")
const $phone=document.getElementById("phone")
const $ssnNumber = document.getElementById("ssn")
const $month=document.getElementById("month")
const $year=document.getElementById("year")



window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/studentprofile?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    
     $firstname.value = result.firstname
     $lastname.value = result.lastname
     $email.value = result.email
     $gender.value = result.gender
     $month.value = result.month
     $year.value = result.year
     $ssnNumber.value = result.ssn
     $universityid.value = result.universityid
     $phone.value = result.phone
     $ssnNumber.value = result.ssn
    
}
 

  


$studentRegForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const $firstname=document.getElementById("first-name").value
    const $lastname=document.getElementById("last-name").value
    const $email=document.getElementById("email").value
    const $gender= document.getElementById("gender").value
    const $month=document.getElementById("month").value
    const $year=document.getElementById("year").value
    const $universityid=document.getElementById("universityid").value
    const $phone=document.getElementById("phone").value
    const $ssnNumber = document.getElementById("ssn").value
    let $age = 2023 - $year
    $month > 03 ? $age++ : $age
 //   console.log($gender,$phone,"gender, value")

        if($ssnNumber.length == 4){
        const result = await fetch(`/editprofile?studentid=${localStorage.getItem('studentid')}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token

            },
            body: JSON.stringify({
                firstname:$firstname,
                lastname:$lastname,
                email:$email,
                month: $month,
                year: $year,
                age:$age,
                ssn: $ssnNumber,
                gender:$gender,
                phone:$phone,
                universityid:$universityid
            })
        }).then((res) => res.json())
        console.log(result)
        if (!result.error) {

            location.href="/student/studentindex.html"
            alert("success")
        } else {
            alert(result.error)
        }
      }
      else{
        alert("Please enter SSN correctly")
      }
    }
)





