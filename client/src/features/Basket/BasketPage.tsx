import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react"
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./basketSlice";
import BasketSumary from "./BasketSumary";


export default function BasketPage(){
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({
      
        loading: false,
        name: ''
      });
    // for add item
    function handleAddItem(productId: number, name: string){
        setStatus({loading: true, name: name });
        agent.Basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name: ''}))
    }
    // for remove item
    function handleRemoveItem(productId: number, quantity=1, name: string) {
      
      setStatus({loading: true, name});
      agent.Basket.removeItem(productId, quantity)
          .then(() => dispatch(removeItem({productId, quantity})))
          .catch(error => console.log(error))
          .finally(() => setStatus({loading: false, name: ''}))
    }
    
    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket?.items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name}style={{height: 50, marginRight:20}}/>
                    <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{(item.price / 100).toFixed(2)}</TableCell>
              <TableCell align="center">
                  <IconButton onClick={() => handleRemoveItem(item.productId, 1, 'rem')} color="error">
                      <Remove/>
                  </IconButton>
                    {item.quantity}
                  <IconButton onClick={() => handleAddItem(item.productId, 'add' )} color="secondary">
                      <Add/>
                  </IconButton>
                </TableCell>
              <TableCell align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                 <IconButton onClick={() => handleRemoveItem(item.productId, item.quantity, 'del')} color='error'>
                    <Delete/>
                 </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
       <Grid item xs={6}/>
       <Grid item xs={6}>
          <BasketSumary/>
          <Button 
              component={Link}
              to='/checkout'
              variant="contained"
              size='large'
              fullWidth
          >
             checkout  
          </Button>
       </Grid>
    </Grid>
    </>
    
    )
}