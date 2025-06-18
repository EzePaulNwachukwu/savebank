import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function Protection({ children }) {
    const user = useSelector((state) => state.bankapp.users);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin', { replace: true }); // ⚠️ use inside useEffect!
        }
    }, [user, navigate]);

    return user ? children : null;
}

export default Protection