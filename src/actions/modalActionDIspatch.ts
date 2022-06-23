export const OPEN_POST_MODAL = "OPEN_POST_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export interface openPostModal {
  type: typeof OPEN_POST_MODAL;
}
export interface closeModal {
  type: typeof CLOSE_MODAL;
}
export type modalActionDispatch = openPostModal | closeModal;
