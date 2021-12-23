const repositories = require("../repositories/usersRepositories")

exports.allUsers = async (req,res) =>{

    const users = await repositories.getAll()
    res.status(200).json(users)
}

exports.register = async (req,res) => {
    const {name,username,password,email,numberPhone} = req.body

    if(!name || !username || !password || !email || !numberPhone){
        res.status(400).json({message:"Todos los campos son obligatorios"})
    }

    const newUser = {
        name:name,
        username:username,
        password:password,
        email:email,
        numberPhone: numberPhone,
        address_id: 1,
        isAdmin: true,
        isLogged: false,
        isSuspended:false
    }
    
    
    await repositories.save(newUser)
    
    res.status(201).json({message:"Usuario creado correctamente"})
    
}

exports.login = async (req,res) => {

    const {email,username,password} = req.body

    const user = {
        email:email,
        username:username,
        password:password
    }
    
    
    const login = await repositories.login(user)

    if(login == null){
         res.status(400).json({message: "Creedenciales incorrectas"})
    }
    
    if(login.isLogged == true){
        res.status(400).json({message: "Ya esta iniciada la secion sesion"})
   }
   
    repositories.UpdateLogin(user)
    res.status(200).json({message:`Sesion iniciada. Bienvenido ${user.username}`})

}
    
exports.suspendUser = async(req,res) => {

    const suspendedUserId = req.params.suspendedUserId

    const suspend = await repositories.suspendUser(suspendedUserId)

    if(suspend == 0){
        res.status(400).json({message:`El id del usuario a suspender no pertenece a un usuario`})
    }

    res.status(200).json({message:`Usuario con el id ${suspendedUserId} suspendido`})
}
    