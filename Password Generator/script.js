const input = document.getElementById('passwordOutput');
const alertContainer = document.getElementById('alertContainer');
const generateButton = document.getElementById('generateButton');
const copyIcon = document.getElementById('copyIcon');
const strengthBar = document.getElementById('strengthBar');
const historyList = document.getElementById('historyList');
let history = [];

generateButton.addEventListener('click', () => {
  const length = document.getElementById('length').value;
  const useUppercase = document.getElementById('uppercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  let chars = 'abcdefghijklmnopqrstuvwxyz';
  if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useNumbers) chars += '0123456789';
  if (useSymbols) chars += '!@#$%^&*()_+?:{}[]';

  let password = '';
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * chars.length);
    password += chars[rand];
  }

  input.value = password;
  updateStrength(password);
  updateHistory(password);
  alertContainer.textContent = password + ' kopyalandı!';
});

copyIcon.addEventListener('click', () => {
  if (input.value) {
    input.select();
    navigator.clipboard.writeText(input.value);
    alertContainer.classList.remove('active');
    setTimeout(() => {
      alertContainer.classList.add('active');
    }, 2000);
  }
});

function updateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  strengthBar.className = '';
  if (strength <= 1) strengthBar.classList.add('weak');
  else if (strength === 2 || strength === 3) strengthBar.classList.add('medium');
  else if (strength >= 4) strengthBar.classList.add('strong');
}

function updateHistory(password) {
  history.unshift(password);
  if (history.length > 5) history.pop();

  historyList.innerHTML = '';
  history.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    historyList.appendChild(li);
  });
}
