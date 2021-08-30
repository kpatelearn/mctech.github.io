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
    var addressCharlotte, addressAva, addressTia, addressGina,
        addressKate, addressSharon, addressPrincya, contractAddress, contractABI, tokenContract, decimals,
        addressCharlotte = "0x0fB188516cB481999d201ED41dF793A33Bf60b90";
    addressAva = "0x695b4E76B7bE55169025acdBB3c4942CFF775b57";
    addressTia = "0x25cE4b13c9a3eE4e5b1706a2AAB9B38341D07B5F";
    addressGina = "0x069745a06dc9F21C8ef869066d211320931F2829";
    addressKate = "0xFf2A4CA1bA6e79B8FFCFA1cD6f1BAf30578cd03b";
    addressSharon = "0x98f26b0B3350FFA7cC50Dc5fEd9B1a25fe446748";
    addressPrincya = "0xCA298465852ca85C1b86eA8c74aDc3744b3Dad2d";

    contractAddress = "0xb58e0bf63fbe4e5565ab719d3369058707ab6a02";
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balanceCharlotte = promisify(cb => tokenContract.balanceOf(addressCharlotte, cb))
    balanceAva = promisify(cb => tokenContract.balanceOf(addressAva, cb))
    balanceTia = promisify(cb => tokenContract.balanceOf(addressTia, cb))
    balanceGina = promisify(cb => tokenContract.balanceOf(addressGina, cb))
    balanceKate = promisify(cb => tokenContract.balanceOf(addressKate, cb))
    balanceSharon = promisify(cb => tokenContract.balanceOf(addressSharon, cb))
    balancePrincya = promisify(cb => tokenContract.balanceOf(addressPrincya, cb))

    try {
        adjustedBalanceCharlotte = await balanceCharlotte / Math.pow(10, await decimals);
        adjustedBalanceAva = await balanceAva / Math.pow(10, await decimals);
        adjustedBalanceTia = await balanceTia / Math.pow(10, await decimals);
        adjustedBalanceGina = await balanceGina / Math.pow(10, await decimals);
        adjustedBalanceKate = await balanceGina / Math.pow(10, await decimals);
        adjustedBalanceSharon = await balanceGina / Math.pow(10, await decimals);
        adjustedBalancePrincya = await balancePrincya / Math.pow(10, await decimals);
        const charlotte = document.querySelector("#charlotte");
        const ava = document.querySelector("#ava");
        const tia = document.querySelector("#tia");
        const gina = document.querySelector("#gina");
        const kate = document.querySelector("#kate");
        const sharon = document.querySelector("#sharon");
        const princya = document.querySelector("#princya");
        charlotte.innerHTML = "Charlotte:     " + adjustedBalanceCharlotte + "</br>";
        ava.innerHTML = "Ava:     " + adjustedBalanceAva + "</br>";
        tia.innerHTML = "Tia:     " + adjustedBalanceTia + "</br>";
        gina.innerHTML = "Gina:     " + adjustedBalanceGina + "</br>";
        kate.innerHTML = "Kate:     " + adjustedBalanceKate + "</br>";
        sharon.innerHTML = "Sharon:     " + adjustedBalanceSharon + "</br>";
        princya.innerHTML = "Princya:     " + adjustedBalancePrincya + "</br>";

    } catch (error) {
        h.innerHTML = error;
    }
}