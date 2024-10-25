import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      console.log('Fetched contacts:', data); // Log the fetched data
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error('Expected contacts to be an array, but got:', data);
        setContacts([]); // Reset to empty array if not an array
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    });
    setName('');
    setPhone('');
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#3b82f6' }}>GIVE ME YOUR NUMBER</h1>
      <form onSubmit={addContact} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: '5px', padding: '8px', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ margin: '5px', padding: '8px', borderRadius: '4px' }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            borderRadius: '4px',
          }}
        >
          Add Contact
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        {contacts.map(contact => (
          <div key={contact.id} style={{ padding: '10px', backgroundColor: '#fef3c7', margin: '5px', borderRadius: '5px' }}>
            <p>{contact.name}: {contact.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
