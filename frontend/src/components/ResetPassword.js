import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

function ResetPassword()
{
    var password;
    var confirmPass;
    const [message,setMessage] = useState('');
    var email = localStorage.getItem("TempEmail")

    const doResetPassword = async event => 
    {
      
        event.preventDefault();
        var flag = 0;
        var error = [];

        if (password.value === "" ||confirmPass.value === "") {
            flag = 1;
            error.push("Please fill out all fields\n");
        }
        if (flag === 1)
        {
            setMessage(error);
            return;
        }

        if(password.value !== confirmPass.value)
        {
            error.push("Password does not match\n");
            setMessage(error);
            return;
        }
        
        var obj = {email:email, password: password.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch('http://localhost:5000/api/ResetPassword',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error === "" )
            {
                setMessage("Password Reset");
                setTimeout(() => {
                    window.location.href = '/';
                  },5000);
            }
            else
            {
                setMessage(res.error);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        } 
    };    


    return(
        <div>  
        <Form className="loginform">
            <h3 className="loginlabel">
                 Reset Your Password
            </h3>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="login-input" type="password" placeholder="Enter new password" ref={(c) => password = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="login-input" type="password" placeholder="Re-enter password" ref={(c) => confirmPass = c}/>
            </Form.Group>
            <Button size="lg" variant="primary" type="submit" onClick={doResetPassword} block>
                Verify
            </Button>
            <span id="loginResult">{message}</span>
            <hr></hr>
        </Form>
    </div>
   );
};

export default ResetPassword;