export async function saveMeeting(meeting: { title: string; date: string }) {
  const res = await fetch('/api/saveMeeting', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meeting),
  });

  if (!res.ok) throw new Error('Fout bij opslaan');
  return res.json();
}
