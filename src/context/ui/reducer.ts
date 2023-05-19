import { UIState } from './';

type UIActionType =
  | { type: 'OPEN_SIDEBAR' | 'CLOSE_SIDEBAR' | 'START_DRAGGING' | 'END_DRAGGING' }
  | { type: 'SET_IS_ADDING_ENTRY'; payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        sidemenuOpen: true,
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        sidemenuOpen: false,
      };
    case 'SET_IS_ADDING_ENTRY':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case 'START_DRAGGING':
      return {
        ...state,
        isDragging: true,
      };
    case 'END_DRAGGING':
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
