import React from 'react';
function Home()
{

    const doLogin = async event => 
    {
        event.preventDefault();
        alert('doIt()');
    };
    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">HOME PAGE</span><br />
        </form>
        <span id="loginResult"></span>
     </div>
    );
};
export default Home;