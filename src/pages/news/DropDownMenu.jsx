import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import ErrorAlert from "../../utils/ErrorAlert";
import { useStore } from "../../store/useUserStore";
import ShareButton from "../../utils/ShareButton";

export default function DropDownMenu({ newsId, userId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const logId = useStore((state) => state.userId);
  const [own, setOwn] = useState(false);

  useEffect(() => {
    if (userId === logId) {
      setOwn(true);
    } else {
      setOwn(false);
    }
  }, [logId, userId]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEdit = async () => {
    try {
      await apiClient.get("/api/auth/check");
      navigate("/news/update-form", {
        state: {
          newsId: Number(newsId),
        },
      });
    } catch (error) {
      ErrorAlert(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        onClick={handleClick}
        className="cursor-pointer"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {own && (
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              뉴스 수정
            </button>
          )}
          <ShareButton />
        </div>
      )}
    </div>
  );
}
