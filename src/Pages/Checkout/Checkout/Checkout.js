import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user, setUser] = useState({
        name: 'Akber the great',
        email: 'akber@mom.taz',
        address: 'Tazmohol road',
        phone: '01911766123'
    })
    const handleAddressChange = event => {
        const { address, ...rest } = user;
        const newAddress = event.target.value;
        const newUser = { adderss: newAddress, ...rest };
        setUser(newUser);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please order {service.name}</h2>
            <form>
                <input className='w-100 mb-2' value={user.name} type="text" name="name" placeholder='Name' id="name" required />
                <br />
                <input className='w-100 mb-2' value={user.email} type="text" name="email" placeholder='email' id="name" required />
                <br />
                <input className='w-100 mb-2' value={service.name} type="text" name="service" placeholder='service' id="name" required />
                <br />
                <input className='w-100 mb-2' onChange={handleAddressChange} value={user.address} type="text" name="address" placeholder='address' id="name" required />
                <br />
                <input className='w-100 mb-2' value={user.phone} type="text" name="phone" placeholder='phone' id="name" required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place order" />
            </form>
        </div>
    );
};

export default Checkout;