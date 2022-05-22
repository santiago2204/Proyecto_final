const bcrypt = require("bcrypt-nodejs");
const User = require ("../models/user.model");

function signUp(req, res){
    const user = new User();
    const { email, password, repeatPassword} = req.body;
    user.email = email;

    user.role = "admin";
    user.active = true;

    if (!password || !repeatPassword){
        res.status(404).send({menssage: " las contraseñas son obligatorias "});
    } else{
        if (password !== repeatPassword){
            res.status(404).send({message: "Las constraseñas no coiciden" });
        }else {
            bcrypt.hash(password, null, null, function(err, hash){
                if (err){
                    res
                      .status(500)
                      .send({ message:"Error al encriptar la contraseña."});
                }else{
                    user.password = hash;
                    user.save((err, useStared) =>{
                        if (err){
                            red.status(500).send({message: "El usuario ya existe"});
                        }else{
                            if(!userStored){
                                res.status(404).send({menssage: "Error al crear el usuario "});
                            }else{
                                res.status(200).send({user: userStored});
                            }
                        }
                    });
                }
            });
        }
    }
}
module.exports = {signUp};
