import { Button, Divider, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

export default function NotFound(){
    
    return(
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">Oops- we could not found what you are looking for!</Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/catalog'>Go back to Shop</Button>
        </Container>
    )
}