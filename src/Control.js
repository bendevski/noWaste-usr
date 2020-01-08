import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Points from './components/Points';
import Menu from './components/Menu';
import axios from 'axios';
import MyOrders from './components/MyOrders';

export default function () {
    const [menu, setMenu] = useState(null);
    const [err, setErr] = useState(null);
    const [ordersRaw, setOrdersRaw] = useState(null);
    const [orders, setOrders] = useState(null);
    const [user, setUser] = useState({
        email: "Guest",
        points: 0,
        token: "",
        id: null,
    });
    
    function logOut(){
        setUser({
            email: "Guest",
            points: 0,
            token: "",
            id: null
        });
    };
    function change(thing) {

        setUser({
            ...user,
            ...thing
        });
    }
    function what(){
        async function fetchData() {
        await axios({
          method: 'get',
          url: '/api/menu',
          headers: {"Authorization": "Bearer " + user.token}
        }).then((result) => { setMenu(result.data); }).catch((error) => { setErr(error) });

      }

      fetchData()
      
    };
    function what2(){
        async function fetchData() {
        await axios({
          method: 'get',
          url: '/api/'+ user.id + '/orders',
          headers: {"Authorization": "Bearer " + user.token}
        }).then((result) => { setOrdersRaw(result.data); }).catch((error) => { setErr(error) });

      }

      fetchData()
     
    };
    if (!menu && user.id){
        
        what();
        what2();
        
        
    }
    if(ordersRaw && !orders)
    {
        console.log("men",menu,"ord", ordersRaw)

        setOrders(ordersRaw.map((order)=> {return ({qty:order.qty, date:order.created_at, name:menu.filter((thing)=>thing.id==order.fooditem_id)[0].name})}, menu))
    }
    return (

        <div>
            <Router>
                <NavBar data={user} log={logOut} />
                <Route path="/login">
                    <Login changeDis={change} />
                </Route>
                <Route path="/register">
                    <Register changeDis={change} />
                </Route>

                <Route path="/points">
                    <Points data={user} changeDis={change}/>
                </Route>

                <Route path="/menu">
                    <Menu data={user} menu={menu}/>
                </Route>

                <Route path="/orders">
                    <MyOrders orders={orders}/>
                </Route>
            </Router>
        </div>
    )
}