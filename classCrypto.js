window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/5b5495ebc3bb41f98d7bf9abda4fca6c"));
    }
})

var h = document.querySelector("#h");

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


async function getValues() {
    var classAddress = document.querySelector("#classAddress");
    var classAddressValue = classAddress.value;
    var userAddress, contractAddress, contractABI, tokenContract, decimals,
        userAddress = classAddressValue;

    contractAddress = "0xb58e0bf63fbe4e5565ab719d3369058707ab6a02";
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balanceUser = promisify(cb => tokenContract.balanceOf(userAddress, cb))

    try {
        adjustedBalanceUser = await balanceUser / Math.pow(10, await decimals);
        const balance = document.querySelector("#balance");
        balance.innerHTML = "Balance is:     " + adjustedBalanceUser + " EDU tokens </br>";

    } catch (error) {
        h.innerHTML = error;
    }
}
