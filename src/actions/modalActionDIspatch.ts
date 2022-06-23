export const OPEN_POST_MODAL = "OPEN_POST_MODAL";
export const CLOSE_POST_MODAL = "CLOSE_POST_MODAL";
export const OPEN_SEARCH_RESULTS_MODAL = "OPEN_SEARCH_RESULTS_MODAL";
export const CLOSE_SEARCH_RESULTS_MODAL = "CLOSE_SEARCH_RESULTS_MODAL";

export interface openPostModal {
  type: typeof OPEN_POST_MODAL;
}
export interface closePostModal {
  type: typeof CLOSE_POST_MODAL;
}
export interface openSearchResultsModal {
  type: typeof OPEN_SEARCH_RESULTS_MODAL;
}
export interface closeSearchResultsModal {
  type: typeof CLOSE_SEARCH_RESULTS_MODAL;
}
export type modalActionDispatch =
  | openPostModal
  | closePostModal
  | openSearchResultsModal
  | closeSearchResultsModal;
