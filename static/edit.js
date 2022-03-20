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
  refreshTopics();
}

async function removeTopic() {
  const topic = [document.querySelector('#topic').value];
  const remove = await fetch('/delTopic', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(topic),
  });
  topic[0] = '';
  await refreshTopics();
}

init();
