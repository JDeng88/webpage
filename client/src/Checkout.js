
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button'


export default function Checkout() {


    // const cart = useLocation().state.cart
    const [cart, setCart] = useState([])
    const [items, setItems] = useState([])
    const location = useLocation()

    useEffect(() => {
        setCart(location.state.cart)
        setItems(location.state.items)
    }, [])

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {cart.map((item) => (
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary={items[item].name} secondary={items[item].description} />
            </ListItem>
          ))}
        </List>
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Create User
        </Button>
      </>
    );
  }