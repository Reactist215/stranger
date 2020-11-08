import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './app/App';
import { Auth, Toaster } from './app/main/components';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
    <Provider store={store}>
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}
            placement="bottom-center"
        >
            <Auth>
                <Toaster>
                    <App />
                </Toaster>
            </Auth>
        </ToastProvider>
    </Provider>,
    document.getElementById('root')
);
