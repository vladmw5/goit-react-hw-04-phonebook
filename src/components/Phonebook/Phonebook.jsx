import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';

import s from './Phonebook.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};
const Phonebook = ({ addContact }) => {
  const [name, setName] = useState(INITIAL_STATE.name);
  const [number, setNumber] = useState(INITIAL_STATE.number);

  const handleContactSubmit = event => {
    event.preventDefault();
    addContact({ name, number, id: nanoid() });
    resetFields();
  };

  const handleInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;

      case 'number':
        setNumber(event.target.value);
        break;

      default:
        throw new Error('Unknown error happened at HandleInputChange');
    }
  };

  const resetFields = () => {
    setName(INITIAL_STATE.name);
    setNumber(INITIAL_STATE.number);
  };

  const nameInputId = nanoid();
  const phoneNumberInputId = nanoid();
  return (
    <form className={s.form} onSubmit={handleContactSubmit}>
      <label className={s.label} htmlFor={nameInputId}>
        Name
      </label>
      <input
        className={s.input}
        id={nameInputId}
        value={name}
        onChange={handleInputChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={s.label} htmlFor={phoneNumberInputId}>
        Phone Number
      </label>
      <input
        className={s.input}
        id={phoneNumberInputId}
        value={number}
        onChange={handleInputChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={`Button ${s.addBtn}`} type="submit">
        Add Contact
      </button>
    </form>
  );
};

Phonebook.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default Phonebook;
