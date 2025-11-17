document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("registerusername").value;
    const email = document.getElementById("registeremail").value;
    const passwords = document.getElementById("registerpassword").value;

    const response = await fetch("http://localhost:5500/register", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, passwords })
    });

    const result = await response.json();
    alert(result.message);

    if (result.status === 'success') {
        window.location.href = "Login.html";
    }
    alert()
});
