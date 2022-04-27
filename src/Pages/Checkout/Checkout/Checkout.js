import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const [user, loading, error] = useAuthState(auth);
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    // const [user, setUser] = useState({
    //     name: 'Akber the great',
    //     email: 'akber@mom.taz',
    //     address: 'Tazmohol road',
    //     phone: '01911766123'
    // })
    // const handleAddressChange = event => {
    //     const { address, ...rest } = user;
    //     const newAddress = event.target.value;
    //     const newUser = { adderss: newAddress, ...rest };
    //     setUser(newUser);
    // }

    const handlePlaceOrder = event => {
        event.preventDefault()
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                // console.log(response);
                const { data } = response;
                if (data.insertedId) {
                    toast('Your order booked successful');
                    event.target.reset();
                }

            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please order {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' value={user.displayName} type="text" name="name" placeholder='Name' id="name" required disabled />
                <br />
                <input className='w-100 mb-2' autoComplete='off' value={user.email} disabled type="text" name="email" placeholder='email' id="name" required />
                <br />
                <input className='w-100 mb-2' value={service.name} type="text" name="service" placeholder='service' id="name" required />
                <br />
                <input className='w-100 mb-2' autoComplete='off' value={user.address} type="text" name="address" placeholder='address' id="name" required />
                <br />
                <input className='w-100 mb-2' autoComplete='off' value={user.phone} type="text" name="phone" placeholder='phone' id="name" required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place order" />
            </form>
        </div>
    );
};

export default Checkout;