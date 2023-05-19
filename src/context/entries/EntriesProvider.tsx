import { FC, PropsWithChildren, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from 'interfaces';

export interface EntriesState {
  entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pendiente: this is a first description',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'En progregso: this is a second description',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      _id: uuidv4(),
      description: 'Terminada: this is a third description',
      status: 'finished',
      createdAt: Date.now() - 500000,
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      status: 'pending',
      createdAt: Date.now(),
    };
    dispatch({ type: 'ADD_ENTRY', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: 'UPDATE_ENTRY', payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
      }}>
      {children}
    </EntriesContext.Provider>
  );
};

export function useEntriesContext() {
  const context = useContext(EntriesContext);
  if (!context) throw new Error('useEntriesContext must be used within a EntriesProvider');
  return context;
}
