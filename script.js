async function saveActivity(data) {
  try {
    const res = await fetch('/api/saveActivity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    console.log('✅ Opgeslagen:', result);
  } catch (err) {
    console.error('❌ Fout bij opslaan:', err);
  }
}

// Materiaal checkbox opslaan
document.querySelectorAll('#materials input[type="checkbox"]').forEach(input => {
  input.addEventListener('change', () => {
    const label = input.parentElement.textContent.trim();
    saveActivity({
      type: 'material',
      item: label,
      checked: input.checked,
      date: new Date().toISOString()
    });
  });
});

// Notitie opslaan (aannemende dat notities <textarea> zijn of bewerkbare divs)
document.getElementById('addNote')?.addEventListener('click', () => {
  const container = document.getElementById('notesContainer');
  const note = document.createElement('textarea');
  note.placeholder = 'Typ hier je notitie...';
  note.addEventListener('blur', () => {
    saveActivity({
      type: 'note',
      content: note.value,
      date: new Date().toISOString()
    });
  });
  container.appendChild(note);
});

// Trainingen opslaan (aannemende dat knoppen in #activityOptions trainings zijn)
document.getElementById('activityOptions')?.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const training = e.target.textContent.trim();
    const date = document.getElementById('modalDate')?.textContent?.trim();
    saveActivity({
      type: 'training',
      title: training,
      date: date || new Date().toISOString()
    });
  }
});
