const todos = document.querySelector('.todos')

console.log(todos)
const btn = document.querySelector('.submit')
const input = document.querySelector('#input')


btn.addEventListener('click', e => {
    e.preventDefault()
   const item = document.createElement('li') 
    item.innerHTML = input.value
    item.setAttribute('class','item ds-f g-2 j-center al-center m-2')
    item.style.cursor = 'pointer'
    todos.appendChild(item)
    input.value=''
    item.addEventListener('click',(e)=>{
        e.target.classList.toggle('done')
    })

   const delBtn = document.createElement('button')
    delBtn.setAttribute('type','button')
    delBtn.setAttribute('class','btn btn-danger')
    delBtn.style.paddingBlock = '0.25rem'

    delBtn.innerHTML = 'X'
    item.appendChild(delBtn)
    delBtn.addEventListener('click',(e)=>{
        item.remove()
    })

})

const items = todos.children
console.log(items)


