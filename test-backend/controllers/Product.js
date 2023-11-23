const feed = async(req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/carts')
        const data     = await response.json()
        const products = data.carts.map((cart) => cart.products);

        return res.status(200).send({
            status: "success",
            message: "Requested products",
            products
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Products failed"
        });

    }
    
}

module.exports = {
    feed
}