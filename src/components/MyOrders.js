import React from 'react';

export default function(props){
    if (!props.orders){
        return(
            <p>Not logged in</p>
        );
    }
    const orders = props.orders.map((order)=>{return (
        <div>
            <div>{order.name}</div>
            <div>{order.qty}</div>
            <div>{order.date}</div>
        </div>
    )});
    return(
        <div className="Orders">
            {orders};
        </div>
    )

}