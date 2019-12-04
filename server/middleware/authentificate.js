const jwt =require('jsonwebtoken')

 const authentificate  = (req, res , next )=>{

   try {
       
    const token = req.headers.authorization.split(' ')[1]
    const decode =jwt.verify(token,'SECRET')

    req.user=decode
    next()

   }catch (error){
         res.json({
                message: 'Authentificatio Failed'

         })

   }






 }
 module.exports= authentificate
