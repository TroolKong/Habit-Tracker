let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  const list = document.querySelector('#habit-list');
  list.innerHTML = '';

  habits.forEach(function (habit, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.done;

    checkbox.addEventListener("change", function () {
  habits[index].done = checkbox.checked;

  if (checkbox.checked) {
    habits[index].streak = (habits[index].streak || 0) + 1;
  } else {
    habits[index].streak = 0;
  }

  renderHabits();
  saveHabits();
});

    const label = document.createElement("span");
    label.textContent = " " + habit.name + " 🔥 " + (habit.streak || 0);

    if (habit.done) {
  label.style.textDecoration = "line-through";
  label.style.color = "#999999";
}
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function () {
      const newName = prompt("Edit habit name:", habits[index].name);

      if (newName !== null && newName.trim() !== "") {
        habits[index].name = newName.trim();
        renderHabits();
        saveHabits();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      habits.splice(index, 1);
      renderHabits();
      saveHabits();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

renderHabits();

const form = document.querySelector("#habit-form");
const input = document.querySelector("#habit-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const habit = {
    name: input.value,
    done: false,
    streak: 0
  };

  habits.push(habit);
  renderHabits();
  saveHabits();

  input.value = "";
});