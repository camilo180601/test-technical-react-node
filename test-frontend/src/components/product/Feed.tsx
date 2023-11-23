import { useEffect } from 'react'
import Global from '../helpers/Global'
import Product from './Product';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Feed = () => {
    const { products, setProducts } : any = useAuth()

    const { search } : any = useAuth()

    const token : any = localStorage.getItem("token");

    const getProducts = async() => {
        const request = await fetch(Global.url + 'products/feed', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data : any = await request.json()

        let prods : any = []
        let produs : any = []

        data.products.map((products : any) => products.map((product: any) => {
            prods.push(product)
        }))

        prods.map((product : any, index: any) => 
            produs.push({...product, index})
        )

        setProducts(produs)

        if (search !== '') {
            const filteredProducts = products.filter((product : any) => {
                return product.title.toLowerCase().includes(search.toLowerCase());
            });

            setProducts(filteredProducts)
        }
    }

    useEffect(() => {
        getProducts()
    } ,[])

    useEffect(() => {
        getProducts()
    } ,[search])
    return (
        <div className='flex flex-wrap justify-around mt-20'>
            {products.map((product : any) => {
                return (
                    <Link key={product.index} to={"/products/detail/" + product.index}>
                        <Product
                            key={product.index}
                            title={product.title}
                            price={product.price}
                            thumbnail={product.thumbnail}
                        />
                    </Link>
                )
            })}
        </div>
    )
}

export default Feed