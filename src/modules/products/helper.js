
export function generateProductItem(products) { 

    var generatedProducts = products.map(product => ({
        title: product.title,
        id: product.id,
        quantity: 0,
    }))

    return generatedProducts;
}

export function getTotalProducts(products) { 

    var total = products
    .map( product => product.quantity )                                
    .reduce( (total, current) => total + current, 0 );

    return total;
}

