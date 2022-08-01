// import React, { useState } from 'react';
// import axios from 'axios'

// function Login()
// {
//     let bp = require('./Path.js');
//     var storage = require('../tokenStorage.js');

//     var loginName;
//     var loginPassword;

//     const [message,setMessage] = useState('');

//     const app_name = 'tutorbay'
//     function buildPath(route)
//     {
//         if (process.env.NODE_ENV === 'production') 
//         {
//             return 'https://' + app_name +  '.herokuapp.com/' + route;
//         }
//         else
//         {        
//             return 'http://localhost:5000/' + route;
//         }
//     }

//     const doLogin = async event => 
//     {
//         event.preventDefault();
//         var obj = {login:loginName.value,password:loginPassword.value};
//         var js = JSON.stringify(obj);
//         var config = 
//         {
//             method: 'post',
//             url: bp.buildPath('api/login'),
//             headers: 
//             {
//                 'Content-Type': 'application/json'
//             },
//             data: js
//         };
//         axios(config)
//             .then(function (response) 
//         {
//             var res = response.data;
//             if (res.error) 
//             {
//                 setMessage('User/Password combination incorrect');
//             }
//             else 
//             {
//                 storage.storeToken(res);
//                 var jwt = require('jsonwebtoken');
    
//                 var ud = jwt.decode(storage.retrieveToken(),{complete:true});
//                 var userId = ud.payload.userId;
//                 var firstName = ud.payload.firstName;
//                 var lastName = ud.payload.lastName;
                  
//                 var user = {firstName:firstName,lastName:lastName,id:userId}
//                 localStorage.setItem('user_data', JSON.stringify(user));
//                 window.location.href = '/cards';
//             }
//         })
//         .catch(function (error) 
//         {
//             console.log(error);
//         });
//     }
//     return(
//       <div id="loginDiv">
//         <span id="inner-title">PLEASE LOG IN</span><br />
//         <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br 
// />
//         <input type="password" id="loginPassword" placeholder="Password" ref={(c) => 
// loginPassword = c} /><br />
//         <input type="submit" id="loginButton" class="buttons" value = "Do It"
//           onClick={doLogin} />
//         <span id="loginResult">{message}</span>
//      </div>
//     );
// };
// export default Login;


import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Login()
{
  var loginUserName;
  var loginPassword;

  const [message,setMessage] = useState('');

  const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginUserName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('https://tutorbay.herokuapp.com/api/login', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            if( res.firstName === "" )
            {
                setMessage('Username/Password combination incorrect');
            }
            else if(!res.Validated)
            {
                setMessage('Check your email to verify account');
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
                window.location.href = '/cards';
                /*
                var user = {email:res.Email,firstName:res.firstName,lastName:res.lastName,id:res.id,userName:res.UserName}
                localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage('');
                window.location.href = '/home';*/
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
                Log In
            </h3>
            <Form.Group controlId="formBasicEmail">
                <Form.Control className="login-input" type="name" placeholder="username" ref={(c) => loginUserName = c}/>
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
                <a href="/ForgotPassword">Forgot Password?</a><br></br>
                {/* <span className="divider"></span> */}
                <a href="/SignUp" className="link">Create an account</a>
            </div>
        </Form>
    </div>
    );
};

export default Login;