import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { closeTab } from "../../redux/features/tab/tabsSlice";
import SaveModal from "../modal/Modal";
import { useDispatch } from "react-redux";

export default function TabHeader({ title, id, unSaved }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickHandler = () => {
    navigate(`/${id}`);
  };
  const closeHandler = (e) => {
    dispatch(closeTab({ id }));
    e.stopPropagation();
  };
  return (
    <>
      {isModalOpen && (
        <SaveModal
          show={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleExit={closeHandler}
        />
      )}
      <div
        onClick={clickHandler}
        style={{ color: unSaved ? "red" : "inherit" }}
      >
        {title.slice(0, 10)}...
        <IoCloseSharp
          className="text-danger"
          onClick={(e) => (unSaved ? setIsModalOpen(true) : closeHandler(e))}
        />
      </div>
    </>
  );
}
