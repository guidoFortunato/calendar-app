import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const { isDateModalOpen } = useUiStore()

  const handleClickNew = () => {
    startDeletingEvent();
  };

  // if ( !hasEventSelected ) {
  //   return null
  // }
  // if ( isDateModalOpen ) {
  //   return null
  // }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClickNew}
      style={{ display: hasEventSelected && !isDateModalOpen ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
