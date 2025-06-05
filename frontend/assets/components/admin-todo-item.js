class AdminTodoItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Todo Item';
    const description = this.getAttribute('desc') || '';

    this.innerHTML = `
      <div class="bg-white p-5 shadow-md rounded-md">
        <h3 class="font-semibold text-lg">${title}</h3>
        <p class="text-sm text-gray-600 mt-1">${description}</p>
        <label class="checkbox-container mt-3 flex justify-end items-center gap-2">
          <input type="checkbox" class="custom-checkbox">
          <span>Done</span>
        </label>
      </div>
    `;
  }
}

customElements.define('admin-todo-item', AdminTodoItem);
