export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export interface openModal {
  type: typeof OPEN_MODAL;
}
export interface closeModal {
  type: typeof CLOSE_MODAL;
}
export type modalActionDispatch = openModal | closeModal;
