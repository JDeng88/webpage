import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ky from 'ky';



export default function OrderContent(){

    const [orders, setOrders] = useState([])
    const API_URL = process.env.API_URL

    useEffect(() => {
        const getOrders = async () => {
            ky.get('orders', {
                prefixUrl: API_URL
            }).json()
            .then((res) => {
                setOrders(res.orders)
            })
        }
        getOrders()
    }, [])

    return(
        <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Items</TableCell>
                    <TableCell align="right">Total</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {orders.map((o) => (
                    <TableRow
                    key={o._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {o.customer}
                    </TableCell>
                    <TableCell align="right">{o.address}</TableCell>
                    <TableCell align="right">{String(o.items)}</TableCell>
                    <TableCell align="right">{String(o.total_price)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
    
}