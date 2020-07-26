let repairTypes = [];

const updatePopupData = (index = 0) => {
  const dataContainer = document.querySelector('.popup-repair-types-content-table__list');
  dataContainer.innerHTML = '';

  for (let item in repairTypes[index]) {
    const tr = document.createElement('tr');
    tr.classList = 'mobile-row showHide';
    tr.innerHTML = `<td class="repair-types-name">${repairTypes[index][item].typeService}</td>
    <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
    <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
    <td class="repair-types-value">${repairTypes[index][item].units}</sup></td>
    <td class="repair-types-value">${repairTypes[index][item].cost}</td>`;

    dataContainer.append(tr);
  }
};

const dataLoad = () => {

  fetch('./db/db.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if(response.status !== 200) {
      throw new Error(`Что-то пошло не так, код ошибки - ${response.status}`)
    }

    return response.json();
  })
  .then((response) => {

    const dateContainer = document.querySelector('.popup-repair-types-content__head-date'),
          sectionHeadersContainer = document.querySelector('.nav-list-popup-repair');

    sectionHeadersContainer.innerHTML = '';

    for (let i in response) {
      if (i == 0) {
        dateContainer.textContent = response[i].date;
        continue;
      }

      const button = document.createElement('button');
      button.className = 'button_o popup-repair-types-nav__item' + (i === 1 ? ' active' : '');
      button.textContent = response[i].title;

      sectionHeadersContainer.append(button);

      repairTypes.push(response[i].priceList);
    }

    updatePopupData();

    sectionHeadersContainer.addEventListener('click', (event) => {
      const pressedButton = event.target.closest('.popup-repair-types-nav__item'),
            titleContainer = document.getElementById('switch-inner');

      if (pressedButton) {
        const buttons = sectionHeadersContainer.querySelectorAll('.popup-repair-types-nav__item');

        for (let index in buttons) {
          if (pressedButton === buttons[index]) {
            updatePopupData(index);
            titleContainer.textContent = pressedButton.textContent;
          }
        }
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
};

//dataLoad();

export default dataLoad;