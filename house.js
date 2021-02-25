window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/5b5495ebc3bb41f98d7bf9abda4fca6c"));
    }
})

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );


async function getH() {
    var addressH, addressG, addressR, addressS, contractAddress, contractABI, tokenContract, decimals,
    addressH = "0xF8ab97C6f11b80b9de26Eae1a10039eDD66318Ae";
    addressG = "0x651892F717e4A1664F5F04476b1935Fa9ca78138";
    addressS = "0x7A6949237cF04b11a2fCf04A0267142C8d7951cF";
    addressR = "0x0dD3991DAd9788CA3E1A630415d3b2CAf1060487";

    contractAddress = "0xb58e0bf63fbe4e5565ab719d3369058707ab6a02";
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balanceH = promisify(cb => tokenContract.balanceOf(addressH, cb))
    balanceG = promisify(cb => tokenContract.balanceOf(addressG, cb))
    balanceS = promisify(cb => tokenContract.balanceOf(addressS, cb))
    balanceR = promisify(cb => tokenContract.balanceOf(addressR, cb))

    try {
        adjustedBalanceH = await balanceH / Math.pow(10, await decimals);
        adjustedBalanceG = await balanceG / Math.pow(10, await decimals);
        adjustedBalanceS = await balanceS / Math.pow(10, await decimals);
        adjustedBalanceR = await balanceR / Math.pow(10, await decimals);
        const h = document.querySelector("#h");
        const g = document.querySelector("#g");
        const s = document.querySelector("#s");
        const r = document.querySelector("#r");
        h.innerHTML = "Colin <br>" + adjustedBalanceH + "</br>";
        g.innerHTML = "Champagnat <br>" + adjustedBalanceG + "</br>";
        s.innerHTML = "Chavoin <br>" + adjustedBalanceS + "</br>";
        r.innerHTML = "Chanel <br>" + adjustedBalanceR + "</br>";
        
    } catch (error) {
        h.innerHTML = error;
    }
}
