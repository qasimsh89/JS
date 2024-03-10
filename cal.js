
// creating funtions for operations like del, clear, append etc
class cal {
    constructor(prevOPtxt, currentOPtxt){
        this.prevOPtxt = prevOPtxt
        this.currentOPtxt = currentOPtxt
        this.clear()
       
    }
clear(){ // clear button function
    this.currentOP = ''
    this.prevOP = ''
    this.operation = undefined
}
delete(){ // delete function
this.currentOP = this.currentOP.toString().slice(0, -1)
}
appndNum(number){ //appending numbers
    if(number == '.' && this.currentOP.includes('.')) return
this.currentOP =  this.currentOP.toString() + number.toString()
}
choseOP(operation){ // function for choosing operation
    if(this.currentOP == '') return
    if(this.prevOP !== ''){
        this.compute()
    }
this.operation = operation
this.prevOP = this.currentOP
this.currentOP = ''
} 
compute(){ // here for operations solution function
    let computation
    const prev = parseFloat(this.prevOP)
    const current = parseFloat(this.currentOP)
    if(isNaN(this.prevOP) || isNaN(this.currentOP)) return
    switch(this.operation){
        case '+':
            computation = prev + current
            break
        case '-':
                computation = prev - current
            break
        case 'x':
                computation = prev * current
            break
        case '÷':
                computation = prev / current
            break
        default:
            return
    }
    this.currentOP = computation
    this.operation = undefined
    this.prevOP = ''
}
getdisplay(number){ // making display better looking
    const stringNumber = number.toString()
    const integerNumber = parseFloat(stringNumber.split('.')[0])
    const decimalNumber = stringNumber.split('.')[1]
  let integerDisplay
  if(isNaN(integerNumber)){
    integerDisplay = ''
  }else{
    integerDisplay = integerNumber.toLocaleString('en',{
    maximumFractionDigits: 0
    })
  }
  if(decimalNumber != null){
    return `${integerDisplay}.${decimalNumber}`
  }else{
    return integerDisplay
  }
}
update(){ // display the calculations
this.currentOPtxt.innerText = this.getdisplay(this.currentOP) 
if(this.operation != null) {
    this.prevOPtxt.innerText = `${this.getdisplay(this.prevOP)} ${this.operation}`
}else{
    this.prevOPtxt.innerText = ''
}

}
}
// creating variables for each class from html
const nButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-op]')
const eqlButton = document.querySelector('[data-eql]')
const delButton = document.querySelector('[data-del]')
const clearButton = document.querySelector('[data-ac]')
const prevOPtxt = document.querySelector('[data-prev-op]')
const currentOPtxt = document.querySelector('[data-curr-op]')
const calculator = new cal(prevOPtxt, currentOPtxt)


// working on number buttons

nButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appndNum(button.innerText)
            calculator.update()    
        })
    })
// operation buttons 
opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOP(button.innerText)
        calculator.update()    
    })
})

// Equal button

eqlButton.addEventListener('click', button => {
    calculator.compute()
    calculator.update()
} )

// all clear
clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.update()
})

// delete button

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.update()
})
