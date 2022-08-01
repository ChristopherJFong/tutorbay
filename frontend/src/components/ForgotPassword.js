import React,{useState} from 'react';
import {Form, Button} from 'react-bootstrap';

function ForgotPassword()
{
    var email;
    const [message,setMessage] = useState('');
    
    const doForgotPassword = async event => 
    {
        event.preventDefault();
        var obj = {email:email.value,};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/ForgetPassword',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            if( res.error === "" )
            {
                setMessage('Reset Password Link has been Emailed');
                localStorage.setItem("TempEmail", obj.email);

            }
            else
            {
                setMessage(res.error);
                return;
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
            <h3 className="loginlabel">Forgot Password</h3>
            <Form.Group controlId="formBasicEmail">
                <Form.Control className="login-input" type="email" placeholder="Enter Your Email" ref={(c) => email = c}/>
            </Form.Group>
            
            <Button size="lg" variant="primary" type="submit" onClick={doForgotPassword} block>
                Done
            </Button>
            <br></br>
            <div className="col text-center">
            <span id="loginResult">{message}</span>
            </div>
            <hr></hr>
            <div>
                <a href="/">Back to Login</a>
            </div>
        </Form>
      </div>
   );
};

export default ForgotPassword;