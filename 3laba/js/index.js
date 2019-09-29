const tableHeader = ['Ноубук', 'Память', 'Процессор', 'Цвет', 'Комментарий', 'Email']
let tableInfo = []
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
  tableInfo.push(formObject)
  clearFields()
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

function clearTable() {
  document.getElementsByTagName('tbody')[0].remove()
  let tbody = document.createElement('tbody')
  let tr = document.createElement('tr')
  let td = document.createElement('td')
  for(let i = 0; i < tableHeader.length; i++) { 
    let th = document.createElement('th')
    th.append(document.createTextNode(tableHeader[i])) // добавляет текст в тег
    tr.append(th)
  }
  tbody.append(tr)
  td.setAttribute('colspan', 6)
  td.append(document.createTextNode('Таблица пуста'))
  tr = document.createElement('tr')
  tr.append(td)
  tbody.append(tr)
  document.getElementsByTagName('table')[0].append(tbody)
}

function createTable() {
  let tableElem = document.createElement('table')
  let tbodyElem = document.createElement('tbody')
  for (let i = 0; i <= tableInfo.length; i++) { // цикл строк
    if (i === 0) {// условие для построение главной шапки таблицы
      let tr = document.createElement('tr')
      for(let j = 0; j < tableHeader.length; j++) { 
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(tableHeader[j])) // добавляет текст в тег
        tr.appendChild(th)
        tbodyElem.appendChild(tr)
      }
    }
    let tr = document.createElement('tr')
    if (tableInfo.length) {
      for (let key in tableInfo[i]) { // цикл столбцов
        let td = document.createElement('td')
        td.appendChild(document.createTextNode(tableInfo[i][key])) // добавляет текст в тег
        tr.appendChild(td)
      }
    } else {
      let td = document.createElement('td')
      td.appendChild(document.createTextNode('Таблица пуста')) // добавляет текст в тег
      td.setAttribute('colspan', '6') // добавляет текст в тег
      tr.appendChild(td)
    }
    if (i !== tableInfo.length || i === 0) {
      tbodyElem.appendChild(tr)
    }
  }
  tableElem.appendChild(tbodyElem)
  openWindow(tableElem.outerHTML)
}

function openWindow(data) {
  var newWindow = window.open('', '_blank', 'width="+screen.availWidth+", resizable=yes, height="+screen.availHeight"');
  newWindow.document.write('<link rel="stylesheet" href="css/style.css">');
  newWindow.document.write(
    '<head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
      '<link rel="stylesheet" href="css/style.css">' +
      '<title>Main page</title>' +
    '</head>' +
    '<body>' +
      '<div class="flex-container">' +
        '<header>' +
          '<div class="header">' +
            '<img src="./assets/logo.svg" alt="logo">' +
            '<h1>Магазин ноутбуков Xiaomi</h1>' +
            '<span class="info-text"> +375 (29) 182-78-43</span>' +
            '<span class="info-text"> 10:00 – 21:00</span>' +
          '</div>' +
        '</header>' +
        '<div class="container">' +
          '<nav class="nav-bar">' +
            '<p onclick="window.close()">Закрыть окно</p>' +
          '</nav>' +
          '<section class="main-page">' +
            '<div class="line">' +
              '<h2>Результаты</h2>' +
            '</div>' +
            '<div class="main-block">' +
              '<div class="field">' +
                '<h3 class="t-a-s">Таблица</h3>' +
              '</div>' +
              '<div class="field" id="table">' +
                data +
              '</div>' +
              '<div class="field">' +
                '<button type="button" onclick="clearTable()">Очистить</button>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<section class="side-bar"></section>' +
        '</div>' +
        '<footer>' +
          '<p>© 2017–2019 Общество с ограниченной ответственностью "МИ БАЙ" 224030 г. Брест, ул. Советская, д.56</p>' +
          '<p>Разработка интернет-магазина — Новый сайт</p>' +
        '</footer>' +
      '</div>' +
      '<script src="./js/index.js"></script>' +
    '</body>'
  )
}

function tableCreate() {
  if (tableInfo.length) {
    let tbodyInner = ''
    for (let i = 0; i < tableInfo.length + 1; i++) {
      tbodyInner = tbodyInner + '<tr>'
      for (let key in tableInfo[i]) {
        tbodyInner = tbodyInner + '<td>' + tableInfo[i][key] + '</td>'
      }
      tbodyInner = tbodyInner + '</tr>'
    }
    return tbodyInner
  } else {
    return '<tr><td colspan="6">Таблица пуста</td></tr>'
  }
}