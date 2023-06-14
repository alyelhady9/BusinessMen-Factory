let menu = document.querySelector(".menu")
let header = document.querySelector(".main-header")
let mainBody = document.querySelector(".main-body")
menu.addEventListener("click", () => {
    if(header.className.includes("main-header")) {
        header.classList.add("left")
    }else {
        
        header.classList.remove("left")
    }
})

mainBody.addEventListener("click", () => {
    if(header.className.includes("left")) {
        header.classList.remove("left")
    }
})


let toTopBtn = document.querySelector(".up-btn")


window.onscroll = () => {
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        toTopBtn.style.display = "flex"
    }else {
        toTopBtn.style.display = "none"

    }
}

toTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
})

const links = document.querySelectorAll(".link-btn")

links.forEach((item) => {
    item.addEventListener("click", () => {
        const el = document.getElementById(item.getAttribute("data-link"))
        el.scrollIntoView({behavior:"smooth", block:"start"})
        if(header.className.includes("left")) {
            header.classList.remove("left")
        }
    })
})


let sorry = document.querySelector(".sorry")
let joinBtns = document.querySelectorAll(".join-now")
let okayBtn = document.querySelector(".sorry button")

joinBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        sorry.style.display = "block"
    })
})

okayBtn.addEventListener("click", () => {
    if(sorry.style.display= "block") {
        sorry.style.display= "none"
    }else {
        sorry.style.display= "block"

    }
})

let textarea = document.querySelector(".send-message textarea")
let sendBtn = document.querySelector(".message-btns .send")
let clearBtn = document.querySelector(".message-btns .clear")
let sentOkayBtn = document.querySelector(".message-sent button")
let sentMessage = document.querySelector(".message-sent") 

sendBtn.addEventListener("click", () => {
    if( textarea.value= " "){
        sentMessage.style.display = "block"
        textarea.value = ""
    }else {
        sentMessage.style.display = "none"

    }

})
clearBtn.addEventListener("click", () => {
    if(textarea.value = " ") {
        textarea.value = ""
    }else {
        textarea.value = ""

    }
})


sentOkayBtn.addEventListener("click", () => {
    if(sentMessage.style.display= "block") {
        sentMessage.style.display= "none"
    }else {
        sentMessage.style.display= "block"

    }
})