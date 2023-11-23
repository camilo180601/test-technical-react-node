import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Global from '../helpers/Global';
import useAuth from '../hooks/useAuth';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { products, setProducts }: any = useAuth();
    const [product, setProduct]: any = useState([]);
    const params: any = useParams();
    const token: any = localStorage.getItem("token");

    const getProducts = async () => {
        try {
            const request = await fetch(Global.url + 'products/feed', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            const data: any = await request.json();

            let prods: any = [];
            let produs: any = [];

            data.products.map((products: any) => products.map((product: any) => {
                prods.push(product);
            }));

            prods.map((product: any, index: any) =>
                produs.push({ ...product, index })
            );

            setProducts(produs);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        // Filtrar el producto basado en el índice de los parámetros
        const filteredProduct = products.filter((prod: any) => prod.index == params.index);
        setProduct(filteredProduct);
    }, [params.index, products]);

    return (
        <div className='flex fixed w-full justify-center items-center mt-40'>
            {product.map((prod: any) => (
                <Card className="py-4" key={prod.index}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={prod.thumbnail}
                            width={270}
                        />
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <h4 className="font-bold text-large">{prod.title}</h4>
                        <p className="text-tiny uppercase font-bold">$ {prod.price}</p>
                        <small className="text-default-500">Quantity: {prod.quantity}</small>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ProductDetail;
