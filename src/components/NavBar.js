import React from 'react';
import {Link} from 'react-router-dom';

export default function (props){

    if (props.data.id){
        return(
            <div>
                <div className="Links">
                    <Link to='/'>Home</Link>
                    <Link to='/cart'>Cart</Link>
                    <Link to='/menu'>Order</Link>
                    <Link to='/points'>Add points</Link>
                    <Link to='/orders'>My orders</Link>
                    <Link to='/' onClick={props.log}>Log out</Link>
                </div>
                <div className="You">
                    {props.data.email}
                    {props.data.points}
                </div>
            </div>
            )

    }
    ///uwu
    else{
        return(
            <div>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
            <div className="You">
                {props.data.email} 
             </div>
            </div>
        )
    }


}