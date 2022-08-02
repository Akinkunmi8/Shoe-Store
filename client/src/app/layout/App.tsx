import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/About/AboutPage";
import BasketPage from "../../features/Basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/Contact/ContactPage";
import HomePage from "../../features/Home/HomPage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import NotFound from "../error/NotFound";
import ServerError from "../error/ServerError";
import { Product } from "../models/product";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";


function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);
// get basket while app is loading

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
          .then(basket => setBasket(basket))
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
  }, [setBasket])

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
          <Route path="/server-error" element={<ServerError/>} />
          <Route path="/basket" element={< BasketPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/not-found" element={<NotFound/>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
