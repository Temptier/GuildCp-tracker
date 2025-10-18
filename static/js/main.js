// Fetch and render members dynamically
fetch('static/data/members.json')
  .then(res => res.json())
  .then(members => {
    const container = document.querySelector('#members-list');
    if (!container) return;

    members.forEach(m => {
      const card = document.createElement('div');
      card.className = 'bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <img src="${m.avatar}" alt="${m.name}" class="w-12 h-12 rounded-full">
            <div>
              <h4 class="font-bold">${m.name}</h4>
              <span class="class-badge ${m.classColor} text-white">${m.class}</span>
            </div>
          </div>
          <div class="achievement-badge bg-yellow-500 text-gray-900 rounded-full p-2">
            <i data-feather="star"></i>
          </div>
        </div>
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span>Current CP: ${m.cp.toLocaleString()}</span>
            <span class="text-green-400">+${m.growth.toLocaleString()}</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div class="cp-progress-bar bg-green-500 h-2 rounded-full" style="width: ${(m.growth / m.cp * 100).toFixed(0)}%"></div>
          </div>
        </div>
        <a href="members-detail.html?id=${m.id}">
          <button class="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg transition-colors">
            View Progress
          </button>
        </a>
      `;
      container.appendChild(card);
    });

    feather.replace();
  })
  .catch(err => console.error('Error loading members:', err));