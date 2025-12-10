import React , {useState,useEffect} from "react";

const Products = () => {
    const {Products,setProducts} = useState ([]);
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
        .then(response => {
            console.log(response.data)
            setProducts(response.data)  
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
    }, [])
    return (
        <div>
            <h1>Products List</h1>
            <div>
                {Products.map(product => (
                    <div key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>  
    )};

export default Products; 
