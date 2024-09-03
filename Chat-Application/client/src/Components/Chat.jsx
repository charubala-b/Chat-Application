import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Chat.css';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [ur, setUr] = useState("./src/Components/p1.png");
  const a = "./src/Components/p1.png";
  const b = "./src/Components/p2.png";
  const c = "./src/Components/p3.png";
  const d = "./src/Components/p4.png";
  const e = "./src/Components/p5.png";
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/add-User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstname, lastname }),
      });
      const result = await response.json();
      console.log('Save result:', result);

      if (result.status === 'inserted successfully') {
        navigate('/mainPage', { state: { firstname, lastname } });
      } else {
        console.error('Error saving data:', result['error-occurrence']);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className='sec'>
      <form className='f'>
        <h1 className='e'>{email}</h1>
        <img src={ur} className='brief' alt="Profile" />
        <input
          type="text"
          placeholder='FirstName'
          onChange={(e) => setFirstName(e.target.value)}
          className='first'
        />
        <input
          type="text"
          placeholder='LastName'
          onChange={(e) => setLastName(e.target.value)}
          className='second'
        />
      </form>
      <div className='i'>
        <img src="./src/Components/p1.png" className='p1' alt="Profile 1" onClick={() => setUr(a)} />
        <img src="./src/Components/p2.png" className='p2' alt="Profile 2" onClick={() => setUr(b)} />
        <img src="./src/Components/p3.png" className='p3' alt="Profile 3" onClick={() => setUr(c)} />
        <img src="./src/Components/p4.png" className='p4' alt="Profile 4" onClick={() => setUr(d)} />
        <img src="./src/Components/p5.png" className='p5' alt="Profile 5" onClick={() => setUr(e)} />
      </div>
      <button onClick={handleSave} className='save'>Save Changes</button>
    </div>
  );
};

export default Chat;
