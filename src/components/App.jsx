import { useLocalStorage } from './hooks/useLocalStorage';
import Section from './Section';
import ContactList from './ContactList';
import Phonebook from './Phonebook';
import Filter from './Filter';

import s from './App.module.css';
import capitalize from 'utils/capitalize';

const LOCAL_STORAGE_KEY_CONTACTS = 'contacts';
const LOCAL_STORAGE_KEY_FILTER = 'filter';
const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage(
    LOCAL_STORAGE_KEY_CONTACTS,
    INITIAL_STATE.contacts
  );
  const [filter, setFilter] = useLocalStorage(
    LOCAL_STORAGE_KEY_FILTER,
    INITIAL_STATE.filter
  );

  const addContact = newContact => {
    let doesAlreadyExist = false;
    contacts.forEach(({ name }) => {
      doesAlreadyExist = name === newContact.name;
    });

    if (doesAlreadyExist) {
      alert(
        `${capitalize(
          newContact.name
        )}'s contact already exists. Please, next time be more attentive to what you are trying to add`
      );
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterInput = event => {
    setFilter(event.target.value);
  };

  const filterContacts = contacts => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = targetId => {
    setContacts(contacts.filter(({ id }) => id !== targetId));
  };

  const handleDeleteContactBtnClick = event => {
    deleteContact(event.target.dataset.id);
  };

  return (
    <div className={s.container}>
      <div className={s.app}>
        <Section title="Phonebook">
          <Phonebook addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter name={filter} inputHandler={handleFilterInput} />
          <ContactList
            contacts={filterContacts(contacts)}
            deleteBtnHandler={handleDeleteContactBtnClick}
          />
        </Section>
      </div>
    </div>
  );
};

export default App;
