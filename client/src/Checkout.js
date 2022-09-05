
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
    const [total, setTotal] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setCart(location.state.cart)
        setItems(location.state.items)
        console.log(cart)
        var cart_total = 0
        for (var item of cart){
          console.log('curr item price is', items[item].price)
          cart_total += items[item].price
        }
        console.log(cart_total)
        setTotal(cart_total)
        setLoaded(true)
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

    if (loaded){
      return (
        <Container maxWidth="sm" sx={{my: 10}}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <List disablePadding>
            {cart.map((item) => (
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={items[item].name} secondary={items[item].description} />
                <ListItemText primary={items[item].price} style={{flex: 1}}/>
              </ListItem>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <ListItemText primary={total} style={{flex: 1}}/>
            </ListItem>
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
    
  }