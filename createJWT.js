const jwt = require("jsonwebtoken");
var ObjectId = require('mongodb').ObjectID;
require("dotenv").config();
exports.createToken = function ( fn, ln, id )
{
    return _createToken( fn, ln, id );
}
_createToken = function ( fn, ln, id )
{
    var ret;
    try
    {
      const expiration = new Date();
      const user = {userId:id,firstName:fn,lastName:ln};
      const accessToken =  jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);
      // In order to expire with a value other than the default, use the 
       // following
      /*
      const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, 
         { expiresIn: '30m'} );
                       '24h'
                      '365d'
      */
      ret = {accessToken:accessToken,fn:fn,ln:ln,id:id};    
    }
    catch(e)
    {
      ret = {error:e.message};
    }
    return ret;
}
exports.isExpired = function( token )
{
   var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, 
     (err, verifiedJwt) =>
   {
     if( err )
     {
       return true;
     }
     else
     {
       return false;
     }
   });
   return isError;
}
exports.refresh = function( token )
{
  let ud = jwt.decode(token,{complete:true});
  let userId = ObjectId();
  userId = ud.payload.id;
  let firstName = ud.payload.firstName;
  let lastName = ud.payload.lastName;
  return _createToken( firstName, lastName, userId );
}