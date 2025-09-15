"use client"
import { Status } from "@/lib/global-type/type"
import { resetStatus, userRegister } from "@/lib/store/auth/auth-slice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export interface RegisterData{
  userName:string,
  userEmail:string,
  phoneNumber:string,
  address:string,
  password:string,
  confirmPassword:string
}

const UserRegister=()=>{
  const { status, message } = useAppSelector((store) => store.auth);//for backend message
  const router=useRouter()
  

  const dispatch=useAppDispatch()//for submition data sending
    const[registerData,setRegisterData]=useState<RegisterData>({
      userName:'',
      userEmail:'',
      phoneNumber:"",
      address:"",
      password:"",
      confirmPassword:""
    })

    const handleRegisterDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
      const{name,value}=e.target
      setRegisterData({
        ...registerData,
        [name]:value
      })
    }

    const handleRegisterDataSubmissioin=async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      await dispatch(userRegister(registerData))

    }

  //sending to login page
  useEffect(() => {
  if (status === Status.SUCCESS && message) {
    // ✅ Redirects towards login page after success
    router.push(`/auth/global/login?success=${encodeURIComponent(message)}`); // or "/dashboard" if auto-login
    dispatch(resetStatus()); // clear SUCCESS status after redirect
  }}, [status, message,router,dispatch]);

    return(
        <>
       <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 py-12">
        {/* “Experience Unforgettable Stays” Section */}
      <div className="mt-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold neon-text text-cyan-400 tracking-wide">
          Experience Unforgettable Stays
        </h2>
        <p className="text-cyan-200 mt-2 text-sm md:text-base">
          Experience the warmth and elegance of our hotel — where every guest is treated like family.
        </p>
      </div>
      {/* Form Card */}
      <div className="w-full max-w-md bg-white/5 border border-cyan-400/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl scale-90 text-sm text-white z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-full mb-3">
            <i className="fas fa-user-plus text-cyan-300 text-lg"></i>
          </div>
          <h2 className="text-xl font-bold text-cyan-300">Create Account</h2>
          <p className="text-cyan-100 mt-1 text-sm">Join the vibe of the 90's</p>
        </div>

        <form onSubmit={handleRegisterDataSubmissioin}>
          {/* error message while filling register form */}
          {status === Status.ERROR && message && (
            <div className="w-full max-w-md mx-auto my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
              {message}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-cyan-100">Full Name</label>
            <div className="relative">
              <input
                name="userName"
                type="text"
                onChange={handleRegisterDataChange}
                className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="John Doe"
              />
              <i className="fas fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-cyan-100">Email</label>
            <div className="relative">
              <input
                name="userEmail"
                type="email"
                onChange={handleRegisterDataChange}
                className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="you@example.com"
              />
              <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-cyan-100">Phone Number</label>
            <div className="relative">
              <input
                name="phoneNumber"
                type="text"
                onChange={handleRegisterDataChange}
                className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="9XXXXXXXXX"
              />
              <i className="fas fa-phone absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
            </div>
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-cyan-100">Address</label>
            <div className="relative">
              <input
                name="address"
                type="text"
                onChange={handleRegisterDataChange}
                className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Kathmandu"
              />
              <i className="fas fa-phone absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-cyan-100">Password</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                onChange={handleRegisterDataChange}
                className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="••••••••"
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-white">
                <i className="fas fa-eye text-xs"></i>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block mb-1 text-sm text-cyan-100">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type="password"
                onChange={handleRegisterDataChange}
                className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="••••••••"
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-white">
                <i className="fas fa-eye text-xs"></i>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === Status.LOADING}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 rounded-md font-semibold transition-colors shadow-lg"
          >
            {status === Status.LOADING ? "Registering..." : "Sign Up"}
          </button>

          {/* Switch to Login */}
          <p className="mt-5 text-center text-cyan-200 text-sm">
            Already have an account?{" "}
            <Link href="/auth/global/login" className="text-cyan-400 hover:text-white font-semibold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>


        </>
    )
}
export default UserRegister