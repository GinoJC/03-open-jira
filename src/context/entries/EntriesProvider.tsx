import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from 'interfaces';
import { entriesApi } from 'apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    refreshEntries();
  }, []);

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: 'REFRESH_ENTRIES', payload: data });
  };

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: 'ADD_ENTRY', payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
    dispatch({ type: 'UPDATE_ENTRY', payload: data });
    if (showSnackbar) {
      enqueueSnackbar('Entrada actualizada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const deleteEntry = async (id: string) => {
    dispatch({ type: 'DELETE_ENTRY', payload: id });
    enqueueSnackbar('Entrada borrada', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
        deleteEntry,
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
