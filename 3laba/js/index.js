const tableHeader = ['Ноубук', 'Память', 'Процессор', 'Цвет', 'Комментарий', 'Email']

function submit() {
  if (validation()) {
    document.getElementById('button').classList.add('success')
    setItems()
    setTimeout(() => {
      document.getElementById('button').classList.remove('success')
    }, 300)
  } else {
    document.getElementById('button').classList.add('error')
    setTimeout(() => {
      document.getElementById('button').classList.remove('error')
    }, 300)
  }
}
function validation() {
  const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
  if (document.getElementById('name').value === ''
  || document.getElementById('textarea').value === ''
  || document.getElementById('email').value === ''
  || document.getElementById('list').options[document.getElementById('list').selectedIndex].value === ''
  || document.querySelector('[type="radio"]:checked').value === '') {
    return false
  }
  if (!document.querySelectorAll('[type="checkbox"]:checked').length) {
    return false
  }
  if (!reEmail.test(document.getElementById('email').value)) {
    return false
  }
  return true
}

function setItems() {
  let formData = JSON.parse(localStorage.getItem('form'))
  let array = []
  if (formData) {
    array = addItem(formData)
    localStorage.setItem('form', JSON.stringify(array))
  } else {
    array = addItem([])
    localStorage.setItem('form', JSON.stringify(array))
  }
}

function addItem(array) {
  let memory = []
  document.querySelectorAll('[type="checkbox"]:checked').forEach(item => memory.push(item.value))
  let formObject = {
    name: document.getElementById('name').value,
    memory,
    cpu: document.getElementById('list').options[document.getElementById('list').selectedIndex].value,
    color: document.querySelector('[type="radio"]:checked').value,
    comment: document.getElementById('textarea').value,
    email: document.getElementById('email').value
  }
  array.push(formObject)
  clearFields()
  return array
}

function clearFields() {
  document.getElementById('name').value = ''
  document.getElementById('textarea').value = ''
  document.getElementById('email').value = ''
  document.getElementById('list').selectedIndex = 0
  let radios = document.getElementsByName("radio")
  let checkboxes = document.querySelectorAll('[type="checkbox"]:checked')
  for (let i = 0 ; i < radios.length; i++) {
    radios[i].checked = false
  }
  for (let i = 0 ; i < checkboxes.length; i++) {
    checkboxes[i].checked = false
  }
}

window.onload = function() {
  tableCreate()
}

function tableCreate() {
  let formData = JSON.parse(localStorage.getItem('form'))
  let table = document.getElementById('table')
  let tbl = document.createElement('table')
  tbl.style.width = '100%'
  tbl.setAttribute('border', '1')
  tbl.setAttribute('border', '1')
  let tbdy = document.createElement('tbody')
  if (formData) {
    for (let i = 0; i < formData.length; i++) {
      if (i === 0) {
        let tr = document.createElement('tr')
        for(let j = 0; j < tableHeader.length; j++) {
          let th = document.createElement('th')
          th.appendChild(document.createTextNode(tableHeader[j]))
          tr.appendChild(th)
          tbdy.appendChild(tr)
        }
      }
      let tr = document.createElement('tr')
      for (let key in formData[i]) {
        let td = document.createElement('td')
        td.appendChild(document.createTextNode(formData[i][key]))
        tr.appendChild(td)
      }
      tbdy.appendChild(tr)
    }
  } else {
    table.appendChild(document.createTextNode('Таблица пуста'))
    table.classList.add('t-a-s')
  }
  tbl.appendChild(tbdy)
  table.appendChild(tbl)
}

function clearStoreFields() {
  localStorage.removeItem('form')
  document.getElementsByTagName('tbody')[0].remove()
  document.getElementById('table').appendChild(document.createTextNode('Таблица пуста'))
  document.getElementById('table').classList.add('t-a-s')
}