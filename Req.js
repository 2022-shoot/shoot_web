import React from "react";
import axios from "axios";

function SendFunc() {
    axios.get("http://localhost:5000/ass").then(res => {
        console.log(res.data);
    })
}
function Req() {
    return (
        <>
            <form onSubmit={SendFunc}>
                <button>요청 전송</button>
            </form>
        </>
    );
}

export default Req;