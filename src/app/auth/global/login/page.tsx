'use client'

import { useSearchParams } from "next/navigation";


const UserLogin=()=>{
    const searchParams = useSearchParams();
    const successMessage = searchParams.get("success"); // gets ?success=message

    return(
    <>
        {successMessage && (
        <p style={{ color: "green", marginBottom: "1rem" }}>
          {successMessage}
        </p>
      )}


    </>
)
}

export default UserLogin