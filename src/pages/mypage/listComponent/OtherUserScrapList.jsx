import apiClient from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useInfiniteScroll } from "../../../utils/useInfiniteScroll";

export default function ScrapList({ userId }) {
  const navigate = useNavigate();

  const { data, isLoading, hasMore, reset } = useInfiniteScroll(
    async (page, size) => {
      let url = `/api/mypage/scrap-list/${userId}?page=${page}&size=${size}`;
      const response = await apiClient.get(url);
      return response.data.data.content;
    },
    10,
    "newsId"
  );

  return (
    <div className="flex flex-col space-y-4">
      {data.length === 0 ? (
        <p>아직 스크랩한 뉴스가 없어요.</p>
      ) : (
        data.map((scrap) => (
          <div
            key={scrap.newsId}
            onClick={() => navigate(`/news/${scrap.newsId}`)}
            className="bg-white rounded-lg shadow p-4 hover:scale-101 hover:shadow-lg transition-transform duration-300 cursor-pointer"
          >
            <img
              src={scrap.image}
              alt="스크랩 뉴스 이미지"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="text-sm text-orange-500 font-semibold">
              {scrap.categoryName}
            </div>
            <h3 className="font-bold text-lg mt-1">{scrap.title}</h3>
            <div className="text-gray-400 text-xs mt-1">
              {scrap.nickname} · {scrap.createAt}
            </div>
          </div>
        ))
      )}

      {isLoading && <p className="text-center text-gray-400">로딩 중...</p>}

      {!hasMore && data.length > 0 && (
        <p className="text-center text-gray-400 mt-4">
          더 이상 스크랩이 없습니다.
        </p>
      )}
    </div>
  );
}
