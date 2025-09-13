import AdminDashboard from "@/app/component/dashboard/dashboard"

function AdminDashboardLayout({children,}:Readonly<{children:React.ReactNode}>){
    return(
        <AdminDashboard>
            {children}
        </AdminDashboard>
    )
}

export default AdminDashboardLayout