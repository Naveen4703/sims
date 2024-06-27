const nodemailer = require("nodemailer");
var mailStatus

/*
const { MailtrapClient } = require("mailtrap");

const TOKEN = "82bc5abcc46929231dcc93949027783b";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "noobtopro.us@gmail.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "vasileveva.ap@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);


  */

  const contactus =(name,mail,msg)=>{  
    // console.log("acounts ",company,title,exp,respons,worktype,emptype,empbenefits)
     const contact={
         from:"noobtopro.us@gmail.com",
         to: "vasileveva.ap@gmail.com",
         subject:` ${name} wants to contact`,
         html:`<div><h3>Hi, ${name} wants to contact. <h2> His mail id is : ${mail} </h2> <br> <h2> His message was : ${msg} </h2> <br> </div>`
     }
   
     nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "noobtopro.us@gmail.com",
          pass: "vgexgxgzzqacxmgj "
      }
     }).sendMail(contact,(err)=>{
       if(err){
        return console.log("error occurs",err)
        
       }else{
       return console.log("email sent")
       }
   })
   }


  const sendRefer =(referName,mailid,company,title,exp,respons,worktype,emptype,empbenefits)=>{  
   // console.log("acounts ",company,title,exp,respons,worktype,emptype,empbenefits)
    const refer={
        from:"noobtopro.us@gmail.com",
        to: mailid,
        subject:`Your friend ${referName} has referred you a job`,
        html:`<div><h3>Hi, Your friend ${referName} has referred you a job in <h1> <a href='https://student-internship-kqr0.onrender.com'>Student Intership Management System</a> </h1> <br> <br><h2>Job Description</h2><p>Company Name : ${company} </p> <br><p>Job Title : ${title}</p> <br><p>Experience level : ${exp} years</p> <br><p>Job Responsibilities :${respons}</p> <br><p>Work Type : ${worktype} </p> <br><p>Employee type : ${emptype}</p> <br><p>Employee benifits : ${empbenefits} </p> <br> </div>`
    }
  
    nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "noobtopro.us@gmail.com",
          pass: "vgexgxgzzqacxmgj "
      }
    }).sendMail(refer,(err)=>{
      if(err){
       return console.log("error occurs",err)
       
      }else{
      return console.log("email sent")
      }
  })
  }


const sendWelcomeEmail =(email)=>{
    const welcomeMsg={
        from:"noobtopro.us@gmail.com",
        to:email,
        subject:"Welcome To Internship Recuritment Portal",
        html:"<div><h1>welcome to intership portal</h1><br/><p>Thanks for creating the account in our portal we hope that you will like our services.Fell free to email us if you need any help</p></br><h3>Thank you!</h3></div>"
      }


  /*  nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"studentinternship1234@gmail.com",
        pass:"cbotfjartbjbebta"
        },
        port:465,
        host:"smtp.gmail.com"
    }) */
    
    
    nodemailer.createTransport({
      service: "gmail",
        auth: {
            user: "noobtopro.us@gmail.com",
            pass: "vgexgxgzzqacxmgj "
        }
      }).sendMail(welcomeMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}

const sendPasswordEmail=(email,link)=>{    
    const passwordMsg={
        from:"noobtopro.us@gmail.com",
        to:email,
        subject:"Password reset mail",
        html:`<div><h4>Hi, Here is the link for reset password for your account in student internship portal\n kindly reset the password\n Note:The link is only vaild for fifteen minutes after that the link expries</h4><a href=${link}>Password reset link</a>`
    }

    nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "noobtopro.us@gmail.com",
          pass: "vgexgxgzzqacxmgj "
      }
      }).sendMail(passwordMsg,(err)=>{
        if(err){
         return console.log("error occurs",err)
         
        }else{
        return console.log("emai sent")
        }
    })
}

const sendJobMails=(studentmails)=>{    
  const passwordMsg={
      from:"noobtopro.us@gmail.com",
      to:studentmails,
      subject:"New Job Posted!",
      html:`<div><h4>Hi, A new job notification was posted in student internship portal\n kindly apply for it! <br> <br> \n Note: Job postion may be filled soon so apply for it using </h4> <a href="https://student-internship-kqr0.onrender.com">link</a>`
  }

  nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "noobtopro.us@gmail.com",
        pass: "vgexgxgzzqacxmgj "
    }
    }).sendMail(passwordMsg,(err)=>{
      if(err){
       return console.log("error occurs",err)
       
      }else{
      return console.log(" job email sent")
      }
  })
}

const sendOtp=(otpemail,randomdigit)=>{  
  let ok = true
  const otp={
      from:"noobtopro.us@gmail.com",
      to:otpemail,
      subject:`${randomdigit} is your OTP for SIMS`,
    /*  html : ` <head>
        <title></title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
      
          .ReadMsgBody {
            width: 100%;
          }
      
          .ExternalClass {
            width: 100%;
          }
      
          .ExternalClass * {
            line-height: 100%;
          }
      
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
      
          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
      
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
          @media only screen and (max-width:480px) {
            @-ms-viewport {
              width: 320px;
            }
            @viewport {
              width: 320px;
            }
          }
        </style>
        <!--<![endif]-->
        <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
        <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        </style>
        <!--<![endif]-->
        <style type="text/css">
          @media only screen and (max-width:595px) {
            .container {
              width: 100% !important;
            }
            .button {
              display: block !important;
              width: auto !important;
            }
          }
        </style>
      </head>
      
      <body style="font-family: 'Inter', sans-serif; background: #E5E5E5;">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
          <tbody>
            <tr>
              <td valign="top" align="center">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
                  <tbody>
                    <tr>
                      <td style="padding:48px 0 30px 0; text-align: center; font-size: 14px; color: #4C83EE;">
                        STUDENT INTERNSHIP MANAGEMENT SYSTEM
                      </td>
                    </tr>
                    <tr>
                      <td class="main-content" style="padding: 48px 30px 40px; color: #000000;" bgcolor="#ffffff">
                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tbody>
                            <tr>
                              <td style="padding: 0 0 24px 0; font-size: 18px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;">
                                Welcome, !
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                Thanks for choosing SIMS portal! We are happy to see you on board.
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                To get started, do this next step:
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 24px 0;">
                                <a class="button" href="{{next_step_link}}" title="Reset Password" style="width: 100%; background: #4C83EE; text-decoration: none; display: inline-block; padding: 10px 0; color: #fff; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px;">Apply for jobs</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                If you need some help to get started check our:
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 8px;">
                                <a style="display: flex; justify-content: space-between; align-items: center; padding: 28px 24px; border-radius: 4px; background-color: #FFF9F9; text-decoration: none;" href="{{get_started_link}}">
                                  <span style="width: 90%; font-size: 14px; line-height: 150%; font-weight: bold; color: #29426E; letter-spacing: 0.01em;">Get Started Guide</span>
                                  <span style="width: 10%; float: right;">
                                    <strong>→</strong>
                                  </span>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 60px;">
                                <a style="display: flex; padding: 28px 24px; border-radius: 4px; background-color: #FFF9F9; text-decoration: none;" href="{{onboarding_video_link}}">
                                  <span style="width: 90%; font-size: 14px; line-height: 150%; font-weight: bold; color: #29426E; letter-spacing: 0.01em;">Faq's Page</span>
                                  <span style="width: 10%; float: right;">
                                    <strong>→</strong>
                                  </span>
                                </a>
                              </td>
                            </tr>
                            <tr>
                            <tr>
                              <td style="padding: 0 0 16px;">
                                <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 14px; line-height: 170%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                Best regards, <br><strong>  SIMS. </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 24px 0 48px; font-size: 0px;">
                        <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:300px;">      <![endif]-->
                        <div class="outlook-group-fix" style="padding: 0 0 20px 0; vertical-align: top; display: inline-block; text-align: center; width:100%;">
                          <span style="padding: 0; font-size: 11px; line-height: 15px; font-weight: normal; color: #8B949F;">Student internship management system<br/> Missuori , USA.
                          </div>
                        </div>
                        <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      ` */
      html:`<div><h4>Hi, Here is the One Time Password : <b>${randomdigit}</b> to login into your account in student internship portal <br> \n kindly enter the OTP\n <br> <br> Note:The OTP is only vaild for fifteen minutes after that the OTP expries</h4>`
  }

function a1(){  
      nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "noobtopro.us@gmail.com",
            pass: "vgexgxgzzqacxmgj "
        }
    }).sendMail(otp,(err)=>{
      if(err){
      console.log("error occurs",err)
      return ok
      }else{
      ok = true
      return ok
      }
  })
 return (ok) ? true : false 
}
return a1()
}

const sendReview=(name,mail,msg,rating)=>{
  let ok = true
  const rvw={
    from:"noobtopro.us@gmail.com",
    to:"vasileveva.ap@gmail.com",
    subject:`New review from ${name}`,
    html:`<div><h4>Hi, Here is the new review from : <b>${name} with mail ${mail}, <br> <br> Message: ${msg} </b> <br><br> \n <b>Rating: ${rating}</b> \n <br> <br> </h4>`
} 

function a2(){  
  nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "noobtopro.us@gmail.com",
        pass: "vgexgxgzzqacxmgj "
    }
}).sendMail(rvw,(err)=>{
  if(err){
  console.log("error occurs",err)
  return ok
  }else{
  ok = true
  return ok
  }
})
return (ok) ? true : false 
}
return a2()
}

const sendStudentBlockEmail=(email)=>{    
    
    const passwordMsg={
        from:"studentinternship1234@gmail.com",
        to:email,
        subject:"Account blocked",
        html:`<div><h2>Account Blocked</h2><h4><h4>Your Account is blocked in student internship portal due to fake information provided while creating account or while appling for a job in a company.</h4><p>Kindly contact admin</P>`
    }

    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "noobtopro.us@gmail.com",
            pass: "vgexgxgzzqacxmgj "
        },
        port:465,
        host:"smtp.gmail.com"
    }).sendMail(passwordMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}


const sendCompanyBlockEmail=(email)=>{    
    
    const passwordMsg={
        from:"studentinternship1234@gmail.com",
        to:email,
        subject:"Account blocked",
        html:`<div><h2>Account Blocked</h2><h4>Your Account is blocked due to fake information provided while creating account or while posting a job</h4><p>Kindly contact admin</P>`
    }

    nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"studentinternship1234@gmail.com",
        pass:"cbotfjartbjbebta"
        },
        port:465,
        host:"smtp.gmail.com"
    }).sendMail(passwordMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}



module.exports={
    sendPasswordEmail,
    sendWelcomeEmail,
    sendCompanyBlockEmail,
    sendStudentBlockEmail,
    sendOtp,
    sendReview,
    sendJobMails,
    sendRefer,
    contactus
}
