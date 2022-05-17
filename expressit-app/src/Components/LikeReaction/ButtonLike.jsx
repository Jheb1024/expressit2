import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { addLikeToPost, decLikeToPost } from '../../Models/PostFunctions'

function ButtonLike({ numberLikes }) {
    const [flag, setFlag] = useState(null);
    function increment_decrementLikes() {
        if (flag === false) {
            setFlag(true)
        } else {
            setFlag(false)
        }
     
        if (flag === false) {
            console.log("Decrementamos");
            decLikeToPost(1);
        } else {
            console.log("Incrementamos")
            addLikeToPost(1);
        }
    }

    return (
        <div>
            <Button style={buttonStyle} onClick={increment_decrementLikes}>
                Like 0
            </Button>
        </div>
    )
}

export default ButtonLike

const buttonStyle = {
    background: '#FFFF',
    color:'black',
    borderColor:'gray'
}