import React from 'react';
import Spinner from '../spinner/Spinner';

const WithSpinner = WrappedComponent => ({ isFetching, ...otherProps }) => (
    isFetching ? <Spinner/> : (
        <WrappedComponent { ...otherProps }/>
    )
);

export default WithSpinner;