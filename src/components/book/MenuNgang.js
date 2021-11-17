import React from "react";
import { Link } from 'react-router-dom';
import { routes } from "../../config/routes";


export const MenuNgang = () => {
    return (
        <div style={{ marginTop: '20px', marginLeft: '10px' }}>
            {
                routes.map((item) => (
                    <Link style={{
                        paddingRight: '20px',
                        fontWeight: 'bold', 
                        textDecoration: 'none', 
                        color: 'black',                     
                        
                    }} 
                    to={item.path} className="menuItem">{item.label}</Link>
                ))
            }
        </div>
    )
}
