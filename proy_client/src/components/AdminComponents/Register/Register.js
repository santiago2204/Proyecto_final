import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {signUpApi} from "../../../api/user";
import "./Register.scss";
import {
  emailValidation,
  minLengthValidation,
} from "../../../validations/FormValidations";
import "./Register.scss";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };


  const inputValidation = (e) => {
    console.log(formValid)
    const { type, name}= e.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === "password"){
      setFormValid({...formValid, [name]:minLengthValidation(e.target, 6) });
    }
    if (type ==="checkbox"){
      setFormValid({...formValid, [name]: e.target.checked});
    }
  };

  const register = async (e) => {
    e.preventDefault();
    console.log("Estoy en registrar");
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;

    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        menssage: " Todos los campos son obligatorios",
      });
      console.log("vacios");
    }else{
      if (passwordVal !== repeatPasswordVal){
        notification["eroor"]({
          message: "las contraseñas tienen que ser iguales"
        });
        console.log("Son diferentes");
      }else {
        const result  = await signUpApi(inputs);
        console.log(result)
        if (!result.user){

          notification ["error"]({
            message: result.message,
          });
        }else{
          notification["success"]({
            message:result.message,
          });
          RegisterForm();
        }
      }
    }
  };
  const  resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i= 0; 1 < inputs.length; i++){
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }
    setInputs({
      email:"",
      password:"",
      repeatPassword:"",
      privacyPolicy:"",
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <Form className="register-form" onSubmit={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leído y acepto la política de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
