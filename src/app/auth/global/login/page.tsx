'use client'

import { Status } from "@/lib/global-type/type";
import { resetStatus, userLogin } from "@/lib/store/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export interface ILgiinData{
  userEmail:string,
  userPassword:string
}


const UserLogin=()=>{
    //redirection from register page and thier message display coding
    const searchParams = useSearchParams();
    const successMessage = searchParams.get("success"); // gets ?success=message

    //for dynamic backend successs/error messages
    const { status, message } = useAppSelector((store) => store.auth);
    const router = useRouter();

    const dispatch=useAppDispatch()
    //code for login procedure
    const [loginData,setLoginData]=useState<ILgiinData>({
      userEmail:"",
      userPassword:""
    })

    const handleLoginDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
      const{name,value}=e.target
      setLoginData({
        ...loginData,
        [name]:value
      })
    }

    const handleLoginDataSubmission=(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      dispatch(userLogin(loginData))
    }

      // ✅ Redirect after successful registration
    useEffect(() => {
      if (status === Status.SUCCESS && message) { // ✅ ensure message is not null
        router.push(`/?success=${encodeURIComponent(message)}`);
        dispatch(resetStatus())
      }
    }, [status, message, router,dispatch]);

    return(
    <>
        {successMessage && (
          <p style={{ color: "green", marginBottom: "1rem" }}>
            {successMessage}
          </p>
        )}

<div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 py-12">
  {/* Heading */}
  <div className="mt-10 text-center">
    <h2 className="text-3xl md:text-4xl font-bold neon-text text-cyan-400 tracking-wide">
      Welcome Back
    </h2>
    <p className="text-cyan-200 mt-2 text-sm md:text-base">
      Sign in to continue your unforgettable stay.
    </p>
  </div>

  {/* Form Card */}
  <div className="w-full max-w-md bg-white/5 border border-cyan-400/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl scale-90 text-sm text-white z-10">
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-full mb-3">
        <i className="fas fa-sign-in-alt text-cyan-300 text-lg"></i>
      </div>
      <h2 className="text-xl font-bold text-cyan-300">Sign In</h2>
      <p className="text-cyan-100 mt-1 text-sm">Welcome back to the 90’s vibe</p>
    </div>

    <form onSubmit={handleLoginDataSubmission}>
      {/* error message while logging in */}
      {status === Status.ERROR && message && (
        <div className="w-full max-w-md mx-auto my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
          {message}
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 text-sm text-cyan-100">Email</label>
        <div className="relative">
          <input
            name="userEmail"
            type="email"
            onChange={handleLoginDataChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="you@example.com"
          />
          <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
        </div>
      </div>

      {/* Password */}
      <div className="mb-2">
        <label className="block mb-1 text-sm text-cyan-100">Password</label>
        <div className="relative">
          <input
            name="password"
            type="password"
            onChange={handleLoginDataChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-white"
          >
            <i className="fas fa-eye text-xs"></i>
          </button>
        </div>
      </div>

      {/* Forgot Password link */}
      <div className="flex justify-end mb-6">
        <Link
          href="/auth/global/forgot-password"
          className="text-xs text-cyan-300 hover:text-white font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === Status.LOADING}
        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 rounded-md font-semibold transition-colors shadow-lg"
      >
        {status === Status.LOADING ? "Signing in..." : "Sign In"}
      </button>

      {/* Switch to Register */}
      <p className="mt-5 text-center text-cyan-200 text-sm">
        Don’t have an account?{" "}
        <Link
          href="/auth/global/register"
          className="text-cyan-400 hover:text-white font-semibold"
        >
          Create Account
        </Link>
      </p>
    </form>
  </div>
</div>


    </>
)
}

export default UserLogin