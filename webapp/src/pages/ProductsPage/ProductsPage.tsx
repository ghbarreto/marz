import React from 'react';
import PageWrapper from '../PageWrapper';
import { useAsync } from 'react-async';

import { fetchProducts } from '../../api/fetchProducts';
import type { Product } from '../../api/fetchProducts';
import Spinner from '../../components/Spinner/Spinner';

const ProductsPage = () => {
    const { data, error, isPending } = useAsync({ promiseFn: fetchProducts });

    if (isPending) return <Spinner />;

    if (error) return <div>{error.message}</div>;

    const response = data?.data as Product[];

    return (
        <>
            <PageWrapper>
                <h1 className="text-3xl font-bold text-white">Product Page</h1>

                <div className="flex flex-wrap min-w-full w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {response.map((product, index: number) => {
                        return (
                            <div key={index} className="flex justify-around ml-5 mt-5">
                                <div className="mx-auto rounded-2xl w-80 transform overflow-hidden bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                                    <img
                                        className="h-48 w-full object-cover object-center "
                                        src={product.ProductPhotoURL}
                                        alt={`${product.ProductName}`}
                                    />
                                    <div className="p-4">
                                        <h2 className="mb-2 text-lg font-medium text-gray-900">
                                            {product.ProductName}
                                        </h2>

                                        <div className="flex items-center">
                                            <p>id: {product.ProductID}</p>
                                            <p className="ml-auto text-base font-medium text-green-500">
                                                {product.ProductStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </PageWrapper>
        </>
    );
};

export default ProductsPage;
