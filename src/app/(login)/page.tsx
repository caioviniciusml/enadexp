"use client";
import { useState } from "react";
import { LoginForm } from "@/components/login/login-form";
import { SignupForm } from "@/components/login/signup-form";

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<boolean>(false);

  return (
    <div className="px-8 py-12 flex flex-col items-center gap-8 bg-white border border-neutral-400 rounded-xl shadow-xl">
      <div className="w-80 flex flex-col items-center gap-2">
        <h1 className="w-fit text-primary-green text-2xl font-bold">
          ENADExp
        </h1>
        <p className="text-neutral-500 text-center">
          Uma plataforma focada na preparação estratégica e eficiente para o
          ENADE.
        </p>
      </div>
      {loginMode ? <LoginForm /> : <SignupForm />}
      {loginMode ? (
        <button
          className="text-sm text-secondary-blue font-medium underline cursor-pointer"
          onClick={() => setLoginMode(false)}
        >
          Ainda não possui conta? Registre-se aqui
        </button>
      ) : (
        <button
          className="text-sm font-medium underline cursor-pointer"
          onClick={() => setLoginMode(true)}
        >
          Ja possui uma conta? Entre-aqui
        </button>
      )}
    </div>
  );
}
