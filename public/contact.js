const $contactForm=document.getElementById("contact-send-form")


    
    $contactForm.addEventListener('submit',async(e)=>{
      e.preventDefault();
      console.log(document.getElementById("name").value)
      const $name= document.getElementById("name").value
      const $email= document.getElementById("email").value
      const $message= document.getElementById("message").value
      console.log($name,$email,$message)
      var status = document.getElementById("my-form-status");
      if($name && $email && $message){
      const result = await fetch('/contactus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:$name,
            email:$email,
            message:$message
        })
    }).then((res) => res.json())
 
        if (result.msg) {
          status.innerHTML = "Thanks for your submission!";
          $contactForm.reset()
        } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
              $contactForm.reset()
            }
          }
    })
    
   /* const result = await fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:$name,
            email:$email,
            message:$message
        })
    }).then((res) => res.json())
    console.log(result,result)
    if (!result.error) {
        $contactForm.reset()
        alert("success")
    } else {
        alert("unuble to submit")
    } */
