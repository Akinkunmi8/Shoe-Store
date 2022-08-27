import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/About/AboutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import BasketPage from "../../features/Basket/BasketPage";
import { setBasket } from "../../features/Basket/basketSlice";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/Contact/ContactPage";
import HomePage from "../../features/Home/HomPage";
import agent from "../api/agent";
import NotFound from "../error/NotFound";
import ServerError from "../error/ServerError";
import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
// get basket while app is loading

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
          .then(basket => dispatch(setBasket(basket)))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));     
    } else{
      setLoading(false);
    }

  })

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  }, [dispatch])

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  if (loading) return < LoadingComponent message="Initialising app..."/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog/>} />
          <Route path="/catalog/:id" element={<ProductDetails/>} />
          <Route path="/About" element={<AboutPage/>} />
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/server-error" element={<ServerError/>} />
          <Route path="/basket" element={< BasketPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>      
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/not-found" element={<NotFound/>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
