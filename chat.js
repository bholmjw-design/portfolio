const socket = io('https://portfolio-ivxc.onrender.com');
const modal = document.getElementById('modal');
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('joinBtn');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const msgInput = document.getElementById('msg');
const typing = document.getElementById('typing');
let username = '';

joinBtn.addEventListener('click', () => {
  const val = usernameInput.value.trim();
  if (!val) return;
  username = val;
  socket.emit('join', username);
  modal.classList.add('hide');
});
usernameInput.addEventListener('keypress', e => { if(e.key==='Enter') joinBtn.click(); });

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (!text) return;
  socket.emit('chat', { user: username, text });
  msgInput.value = '';
});

msgInput.addEventListener('input', () => {
  socket.emit('typing', username);
});

socket.on('chat', data => {
  const div = document.createElement('div');
  const isMe = data.user === username;
  div.className = `msg ${isMe ? 'sent' : 'received'}`;
  div.innerHTML = `${!isMe?`<div class="sender">${data.user}</div>`:''}${data.text}<span class="time">${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('system', msg => {
  const div = document.createElement('div');
  div.className = 'system';
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('typing', user => {
  if (user === username) return;
  typing.textContent = `${user} is typing...`;
  clearTimeout(window.typingTimer);
  window.typingTimer = setTimeout(() => typing.textContent = '', 1500);
});
