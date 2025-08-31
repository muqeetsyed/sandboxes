interface ProductItemProps {
    productImage?: string,
    productName?: string,
    productImageAlt?: string,
    productDescription?: string,
    productPrice?: string,
    key?: string,
}

export const ProductItem = (props: ProductItemProps) => {
    const {key, productImage, productImageAlt, productName, productDescription, productPrice} = props;
    return (
        <div className="card" key={key}>
            <img src={productImage} alt={productImageAlt}/>
            <div className="card-content">
                <h2>{productName}</h2>
                <p>{productDescription}</p>
                <p className="price">${productPrice}</p>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}