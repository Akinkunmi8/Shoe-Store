import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ServerError(){
    const history = useState();
    const {state}: any = useLocation ();
    return(
        <Container component={Paper}>
            {state.error? (
                <>
                <Typography variant="h5" color='error' gutterBottom>{state.error.title}</Typography>
                <Divider/>
                <Typography>{state.error.detail || 'internal server error'}</Typography>
                </>
            ) :(
                <Typography variant="h5" gutterBottom>error</Typography>
            )}
            <Button fullWidth component={Link} to='/catalog'>Go back to Catalog</Button>
        </Container>
   ) 
}