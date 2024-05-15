import axios from "axios";

const api = 'https://api.monobank.ua/api/merchant/invoice/payment-direct'

const jar = (amount) => {
    axios.post(api,
    {
        amount: amount,
        ccy: 980,
        pan: "1111111111111111",
        exp: "12/25",
        ccv: 798
    },
    {
        headers: {
            'X-Token': 'uodhUSw26-PSXn1p6WAYlBzJKnG6NUv7EoecSXWm3JII'
        }
    })
}

const monoService = {
    jar
}

export default monoService;