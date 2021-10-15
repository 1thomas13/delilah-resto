const repositories = require("../repositories/usersRepositories")

exports.allUsers = async(req,res) =>{

    const users = await repositories.getAll()
    res.json(users)
}

exports.register = async (req,res) => {
    const {name,username,password,email,numberPhone,address} = req.body

    if(!name || !username || !password || !email || !numberPhone || !address){
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
    
    repositories.UpdateLogin(user)
    res.status(200).json({message:`Sesion iniciada. Bienvenido ${user.username}`})

}
    
    