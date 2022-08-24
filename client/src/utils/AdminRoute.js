import { Navigate, Outlet } from 'react-router-dom'
import ky from 'ky'

const API_URL = process.env.API_URL || 'http://localhost:8088'

const checkAdmin = async () => {
    var res = await ky.get("/isAdmin", {
      prefixUrl: API_URL
    })
    return res.isAdmin
}

const AdminRoute = () => {
    checkAdmin()
        .then((isAdmin) => {
            console.log('response received from api')
            return ( isAdmin ? <Outlet/> : <Navigate to='/'/> )
        })
   
}

export default AdminRoute