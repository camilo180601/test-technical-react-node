import React from 'react'
import { Card, CardFooter, CardBody } from "@nextui-org/react";

interface ProductProps {
    title: string;
    price: number;
    thumbnail: string;
}

const Product: React.FC<ProductProps> = ({ title, price, thumbnail }) => {
    return (
        <Card className="py-4">
            <CardBody className="overflow-visible py-2 justify-center">
                <img
                    height='250'
                    width='250'
                    alt="Card background"
                    className="rounded-xl"
                    src={thumbnail}
                />
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                <small className="text-default-500">{title}</small>
                <h4 className="font-bold text-large">$ {price}</h4>
            </CardFooter>
        </Card>
    );
}

export default Product