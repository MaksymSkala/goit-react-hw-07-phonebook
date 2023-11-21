import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await fetch('https://655cbaa725b76d9884fddb88.mockapi.io/contacts');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], filter: '', isLoading: false, error: null },
  reducers: {
    addContact: (state, action) => {
      const { id, name, number } = action.payload;
      const isContactUnique = state.items.findIndex(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      ) === -1;

      if (!isContactUnique) {
        alert(`${name} is already in contacts.`);
        return;
      }

      state.items.push({ id, name, number });
    },
    deleteContact: (state, action) => {
      const contactId = action.payload;
      const existingContactIndex = state.items.findIndex((contact) => contact.id === contactId);

      if (existingContactIndex !== -1) {
        state.items.splice(existingContactIndex, 1);
      } else {
        alert(`Invalid contactId: ${contactId}`);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;