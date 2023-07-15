import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilter,
  loadingStatus,
  errorMesage,
} from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { Puff } from 'react-loader-spinner';
export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(loadingStatus);
  const error = useSelector(errorMesage);
  const dispatch = useDispatch();

  const buildMarkup = () => {
    const onDelete = contactId => {
      dispatch(deleteContact(contactId));
    };

    const filteredContacts =
      contacts.length > 0
        ? filter
          ? contacts.filter(contact => contact.name.includes(filter))
          : contacts
        : [];

    return isLoading ? (
      <Puff
        height="100"
        width="100"
        color="#FFFFFF"
        secondaryColor="#FFFFFF"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    ) : error ? (
      <p>{error}</p>
    ) : filteredContacts.length > 0 ? (
      filteredContacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}{' '}
          <button onClick={() => onDelete(contact.id)}>Delete</button>
        </li>
      ))
    ) : filteredContacts.length === 0 && contacts.length > 0 ? (
      <p>No matches for your filter {':('}</p>
    ) : (
      <p>There are no contacts in your phonebook {'=('}</p>
    );
  };

  return (
    <div style={{ marginBottom: 230 }}>
      <ul>{buildMarkup()}</ul>
    </div>
  );
};

export default ContactList;
