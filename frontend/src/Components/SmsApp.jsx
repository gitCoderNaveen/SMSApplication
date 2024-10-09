// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function SmsApp() {
//   const [person, setPerson] = useState([]);
//   const [clientDetail, setClientDetails]=useState([])
//   const [selectedPerson, setSelectedPerson] = useState('');
//   const [error, setError] = useState('');
//   const [phonenumber, setPhonenumber] = useState('');
//   const [pincode, setPincode]=useState([])
//   const [selectedPincode, setSelectedPincode] =useState('')

//   const message = 'Hello, this is a test message from Signpost!'; // Replace with your message

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8001/clients/get');
//         setPerson(response.data);
//         setPincode(response.data)        
//       } catch (error) {
//         setError('Error fetching people list.');
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSelectPincode = async (e)=>{
//     setSelectedPincode(e.target.value);
//   }
//   console.log(selectedPincode)

//   const handleSelectChange = async (event) => {
//     const selectedName = event.target.value;
//     setSelectedPerson(selectedName);
//     // Reset state when fetching new person details
//     setError('');

//     // Fetch the details of the selected person
//     try {
//       const response = await axios.get(`http://localhost:8001/clients/getClientDetails?businessname=${selectedName}`);
//       setClientDetails(response.data)

//        // Assuming the response structure contains a single client object, 
//       // update the phone number from the fetched data
//       if (response.data && response.data[0].mobileno) {
//         setPhonenumber(response.data[0].mobileno); // Set the phone number to state
//       } else {
//         setPhonenumber(''); // Reset phone number if not found
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         setError('Person not found.');
//       } else {
//         setError('Error fetching person details.');
//       }
//     }
//   };
//   const handleSendMessage = () => {
//     console.log(phonenumber)
//     // Use the fetched phone number for sending the SMS
//     if (phonenumber) {
//       const smsLink = `sms:${phonenumber}?&body=${encodeURIComponent(message)}`;
//       window.location.href = smsLink;
//     } else {
//       setError('No phone number available for the selected person.');
//     }
//   };

//   return (
//     <div className='container'>
//       <h1>Signpost Celfon.in Technology</h1>
//       <p>Welcome Greeting!...</p>

//       <select onChange={handleSelectPincode} value={selectedPincode}>
//         <option value="">-- Select a person --</option>
//         {pincode.map((pincode) => (
//           <option key={pincode.id} value={pincode.pincode}>
//             {pincode.pincode}
//           </option>
//         ))}
//         </select>

//       <select onChange={handleSelectChange} value={selectedPerson}>
//         <option value="">-- Select a person --</option>
//         {person.map((person) => (
//           <option key={person.businessname} value={person.businessname}>
//             {person.businessname}
//           </option>
//         ))}
//       </select>

//       {selectedPerson && (
//         <div>{clientDetail.map((myClients)=>(
//           <div key={myClients.id}>
//             <div>{myClients.prefix} {myClients.businessname}</div>
//           </div>
//         ))}

//         </div>
//       )}

//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error messages */}

//       <button onClick={handleSendMessage}>Send Message</button>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SmsApp() {
  const [pincodes, setPincodes] = useState([]); // List of pincodes
  const [selectedPincode, setSelectedPincode] = useState(''); // Selected pincode
  const [persons, setPersons] = useState([]); // Persons list based on selected pincode
  const [selectedPerson, setSelectedPerson] = useState(''); // Selected person
  const [clientDetail, setClientDetail] = useState([]); // Client details including phone number
  const [phonenumber, setPhonenumber] = useState(''); // Phone number
  const [error, setError] = useState('');

  const message = 'Hello, this is a test message from Signpost!'; // Message content

  // Fetch available pincodes on component load
  useEffect(() => {
    const fetchPincodes = async () => {
      try {
        const response = await axios.get('http://localhost:8001/clients/get');
        setPincodes(response.data);
      } catch (error) {
        setError('Error fetching pincode list.');
        console.error('Error fetching pincodes:', error);
      }
    };
    fetchPincodes();
  }, []);

  // Fetch persons based on selected pincode
  const handleSelectPincode = async (e) => {
    const pincode = e.target.value;
    setSelectedPincode(pincode);

    try {
      const response = await axios.get(`http://localhost:8001/clients/getClientPincode?pincode=${pincode}`);
      setPersons(response.data); // Set the persons list for the selected pincode
      setSelectedPerson(''); // Reset selected person when pincode changes
      setClientDetail([]);
      setPhonenumber('');
    } catch (error) {
      setError('Error fetching persons based on pincode.');
      console.error('Error fetching persons:', error);
    }
  };

  // Handle person selection and fetch the person's details
  const handleSelectPerson = async (e) => {
    const selectedName = e.target.value;
    setSelectedPerson(selectedName);
    setError('');

    try {
      const response = await axios.get(`http://localhost:8001/clients/getClientDetails?businessname=${selectedName}`);
      setClientDetail(response.data);

      // Set phone number if found
      if (response.data && response.data[0].mobileno) {
        setPhonenumber(`${response.data[0].mobileno}`); // Prefix and phone number
      } else {
        setPhonenumber('');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Person not found.');
      } else {
        setError('Error fetching person details.');
      }
    }
  };

  // Send message to the selected person's phone number
  const handleSendMessage = () => {
    if (phonenumber) {
      const smsLink = `sms:${phonenumber}?&body=${encodeURIComponent(message)}`;
      window.location.href = smsLink;
    } else {
      setError('No phone number available for the selected person.');
    }
  };

  return (
    <div className="container">
      <h1>Signpost Celfon.in Technology</h1>
      <p>Welcome Greeting!...</p>

      {/* Pincode Selection */}
      <select onChange={handleSelectPincode} value={selectedPincode}>
        <option value="">-- Select a pincode --</option>
        {pincodes.map((pincode) => (
          <option key={pincode.id} value={pincode.pincode}>
            {pincode.pincode}
          </option>
        ))}
      </select>

      {/* Person Selection */}
      {selectedPincode && (
        <select onChange={handleSelectPerson} value={selectedPerson}>
          <option value="">-- Select a person --</option>
          {persons.map((person) => (
            <option key={person.businessname} value={person.businessname}>
              {person.businessname}
            </option>
          ))}
        </select>
      )}

      {/* Display client details */}
      {selectedPerson && (
        <div>
          {clientDetail.map((myClient) => (
            <div key={myClient.id}>
              <div>{myClient.prefix} {myClient.businessname}</div>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Send Message Button */}
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}
