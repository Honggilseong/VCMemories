import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
};
interface ReportsList {
  reasons: string[];
  selected: string;
}
interface Props {
  isReportOpen: boolean;
  isReportLoading: boolean;
  setIsReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reportsList: ReportsList;
  setReportsList: React.Dispatch<React.SetStateAction<ReportsList>>;
  handleSubmitReport: () => void;
}

function PostReportModal({
  isReportOpen,
  setIsReportOpen,
  reportsList,
  setReportsList,
  handleSubmitReport,
  isReportLoading,
}: Props) {
  const handleSelectReason = (event: any) => {
    setReportsList({ ...reportsList, selected: event.target.value });
  };
  const handleCloseModal = () => {
    setIsReportOpen(false);
    setReportsList({ ...reportsList, selected: "" });
  };

  return (
    <Modal
      isOpen={isReportOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Comments Modal"
      style={customStyles}
    >
      <div className="w-[500px]">
        <div className="flex justify-center items-center">
          <h1 className="text-red-500 font-bold text-3xl mb-10">Report</h1>
        </div>
        {reportsList.reasons.map((reason) => (
          <div key={reason} className="flex my-3">
            <div className="mr-3">
              <input
                type="radio"
                name="reason"
                value={reason}
                id={reason}
                onChange={handleSelectReason}
              />
            </div>
            <label htmlFor={reason} className="font-bold">
              {reason}
            </label>
          </div>
        ))}
        <div
          className={`flex items-center justify-center p-3 mt-10 text-white rounded-lg ${
            isReportLoading ? "bg-gray-300" : "bg-red-500 cursor-pointer"
          }`}
          onClick={handleSubmitReport}
        >
          <p>{isReportLoading ? "Reporting..." : "Report"}</p>
        </div>
        <div
          className="bg-gray-400 text-white p-3 rounded-lg cursor-pointer flex items-center justify-center mt-3"
          onClick={handleCloseModal}
        >
          <p>Close</p>
        </div>
      </div>
    </Modal>
  );
}

export default PostReportModal;
