
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { useAppDispatch } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { setBasket } from "../Basket/basketSlice";

interface Props{
    product: Product;
}

export default function ProductCard({product}: Props){
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
  }
    return (
      <Card>
          <CardHeader 
              avater={
                  <Avatar sx={{bgcolor: 'secondary.main'}}>
                      {product.name.charAt(0).toUpperCase()}
                  </Avatar>
              }    
              title={product.name}
              titleTypographyProps={{
                  sx:{fontWeight: 'bold', color: 'primary.main'}
              }}
          />
          <CardMedia
            component="img"
            sx={{height:140, backgroundSize: 'contain', bgcolor: 'primary.main'}}
            image={product.pictureUrl}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom color='secondary' variant="h5">
                {currencyFormat(product.price)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.brand} / {product.type}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
                onClick={() => handleAddItem(product.id)} 
                size="small">Add to Cart</Button>
            <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
          </CardActions>
        </Card>
    )
}