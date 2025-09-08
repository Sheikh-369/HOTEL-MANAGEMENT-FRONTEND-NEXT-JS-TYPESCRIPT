'use client'
import { Status } from "@/lib/global-type/type";
import { resetPassword, resetStatus } from "@/lib/store/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export interface IResetPasswordData{
  OTP:string,
  userEmail:string,
  newPassword:string,
  confirmNewPassword:string
}

const ResetPassword=()=>{
  //to display the dynamic backend success message from forgot password
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("success"); // gets ?success=message

  //for dynamic success/error message from backend
  const { status, message } = useAppSelector((store) => store.auth);

  //for reset password logic
  const dispatch=useAppDispatch()
  const router=useRouter()
  const [resetPasswordData,setResetPasswordData]=useState<IResetPasswordData>({
    OTP:"",
    userEmail:"",
    newPassword:"",
    confirmNewPassword:""
  })

  const handleResetPasswordDataChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=e.target
    setResetPasswordData({
      ...resetPasswordData,
      [name]:value
    })
  }

  const handResetPasswordDataSubmission=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch(resetPassword(resetPasswordData))
  }

  //for dynamic success/error message from backend
  useEffect(() => {
  if (status === Status.SUCCESS && message) {
    // ✅ Redirects towards login page after success    
    router.push(`/auth/global/login?success=${encodeURIComponent(message)}`); //in login page
    dispatch(resetStatus()); // clear SUCCESS status after redirect
  }}, [status, message,router,dispatch]);

    return(
        <>
            <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 py-12">
              {/* Success message at the top */}
              {successMessage && (
                      <p style={{ color: "green", marginBottom: "1rem" }}>
                        {successMessage}
                      </p>
                    )}

  {/* Heading */}
  <div className="mt-10 text-center">
    <h2 className="text-3xl md:text-4xl font-bold neon-text text-cyan-400 tracking-wide">
      Reset Password
    </h2>
    <p className="text-cyan-200 mt-2 text-sm md:text-base">
      Enter the OTP sent to your email and set a new password.
    </p>
  </div>

  {/* Form Card */}
  <div className="w-full max-w-md bg-white/5 border border-cyan-400/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl scale-90 text-sm text-white z-10">
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-full mb-3">
        <i className="fas fa-unlock-alt text-cyan-300 text-lg"></i>
      </div>
      <h2 className="text-xl font-bold text-cyan-300">Set New Password</h2>
      <p className="text-cyan-100 mt-1 text-sm">Your OTP is valid for 10 minutes</p>
    </div>

    <form onSubmit={handResetPasswordDataSubmission}>
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
      <div className="mb-4">
        <label className="block mb-1 text-sm text-cyan-100">Email</label>
        <div className="relative">
          <input
            name="userEmail"
            type="email"
            onChange={handleResetPasswordDataChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="you@example.com"
          />
          <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
        </div>
      </div>

      {/* OTP */}
      <div className="mb-4">
        <label className="block mb-1 text-sm text-cyan-100">OTP</label>
        <div className="relative">
          <input
            name="OTP"
            type="text"
            onChange={handleResetPasswordDataChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 rounded-md placeholder-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter the OTP"
          />
          <i className="fas fa-key absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs"></i>
        </div>
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block mb-1 text-sm text-cyan-100">New Password</label>
        <div className="relative">
          <input
            name="newPassword"
            type="password"
            onChange={handleResetPasswordDataChange}
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

      {/* Confirm New Password */}
      <div className="mb-6">
        <label className="block mb-1 text-sm text-cyan-100">Confirm New Password</label>
        <div className="relative">
          <input
            name="confirmNewPassword"
            type="password"
            onChange={handleResetPasswordDataChange}
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

      {/* Submit */}
      <button
        type="submit"
        disabled={status === Status.LOADING}
        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 rounded-md font-semibold transition-colors shadow-lg"
      >
        {status === Status.LOADING ? "Resetting..." : "Reset Password"}
      </button>

      {/* Back to login */}
      <p className="mt-5 text-center text-cyan-200 text-sm">
        Back to{" "}
        <Link
          href="/auth/global/login"
          className="text-cyan-400 hover:text-white font-semibold"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

        </>
    )
}

export default ResetPassword