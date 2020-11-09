import React from 'react';
import { Header, Footer } from './components'
/**
 * 
 * Header, Content, Footer make up for app layout.
 */
const Layout = ({ children }) => (
    <React.Fragment>
        <Header />
        {children}
        <Footer />
    </React.Fragment>
);

export default Layout;