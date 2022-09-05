import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ky from 'ky'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login';
import {Buffer} from 'buffer'
import { Container } from '@mui/system';


export default function Shop() {

    const API_URL = process.env.REACT_APP_API_URL
    const navigate = useNavigate();

    const [items, setItems] = useState([])
    const [cart, setCart] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        ky.get("isUser", {
            prefixUrl: API_URL,
            headers: {
                "token": localStorage.getItem("JWT")
            }
        }).json()
        .then((res) => {
            setLoggedIn(res.isUser)
        })
        ky.get("inventory", {
            prefixUrl: API_URL
        }).json()
        .then((res) => {
            res.items.map((item) => {
                item.index = res.items.indexOf(item)
                item.image = Buffer.from(item.image.data).toString('base64')
            })
            setItems(res.items)
            setLoaded(true)
        })
    }, [])
    

    const addToCart = (e) => {
        var newCart = [...cart]
        newCart.push(e.currentTarget.value)
        setCart(newCart)
    }

    const goCheckout = () => {
        ky.get("isUser", {
            prefixUrl: API_URL,
            headers: {
                "token": localStorage.getItem("JWT")
            }
        }).json()
        .then((res) => {
            console.log(res)
            if (res.isUser){
                navigate('/checkout', {state: {
                    items: items,
                    cart: cart
                }})
            } else {
                goSignin()
            }
        })   
    }

    const goSignin = () => {
        navigate('/signin')
    }

    const checkOutButton = (
        <IconButton
            color="primary"
            onClick={goCheckout}
            >
                <ShoppingCartIcon />
        </IconButton>
    ) 

    const loginButton = (
        <IconButton
            color="primary"
            onClick={goSignin}
            >
                <LoginIcon />
        </IconButton>
    )

    const item_view = (
        <>
            <Toolbar>
                <Box>
                    {loggedIn ? checkOutButton : loginButton}
                </Box>
            </Toolbar>
            <Container align="center" sx={{width: 1}}>
                <ImageList sx={{ width: 1, height: 1}} cols={3} rowHeight={300} variant="masonry">
                {items.map((item) => (
                    <ImageListItem key={item.img}>
                    <img
                        src={"data:image/jpeg;base64," + item.image}
                        alt={item.name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.name}
                        subtitle={<span>{item.description}</span>}
                        actionIcon={
                            loggedIn
                            ? (
                                <IconButton 
                                color="primary" 
                                value={item.index} 
                                onClick={addToCart}
                                variant="contained"
                                >
                                    <AddShoppingCartIcon fontSize='medium' style={{ color: 'white' }}/>
                                </IconButton>
                            )
                            : <></>
                        }
                    />
                    </ImageListItem>
                ))}
                </ImageList>
            </Container>
            
        </>
    )

    const loading_view = (
        <Container>
          <img src={require("./loading.gif")}></img>
        </Container>
      )

    if (!loaded){
        return loading_view
    } else {
        return item_view
    }

}