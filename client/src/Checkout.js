
import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button'
import { Container} from '@mui/material';
import ky from 'ky';


export default function Checkout() {
  
    const API_URL = process.env.REACT_APP_API_URL

    const [cart, setCart] = useState([]) //indices of items in cart array
    const [items, setItems] = useState([]) 
    const location = useLocation()

    useEffect(() => {
        setCart(location.state.cart)
        setItems(location.state.items)
    }, [])

    const submitOrder = async () => {
      var cart_ids = []
      for (var item of cart){
        cart_ids.push(items[item]._id)
      }
      console.log(cart_ids)
      ky.post('createOrder', {
        prefixUrl: API_URL,
        headers: {
          "token": localStorage.getItem("JWT")
        },
        json: {
          cart: cart_ids
        }
      })
    }

    return (
      <Container maxWidth="sm" sx={{my: 10}}>
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
            onClick={submitOrder}
            >
            Confirm Order
        </Button>
      </Container>
    );
  }