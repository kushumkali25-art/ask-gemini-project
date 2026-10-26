const form = document.getElementById("ask-form");
const input = document.getElementById("question-input");
const submitBtn = document.getElementById("submit-btn");
const statusEl = document.getElementById("status");
const answerBox = document.getElementById("answer-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) {
    statusEl.textContent = "Please type a question first.";
    return;
  }
  submitBtn.disabled = true;
  statusEl.textContent = "Thinking...";
  answerBox.classList.add("hidden");
  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    answerBox.textContent = data.answer;
    answerBox.classList.remove("hidden");
    statusEl.textContent = "";
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.classList.add("error-text");
  } finally {
    submitBtn.disabled = false;
  }
});