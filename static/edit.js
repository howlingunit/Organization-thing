function init() {
  refreshTopics();
  eventListeners();
}

async function refreshTopics() {
  let topics = await fetch('/getTopics');
  topics = await topics.json();
  const topicList = document.querySelector('#topicList');
  for (let i = 0; i < topicList.childNodes.length; i++) {
    topicList.childNodes[i].remove();
  }
  for (let i = 0; i < topics.length; i++) {
    const newTopic = document.createElement('li');
    newTopic.textContent = topics[i];
    topicList.appendChild(newTopic);
  }
}

function eventListeners() {
  document.querySelector('#add').addEventListener('click', newTopic);
  document.querySelector('#editTopic').addEventListener('click', editTopic);
  document.querySelector('#remove').addEventListener('click', removeTopic);
}

function newTopic() {
  const newItems = document.querySelector('#newItems');
  newItems.classList.remove('invis');
  document.querySelector('#addItem').addEventListener('click', newBox);
  document.querySelector('#done').addEventListener('click', addTopic);
}

function newBox() {
  const itemInputs = document.querySelector('#itemInputs');
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.classList.add('itemInput');
  itemInputs.appendChild(newInput);
}

async function addTopic() {
  let topicName = document.querySelector('#topic').value;
  const itemElems = document.querySelectorAll('.itemInput');
  const items = [];
  for (let i = 0; i < itemElems.length; i++) {
    if (itemElems[i].length === 0) { continue; }
    items.push(itemElems[i].value);
    itemElems[i].value = '';
  }
  const payload = JSON.stringify({ topicName, items });
  console.log(payload);
  const response = await fetch('/addTopic', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
  });
  topicName = '';
  window.location.reload();
}

function appendToItems(item) {
  const topicItms = document.querySelector('#topicItms');
  const itemBox = document.createElement('div');
  itemBox.id = item;
  itemBox.classList.add('itmBox');

  const itemElem = document.createElement('li');
  itemElem.classList.add('itmVal');
  itemElem.textContent = item;
  itemBox.appendChild(itemElem);

  const DBtn = document.createElement('button');
  DBtn.textContent = '-';
  DBtn.id = item;
  DBtn.classList.add('DelBtn');
  DBtn.addEventListener('click', removeFromItems);
  itemBox.appendChild(DBtn);


  topicItms.appendChild(itemBox);
}

function removeFromItems(e) {
  const item = e.target.id;
  const itemElem = document.querySelector(`#${item}`);
  itemElem.remove();
}

function editEventListeners() {
  document.querySelector('#addItm').addEventListener('click', () => {
    const newItem = document.querySelector('#newItm').value;
    appendToItems(newItem);
  });
  document.querySelector('#submit').addEventListener('click', submit);
}

async function submit() {
  const topicName = document.querySelector('#topic').value;
  await fetch('/delTopic', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify([topicName]),
  });

  const items = [];
  const itemElems = document.querySelectorAll('.itmVal');
  for (let i = 0; i < itemElems.length; i++) {
    items.push(itemElems[i].textContent);
  }
  const payload = { topicName, items };

  await fetch('/addTopic', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  window.location.reload();
}

async function editTopic() {
  const editElem = document.querySelector('#edit');
  editElem.classList.remove('invis');
  const topic = document.querySelector('#topic').value;
  let DBtopic = await fetch(`/getTopic?topic=${topic}`);
  DBtopic = await DBtopic.json();
  for (let i = 0; i < DBtopic.items.length; i++) {
    appendToItems(DBtopic.items[i]);
  }
  editEventListeners();
}

async function removeTopic() {
  const topic = [document.querySelector('#topic').value];
  const remove = await fetch('/delTopic', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(topic),
  });
  topic[0] = '';
  window.location.reload();
}

init();
