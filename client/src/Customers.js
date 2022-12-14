import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ky from 'ky';



export default function CustomerContent(){

    const [customers, setCustomers] = useState([])
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        const getCustomers = async () => {
            ky.get('customers', {
                prefixUrl: API_URL,
                headers: {
                    "token": localStorage.getItem("JWT")
                }
            }).json()
            .then((res) => {
                console.log(res.users)
                setCustomers(res.users)
            })
        }
        getCustomers()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('handlesubmit called')
        const data = new FormData(event.currentTarget);
        ky.post('createUser', {
            prefixUrl: API_URL,
            json: {
                name: data.get('name')
            }
        })
        .then(() => window.location.reload())
    }

    return(
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                id="name"
                label="Name"
                name="name"
                autoFocus
                />
                
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Create User
                </Button>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Phone number</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Account Activated</TableCell>
                    <TableCell align="right">Code</TableCell>
                    <TableCell align="right">Is Admin</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {customers.map((c) => (
                    <TableRow
                    key={c.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {c.name}
                    </TableCell>
                    <TableCell align="right">{c.phone_number}</TableCell>
                    <TableCell align="right">{String(c.address)}</TableCell>
                    <TableCell align="right">{String(c.initialized)}</TableCell>
                    <TableCell align="right">{String(c.access_code)}</TableCell>
                    <TableCell align="right">{String(c.isAdmin)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
    
}