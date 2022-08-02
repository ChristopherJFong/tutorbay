import { useState, useRef } from "react";
import { Form, Button } from 'react-bootstrap';

import axios from "axios";

function Login()
{

    var storage = require('../tokenStorage.js');
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login: loginName.value, password: loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('https://tutorbay.herokuapp.com/api/login', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            if( res.error === "Not yet verified" )
            {
                setMessage('Check your email to verify account');
            }
            else if( typeof res.fn == 'undefined' )
            {
                setMessage('Username/Password combination incorrect');
            }
            else
            {
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');

                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                  
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/home';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        // <div id="loginDiv">
        //     <span id="inner-title">LOG IN</span><br />
        //     <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br/>
        //     <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
        //     <input type="submit" id="loginButton" class="buttons" value = "submit" onClick={doLogin} />
        //     <span id="loginResult">{message}</span>
        // </div>

        <div>  
        <Form className="loginform">
            <h3 className="loginlabel">
                Log In
            </h3>
            <Form.Group controlId="formBasicEmail">
                <Form.Control className="login-input" type="name" placeholder="username" ref={(c) => loginName = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="login-input" type="password" placeholder="password" ref={(c) => loginPassword = c}/>
            </Form.Group>
            <Button size="lg" variant="primary" type="submit" onClick={doLogin} block>
                Log in
            </Button>
            <div className="col text-center">
            <span id="loginResult">{message}</span>
            </div>
            <hr></hr>
            <div className="col text-center">
                <a href="/forgotpassword">Forgot Password?</a><br></br>
                {/* <span className="divider"></span> */}
                <a href="/signup" className="link">Create an account</a>
            </div>
        </Form>
    </div>
    );
};
export default Login;