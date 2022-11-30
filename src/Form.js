import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Form() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is required!"),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match!")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("HEY", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "2rem",
      }}
    >
      <input type={"text"} placeholder="Full Name" {...register("fullName")} />
      <p style={{ color: "red" }}>{errors.fullName?.message}</p>
      <input type={"text"} placeholder="Email" {...register("email")} />
      <p style={{ color: "red" }}>{errors.email?.message}</p>
      <input type={"number"} placeholder="Age" {...register("age")} />
      <p style={{ color: "red" }}>{errors.age?.message}</p>
      <input
        type={"password"}
        placeholder="Password"
        {...register("password")}
      />
      <p style={{ color: "red" }}>{errors.password?.message}</p>
      <input
        type={"password"}
        placeholder="Conirm Password"
        {...register("confirmPassword")}
      />
      <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
      <input type={"submit"} />
    </form>
  );
}

export default Form;
