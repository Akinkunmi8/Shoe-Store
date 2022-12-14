import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/app/layout/Styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import{createBrowserHistory} from "history";
import { StoreProvider } from './app/context/StoreContext';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <StoreProvider>
        <Provider store={store}>
           <App/>
        </Provider>
      </StoreProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
