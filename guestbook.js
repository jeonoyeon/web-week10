const form = document.querySelector('#guestbook-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const notice = document.querySelector('#notice');
const list = document.querySelector('#list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');
let items = [];
let nextId = 1;

function clearNotice() {
  notice.textContent = '';
}

function showList() {
  list.replaceChildren();
  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'guestbook-entry';

    const details = document.createElement('div');
    details.className = 'guestbook-entry-details';
    const author = document.createElement('strong');
    author.textContent = item.name;
    details.append(author);

    if (item.email) {
      const email = document.createElement('span');
      email.textContent = item.email;
      details.append(email);
    }

    const message = document.createElement('p');
    message.textContent = item.message;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = '삭제';
    removeButton.setAttribute('aria-label', `${item.name}님의 글 삭제`);
    removeButton.addEventListener('click', function () {
      items = items.filter((entry) => entry.id !== item.id);
      showList();
    });

    li.append(details, message, removeButton);
    list.append(li);
  }

  count.textContent = `${items.length}개`;
  empty.hidden = items.length > 0;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  if (name === '') {
    notice.textContent = '이름을 입력하세요.';
    nameInput.focus();
    return;
  }
  if (message === '') {
    notice.textContent = '메시지를 입력하세요.';
    messageInput.focus();
    return;
  }

  clearNotice();
  items.push({ id: nextId++, name, email, message });
  showList();
  form.reset();
  nameInput.focus();
});

nameInput.addEventListener('input', clearNotice);
emailInput.addEventListener('input', clearNotice);
messageInput.addEventListener('input', clearNotice);
showList();