const repositories = require("../repositories/addressRepositories")
const express = require("express")

const allAddress = async (req,res) =>{

    const userId = req.params.userId
    const allAddress = await repositories.getAll(userId)

    res.status(200).json({Address:allAddress})

}

const addAddress = async (req,res) =>{

    const {destination} = req.body
    const userId = req.params.userId
    
    if(!destination){
        res.status(400).json({message:"Falta ingresar datos para agregar su destino"})
    }

    const address = {
        destination: destination,
        userId: userId
    }
    
    await repositories.save(address)
    res.status(201).json({Message:"Direccion añadida"})
}

const updateAddress = async (req,res) =>{

    const {destination} = req.body
    const userId = req.params.userId
    const addressId = req.params.addressId
    
    if(!destination){
        res.status(400).json({message:"Falta ingresar datos para agregar su destino"})
    }

    const address = {
        destination: destination,
        userId: userId,
        id:addressId

    }

    await repositories.update(address)
    res.status(201).json({Message:"Direccion modificada"})
}

const deleteAddress = async (req,res) =>{

    const userId = req.params.userId
    const addressId = req.params.addressId
    
    const address = {
        userId: userId,
        id:addressId

    }

    await repositories.destroy(address)
    res.status(201).json({Message:"Direccion eliminada correctamente"})
}


module.exports = {allAddress,addAddress,updateAddress,deleteAddress}


