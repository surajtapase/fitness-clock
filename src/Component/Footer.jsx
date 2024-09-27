import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <footer>
                <p>© {currentYear} . All rights reserved. | Designed and developed by Suraj Tapase.</p>
            </footer>
        </div>
    );
}

export default Footer;
