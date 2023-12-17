import { useState } from 'react';

const AddGame = () => {
  const URL = 'http://localhost:8000/api/games/';

  const [formInputs, setFormInputs] = useState({
    name: '',
    description: '',
    picture: 'https://random.me',
    price: '',
    isActive: 1,
    quantity: 0,
  });

  const onChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formInputs);
    addGame(formInputs);
  };

  const addGame = async (game) => {
    const res = await fetch(`${URL}add`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(game),
    });
    const data = await res.json();

    console.log(data);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          value={formInputs.name}
          onChange={onChange}
          placeholder="Enter the name of the game"
        />

        <input
          type="text"
          name="description"
          id="description"
          value={formInputs.description}
          onChange={onChange}
          placeholder="Enter the description of the game"
        />

        <input
          type="text"
          name="price"
          id="price"
          value={formInputs.price}
          onChange={onChange}
          placeholder="Enter the price of the game"
        />

        <input
          type="text"
          name="quantity"
          id="quantity"
          value={formInputs.quantity}
          onChange={onChange}
          placeholder="Enter the quantity of the game"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddGame;
