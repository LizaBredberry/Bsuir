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
  if (tableInfo.length) {
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
    tableInfo = []
  }
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

function changeToTablePage() {
  document.open()
  document.write(
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
            '<p onclick="changeToMainPage()">Главная</p>' +
            '<p>Результаты</p>' +
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
                '<table>' +
                  '<tbody>' +
                    '<tr>' +
                      '<th>Ноубук</th>' +
                      '<th>Память</th>' +
                      '<th>Процессор</th>' +
                      '<th>Цвет</th>' +
                      '<th>Комментарий</th>' +
                      '<th>Email</th>' +
                    '</tr>' +
                    tableCreate() +
                  '</tbody>' +
                '</table>' +
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
    '</body>'
  )
  document.close()
}

function changeToMainPage() {
  document.open()
  document.write(
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
            '<p>Главная</p>' +
            '<p onclick="changeToTablePage()">Результаты</p>' +
          '</nav>' +
          '<section class="main-page">' +
            '<div class="line">' +
              '<h2>Предпочтения о ноутбуке</h2>' +
            '</div>' +
            '<div class="main-block">' +
              '<form class="form" id="form1">' +
                '<div class="field">' +
                  '<p>Модель ноутбука</p>' +
                  '<input type="text" id="name" name="model">' +
                  '<input type="hidden" id="hidden" name="hidden" value="secretNumber">' +
                '</div>' +
                '<div class="field">' +
                  '<p>Оперативная память</p>' +
                  '<div class="checkbox-box">' +
                    '<input type="checkbox" name="option1" id="option1" value="16">' +
                    '<label for="option1">16GB</label>' +
                    '<input type="checkbox" name="option2" id="option2" value="8">' +
                    '<label for="option2">8GB</label>' +
                    '<input type="checkbox" name="option3" id="option3" value="4">' +
                    '<label for="option2">4GB</label>' +
                  '</div>' +
                '</div>' +
                '<div class="field">' +
                  '<p>Процессор</p>' +
                  '<select id="list">' +
                    '<option value="Intel">Intel</option>' +
                    '<option value="AMD">AMD</option>' +
                    '<option value="Qualcom">Qualcom</option>' +
                  '</select>' +
                '</div>' +
                '<div class="field">' +
                  '<p>Цвет</p>' +
                  '<div class="checkbox-box">' +
                    '<input type="radio" id="radio-1" name="radio" value="Чёрный">' +
                    '<label for="radio-1">Чёрный</label>' +
                    '<input type="radio" id="radio-2" name="radio" value="Белый">' +
                    '<label for="radio-2">Белый</label>' +
                    '<input type="radio" id="radio-3" name="radio" value="Золотой">' +
                    '<label for="radio-3">Золотой</label>' +
                  '</div>' +
                '</div>' +
                '<div class="field">' +
                  '<p>Комментарий</p>' +
                  '<textarea id="textarea"></textarea>' +
                '</div>' +
                '<div class="field">' +
                  '<p>Email</p>' +
                  '<input type="email" id="email">' +
                '</div>' +
              '</form>' +
              '<div class="field button-field">' +
                '<button id="button" type="button" onclick="submit()">Отправить</button>' +
                '<button type="button" onclick="clearFields()">Очистить</button>' +
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
    '</body>'
  )
  document.close()
}