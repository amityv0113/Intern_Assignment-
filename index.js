const express = require('express')

const app = express();


var validator = require("email-validator");


app.use(express.json())


app.post('/intern' , (request ,response) =>{
    
    const req_body=request.body.data;
    console.log(req_body);
    const arr = req_body.split(",");
    console.log(arr)
    // const arr=["amit",'hello@gmail.com',"7355242380"]

    if  (arr.length==3)
    {
        const name= arr[0];
        const email=arr[1];
        const phone_no = arr[2];
        
        

        // variable,s  to be use 
        var is_email_active =false;
        var is_phone_no_valid =false;
        var is_name_valid = true;
        // to check for name 
        if (name==null || name.length==0)
        {
            is_name_valid =false;
        }
        // check mail is active or not npm module 

        if (validator.validate(email))
        {
            is_email_active=true;
        }

        // to check phone no is valid or not 
        var regx=/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
        // var regx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //    const regx=/^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/;

       if (phone_no.match(regx))
       {
            is_phone_no_valid=true;
       }



        const res = {
            name: {
                valueProvided: name,
                isValid: is_name_valid,
            },
            email: {
                        valueProvided: email,
                        isValid: is_email_active,
            },

            mobile: {
                valueProvided:phone_no,
                isValid: is_phone_no_valid,
            }


        }
        response.send(res);

    }

    
})






// app.get('*', (request ,response) =>{
//     response.send('404 Page')
// })


app.listen(3000, ()=>{
    console.log('server is up running on port 3000')
})


// API Response:
// {
//     name: {
//         valueProvided: "Ranjan",
//         isValid: true
//     },
//     email: {
//         valueProvided: "",
//         isValid: false
//     },
//     mobile: {
//         valueProvided: "7978849212",
//         isValid: true
//     }
// }
