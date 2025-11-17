document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('loginusername').value;
  const passwords = document.getElementById('loginpassword').value;

  const response = await fetch("http://localhost:5500/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, passwords })
  });

  
  const result = await response.json();
  console.log("Login user:", result);

  if (result.status === 'success') {
      localStorage.setItem("token", result.token);
      window.location.href = "Todo.html";
  } else {
      alert(result.message);
  }
});
