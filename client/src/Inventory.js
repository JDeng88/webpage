import {useState, useEffect} from 'react'
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



export default function InventoryContent(){

    const API_URL = process.env.API_URL || 'http://localhost:8088'

    const [items, setItems] = useState([])

    useEffect(() => {
      const getItems = async () => {
        ky.get('inventory', {
            prefixUrl: API_URL
        }).json()
        .then((res) => {
          res.items.map(item => {
            item.image = Buffer.from(item.image.data).toString('base64')
          })
          setItems(res.items)
        })
      }
      getItems()
    })
          


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      ky.post('upload', {
          prefixUrl: API_URL,
          json: {
              name: data.get('name'),
          }
      })
      .then(() => window.location.reload())
    }

    return(
      <>
        <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            id="name"
            label="Name"
            name="name"
            autoFocus
            />

            <TextField
            margin="normal"
            required
            id="description"
            label="Description"
            name="description"
            autoFocus
            />
            
            <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Create Item
            </Button>
        </Box>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Description</TableCell>
                {/* <TableCell align="right">Image</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {items.map((i) => (
                <TableRow
                key={i.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {i.name}
                </TableCell>
                <TableCell align="right">{i.description}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
      </>
    )
    
}