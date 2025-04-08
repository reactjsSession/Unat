import { useState } from "react"
import ChildComponent from "./ChildComponent"
function ParentComponent(){
    const [count,setCount]=useState(0)
    const increment=()=>{
        setCount(count+1)
    }
    const decrement=()=>{
        if (count>0)setCount(count-1)
    }
    return(
        <>
        <ChildComponent count={count}/>
        <button id="decrement" onClick={decrement} disabled={count===0}>-</button>
        <button id="increment" onClick={increment}>+</button>
        </>
    )
}
export default ParentComponent