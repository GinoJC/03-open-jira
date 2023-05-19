import { FC, PropsWithChildren, useContext, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

export const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSideMenu = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const setIsAddingEntry = (isAddingEntry: boolean) =>
    dispatch({ type: 'SET_IS_ADDING_ENTRY', payload: isAddingEntry });
  const startDragging = () => dispatch({ type: 'START_DRAGGING' });
  const endDragging = () => dispatch({ type: 'END_DRAGGING' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}>
      {children}
    </UIContext.Provider>
  );
};

export function useUIContext() {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUIContext must be used within a UIProvider');
  return context;
}
