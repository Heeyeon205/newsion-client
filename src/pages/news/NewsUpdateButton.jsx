import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";

export default function NewsUpdateButton({
  newsId,
  title,
  content,
  categoryId,
  image,
}) {
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("newsId", newsId);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("categoryId", categoryId);
  formData.append("image", image);

  const handleClick = async () => {
    try {
      await apiClient.put(`/api/news/${newsId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("뉴스 수정 완료!");
      navigate(`/news/${newsId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-400 cursor-pointer"
      onClick={handleClick}
    >
      수정
    </button>
  );
}
