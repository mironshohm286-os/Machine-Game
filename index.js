let start = document.getElementById("start")
let wallet = document.getElementById("show-balance")
let numberOne = document.getElementById("number-one")
let numberTwo = document.getElementById("number-two")
let numberThree = document.getElementById("number-three")
let move = document.getElementById("move")
let loaderOne = document.getElementById("loader-one")
let loaderTwo = document.getElementById("loader-two")
let loaderThree = document.getElementById("loader-three")
let prize = document.getElementById("prize")
let closeBtn = document.getElementById("close-container")
let balanceShow = document.getElementById("balance")
let balanceMenu = document.getElementById("balance-bg")

const randomNumber = () => {
   const number =  Math.floor(Math.random() * 10)
   return number
}

const showLoaders = () => {
    loaderOne.style.display = "block"
    loaderTwo.style.display = "block"
    loaderThree.style.display = "block"
}

const hideLoaders = () => {
    loaderOne.style.display = "none"
    loaderTwo.style.display = "none"
    loaderThree.style.display = "none"
}


let balance = 0



start.addEventListener('click', () => {
    showLoaders()
    numberOne.textContent = ""
    numberTwo.textContent = ""
    numberThree.textContent = ""
    move.textContent = "Proccessing..."
    prize.textContent = ''
    prize.style.display = "none"
    
    const timeOut = setTimeout(() => {
        hideLoaders()
    }, 1000)
        const promiseOne = new Promise((resolve, reject) => {
        setTimeout(() => {
            numberOne.textContent = randomNumber()
            resolve(numberOne.textContent)
        }, 1000)
    })
    promiseOne
        .then((data) => console.log(data))
        .catch((err) => console.log(err))

    const promiseTwo = new Promise((resolve, reject) => {
        setTimeout(() => {
            numberTwo.textContent = randomNumber()
            resolve(numberTwo.textContent)
        }, 1000)
    })
    promiseTwo
        .then((data) => console.log(data))
        .catch((err) => console.log(err))

    const promiseThree = new Promise((resolve, reject) => {
        setTimeout(() => {
            numberThree.textContent = randomNumber()
            resolve(numberThree.textContent)
        }, 1000)
    })
    promiseThree
        .then((data) => console.log(data))
        .catch((err) => console.log(err))

    const promiseAll = async() => {
        try {
            const results = await Promise.all([promiseOne, promiseTwo, promiseThree])
            console.log(results)
            
            const promiseCheck = new Promise((resolve, reject) => {
                const firtsNumber = Number(results[0])
                const secondNumber = Number(results[1])
                const thirdNumber = Number(results[2])
                

                if(firtsNumber == secondNumber && secondNumber == thirdNumber){
                    resolve('Jeckpot!!!')
                } else if (firtsNumber == secondNumber || secondNumber == thirdNumber || firtsNumber == thirdNumber) {
                    resolve('Nice move!')
                } else {
                    reject('Good luck to next moves!')
                }
                
            })
            promiseCheck
                    .then((msg) => {
                        move.textContent = msg
                        if(msg === "Nice move!") {
                            prize.textContent = "Wow, you won $20!"
                            prize.style.display = "block"
                            balance += 20
                        } else if (msg === "Jeckpot!!!") {
                            prize.textContent = "Wow, you won $100!!!"
                            prize.style.display = "block"
                            balance += 100
                        }
                        console.log(prize.textContent)
                    })
                    .catch((err) => {
                        move.textContent = err
                    })
        } catch(err) {
            console.log(err)
        }
        
    }
    promiseAll()
})

wallet.addEventListener('click', () => {
    balanceMenu.style.display = "flex"
    balanceShow.textContent = `Your balance: $${balance}`
})

closeBtn.addEventListener('click', () => {
    balanceMenu.style.display = "none"
})