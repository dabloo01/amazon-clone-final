import ProductCard from "./ProductCard"
import products from "./Product"

function Products() {

return (

<div className="bg-gray-100 min-h-screen">

<h2 className="text-xl font-semibold p-4">

Results

</h2>

<p className="px-4 text-sm text-gray-600">

Check each product page for other buying options.

</p>

<div className="grid grid-cols-5 gap-4 p-4">

{

products.map(item=>(

<ProductCard

key={item.id}

product={item}

/>

))

}

</div>

</div>

)

}

export default Products