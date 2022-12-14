
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setBasket } from "../Basket/basketSlice";
export default function ProductDetailsPage(){
//    use parameter to fetch data from API
   const {basket} = useAppSelector(state => state.basket);
   const dispatch = useAppDispatch(); 
   const {id} = useParams<{id: string}>();
   const [product, setProduct] = useState<Product | null>();
   const [loading, setLoading] = useState(true);
   const [quantity, setQuantity] = useState(0);
   const [submitting, setSubmitting] = useState(false);
   const item = basket?.items.find(i => i.productId === product?.id);
       // use axios to get data from api
   useEffect(() => {
    if(id !== undefined){
        if(item) setQuantity(item.quantity);
        agent.Catalog.details(parseInt(id))
             .then(response => setProduct(response))
             .catch(error => console.log(error))
             .finally(() => setLoading(false));
    }
   }, [id, item])
   // to handle input
   function handleInputChange(event: any){
       if (event.target.value >= 0){
        setQuantity(parseInt(event.target.value));
       } 
   }
   function handleUpdatedCart(){
    setSubmitting(true);
    if (!item || quantity > item.quantity){
        const updatedQuantity = item ? quantity - item.quantity : quantity ;
        agent.Basket.addItem(product?.id!, updatedQuantity)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setSubmitting(false))
    }else {
        const updatedQuantity = item.quantity - quantity;
        agent.Basket.removeItem(product?.id!, updatedQuantity)
            .then(() => removeItem( product?.id!, updatedQuantity))
            .catch(error => console.log(error))
            .finally(()=>setSubmitting(false));
    }
   }
   
   if (loading) return <LoadingComponent message='Loading product...'/>
   if (!product) return <h3>Product not found</h3>
    return (
        // rendering the product details
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl}
                    alt={product.name} style={{width: '100%'}}/>
            </Grid>
            
                <Grid item xs={6}>
                    <Typography variant='h3'>{product.name}</Typography>
                    <Divider sx={{mb: 2}}/>
                    <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField 
                                onChange={handleInputChange}
                                variant="outlined"
                                type='number'
                                label='Quantity in Cart'
                                fullWidth
                                value={quantity}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                                disabled={item?.quantity === quantity || !item && quantity === 0}
                                onClick={handleUpdatedCart}
                                sx={{height: '55px'}}
                                color='primary'
                                size="large"
                                variant="contained"
                                fullWidth
                            >
                                {item ?'Update quantity' : 'Add to Cart' }
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
    )
}

function removeItem(arg0: number, quantity: number): any {
    throw new Error("Function not implemented.");
}
