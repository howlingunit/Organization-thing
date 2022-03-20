function setUpTopic(topic) {
  console.log(topic);
  const topicsElem = document.querySelector('#topics');

  const topicDiv = document.createElement('div');
  topicDiv.id = `${topic.topic}-d`;
  topicDiv.classList.add('topic');
  topicsElem.appendChild(topicDiv);

  const topicHeading = document.createElement('h2');
  topicHeading.textContent = topic.topic;
  topicDiv.appendChild(topicHeading);

  for (let i = 0; i < topic.items.length; i++) {
    const item = document.createElement('p');
    item.textContent = topic.items[i];
    item.classList.add(`${topic.topic}-p`);
    topicDiv.appendChild(item);
  }

  const selectBtn = document.createElement('button');
  selectBtn.textContent = 'Select one';
  selectBtn.id = topic.topic;
  topicDiv.appendChild(selectBtn);
  selectBtn.addEventListener('click', chooseItem);
}

function chooseItem(e) {
  const topic = e.target.id;
  const topicDiv = document.querySelector(`#${topic}-d`);
  const items = [];
  const itemElems = document.querySelectorAll(`.${topic}-p`);

  for (let i = 0; i < itemElems.length; i++) {
    items.push(itemElems[i].textContent);
  }
  const chosenItem = items[Math.floor(Math.random() * items.length)];
  const result = document.createElement('p');
  result.textContent = chosenItem;

  topicDiv.appendChild(result);
}

async function init() {
  let topics = await fetch('/getTopics');
  topics = await topics.json();
  console.log(topics);
  for (let i = 0; i < topics.length; i++) {
    let topic = await fetch(`/getTopic?topic=${topics[i]}`);
    topic = await topic.json();
    setUpTopic(topic);
  }
}


init();
