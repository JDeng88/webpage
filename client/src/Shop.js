import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ky from 'ky'
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

export default function Shop() {

    const API_URL = process.env.API_URL || 'http://localhost:8088'
    const navigate = useNavigate();

    const [items, setItems] = useState([])
    const [cart, setCart] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
      const getItems = async () => {
        ky.get('inventory', {
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
      }
      getItems()
    }, [])

    const addToCart = (e) => {
        var newCart = [...cart]
        newCart.push(e.currentTarget.value)
        console.log(newCart)
        setCart(newCart)
    }

    const goCheckout = () => {
        navigate('/checkout', {state: {
            items: items,
            cart: cart
        }})
    }

    const item_view = (
        <>
            <Toolbar>
                <Box>
                    <IconButton
                    color="primary"
                    onClick={goCheckout}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <ImageList sx={{ width: 1, height: 1, margin: 2, padding: 2 }}>
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
                    position="below"
                    actionIcon={
                        <Button 
                        color="primary" 
                        value={item.index} 
                        onClick={addToCart}
                        variant="contained"
                        >
                        Add to cart
                        </Button>
                    }
                />

                
                </ImageListItem>
            ))}
            </ImageList>
        </>
    )

    if (!loaded){
        return (<h1> loading... </h1>)
    } else {
        return(item_view)
    }

}