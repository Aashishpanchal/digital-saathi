import React from "react";
import AppRouter from "./routers";
import { BrowserRouter as Router } from "react-router-dom";
import InformationModal from "./components/modals/InformationModal";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
// import useLoadingWithAuth0 from "./hooks/useLoadingWithAuth0";

export default function App() {
  // const { loading } = useLoadingWithAuth0();
  const { informationModal } = useSelector(
    (state: RootState) => state.modalSlice
  );

  return (
    <Router>
      <div>
        <AppRouter />
        {/* add information modal */}
        <InformationModal {...informationModal} />
      </div>
    </Router>
  );
}
