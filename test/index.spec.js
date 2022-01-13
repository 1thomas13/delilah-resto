const chai = require("chai")
const expect = chai.expect
const request = require('supertest')
const app = require("../src/index")

describe("register",function(){

    it("Devuelve el status code 201 si el usuario se registro con exito",(done)=>{
        const newUser={
            name: "Juan test",
            username:"test",
            password: "test21344",
            email:"tester@gmail.com",
            numberPhone:2964-123455,
        }
        request(app)
            .post("/users/")
            .send(newUser)
            .end(function(err,res){
                chai.expect(res.statusCode).equals(201)
                done()
            })
    })
    it("Devuelve el status code 400, si no se ingresaron los campos obligatorios",(done)=>{
        const newUser={
            name: "",
            username:"test",
            password: "test21344",
            email:"",
            numberPhone:2964-123455,
        }
        request(app)
            .post("/users/")
            .send(newUser)
            .end(function(err,res){
                chai.expect(res.statusCode).equals(400)
                done()
            })
    })

})