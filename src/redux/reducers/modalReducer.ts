import { ModalAction, ModalActionTypes } from '@/redux/actions/ChatbotAtion';

export interface ModalState {
	[key: string]: boolean;
}

const initialModalState: ModalState = {};

export const modalReducer = (state = initialModalState, action: ModalAction): ModalState => {
	switch (action.type) {
		case ModalActionTypes.ShowModal:
			return {
				...state,
				[action.modal_name!]: true,
			};
		case ModalActionTypes.HideModal:
			return {
				...state,
				[action.modal_name!]: false,
			};
		case ModalActionTypes.ToggleModal:
			return {
				...state,
				[action.modal_name!]: !state[action.modal_name!],
			};
		default:
			return state;
	}
};