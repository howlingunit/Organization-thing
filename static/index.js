function setUpTopic(topic) {
  const topicsElem = document.querySelector('#topics');

  const topicDiv = document.createElement('div');
  topicDiv.id = topic.topicName;
  topicDiv.classList.add('topic');
  topicsElem.appendChild(topicDiv);

  const topicHeading = document.createElement('h2');
  topicHeading.textContent = topic.topicName;
  topicDiv.appendChild(topicHeading);

  for (let i = 0; i < topic.items.length; i++) {
    const item = document.createElement('p');
    item.textContent = topic.items[i];
    topicDiv.appendChild(item);
  }
}


async function init() {
  let topics = await fetch('/getTopics');
  topics = await topics.json();
  console.log(topics);
  for (let i = 0; i < topics.length; i++) {
    const topic = fetch(`/getTopic?topic=${topics[i]}`);
    setUpTopic(topic);
  }
}


init();
