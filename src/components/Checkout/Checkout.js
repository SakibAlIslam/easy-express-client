import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const Checkout = () => {

    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [product, setProduct] = useState({});

    const history = useHistory();

    useEffect(() => {
        fetch(`https://shielded-peak-13203.herokuapp.com/product/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
    },[id]);

    const {title, quantity, price} = product;

    const orderInfo = {
        email: user.email,
        date: new Date(),
        title: title, 
        quantity: quantity,
        price: price
    }

    const handleCheckOut = () =>{
        fetch(`https://shielded-peak-13203.herokuapp.com/addOrder`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderInfo)
        })
        .then(response => response.json)
        .then(data => {
            alert('Thanks! Your order has been placed, Enjoy Shopping');
            history.replace('/')
        })
    }

    return (
            <div className="container mt-5">
            <h2 className="mb-5">Checkout</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{title}</td>
                        <td>{quantity}</td>
                        <td>${price}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><b>Total</b></td>
                        <td>${price}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleCheckOut} className='btn btn-success'>Checkout</button>
        </div>
    );
};

export default Checkout;