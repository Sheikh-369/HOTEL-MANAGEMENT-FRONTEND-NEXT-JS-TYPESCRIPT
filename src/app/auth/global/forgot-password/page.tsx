'use client'
import { Status } from "@/lib/global-type/type"
import { forgotPassword, resetStatus } from "@/lib/store/auth/auth-slice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export interface IForgotPasswordData{
  userEmail:string
}

const ForgotPassword=()=>{
  const { status, message } = useAppSelector((store) => store.auth);
  const router = useRouter();

  const dispatch=useAppDispatch()

  const [forgotPasswordData,setForgotPasswordData]=useState<IForgotPasswordData>({
    userEmail:""
  })

  const handleForgotPasswordDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=e.target
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]:value
    })
  }

  const handleForgotPasswordDataSubmission=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch(forgotPassword(forgotPasswordData))

  }

  useEffect(() => {
  if (status === Status.SUCCESS && message) {
    // ✅ Redirects towards reset-password page after success    
    router.push(`/auth/global/reset-password?success=${encodeURIComponent(message)}`); //redirects towords reset-password
    dispatch(resetStatus()); // clear SUCCESS status after redirect
  }}, [status, message,router,dispatch]);

    return(
        <>
            <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 py-12">
  {/* Heading */}
  <div className="mt-10 text-center">
    <h2 className="text-3xl md:text-4xl font-bold neon-text text-cyan-400 tracking-wide">
      Forgot Password?
    </h2>
    <p className="text-cyan-200 mt-2 text-sm md:text-base">
      Enter your registered email and we’ll send you an OTP to reset your password.
    </p>
  </div>

  {/* Form Card */}
  <div className="w-full max-w-md bg-white/5 border border-cyan-400/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl scale-90 text-sm text-white z-10">
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-full mb-3">
        <i className="fas fa-envelope-open-text text-cyan-300 text-lg"></i>
      </div>
      <h2 className="text-xl font-bold text-cyan-300">Request OTP</h2>
      <p className="text-cyan-100 mt-1 text-sm">Reset your password securely</p>
    </div>

    <form onSubmit={handleForgotPasswordDataSubmission}>
      {/* error or success messages */}
      {status === Status.ERROR && message && (
        <div className="my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
          {message}
        </div>
      )}
      {status === Status.SUCCESS && message && (
        <div className="my-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
          {message}
        </div>
      )}

      {/* Email */}
      <div className="mb-6">
        <label className="block mb-1 text-sm text-cyan-100">Email</label>
        <div className="relative">
          <input
            name="userEmail"
            type="email"
            onChange={handleForgotPasswordDataChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="you@example.com"
          />
          <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === Status.LOADING}
        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 rounded-md font-semibold transition-colors shadow-lg"
      >
        {status === Status.LOADING ? "Sending OTP..." : "Send OTP"}
      </button>

      {/* Back to login */}
      <p className="mt-5 text-center text-cyan-200 text-sm">
        Remembered your password?{" "}
        <Link
          href="/auth/global/login"
          className="text-cyan-400 hover:text-white font-semibold"
        >
          Back to Login
        </Link>
      </p>
    </form>
  </div>
</div>

        </>
    )
}

export default ForgotPassword