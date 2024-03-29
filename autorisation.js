const authpage = (permissions) =>{
   return (req, res, next) =>{
      const userRole = req.body.role
      if (permissions.includes(userRole)){
         next()
      } else{
         return res.status(401).json("YOu dont have permission")
      }
   }

};
 const authuUser = (req, res, next) =>{
    const userName = parseInt(req.params.name);
    if(req.body.courses.includes(courseNumber)){
      next()
    } else{
      return res.status(401).json("YOu dont have access to this username!");
     }

 };
 module.exports ={authpage, authuUser}