import { useReducer, useState } from "react"
type ProName ={
    name: string
}
export const Product = () => {
    const [product, setProduct] = useState<ProName>({} as ProName)

    const submit = () => {
        // if (product.name === "")
        setProduct({
            name: 'table'
        }
        )

        //setProduct(true)
    }
    
    return (
        <div>
            <button onClick={submit}>Submit</button>
            <div>prodcut name {product?.name}</div>
        </div>
    )
}