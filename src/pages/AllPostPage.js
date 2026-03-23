import { useEffect, useState, useCallback } from "react";
import { getList } from "apis/recipients";
import CardList from "components/ListPage/CardList";
import Loading from "components/common/Loading";
import { ALL_POST_PAGE } from "constants";
import styles from "./AllPostPage.module.scss";
import search from "assets/icons/search.svg";
import { useSearchParams } from "react-router-dom";

function AllPostPage() {
  const [itemInfo, setItemInfo] = useState({
    items: [],
    ids: [],
    count: 0,
    offset: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");
  const [keyword, setKeyword] = useState(initKeyword || "");
  const [allItem, setAllItem] = useState([]);

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    // NOTE - 페이지가 새로고침될 때 URL에서 검색어 제거
    if (!keyword) {
      setSearchParam({});
    }
  }, [keyword, setSearchParam]);

  useEffect(() => {
    setKeyword("");
    const fetchData = async () => {
      let responseRecent;
      let responseAll;
      try {
        setIsLoading(true);
        responseRecent = await getList();
        const count = responseRecent?.count;
        responseAll =
          count <= 12
            ? responseRecent
            : await getList(0, responseRecent?.count);
      } catch (e) {
        setLoadingError(e);
        return;
      } finally {
        setIsLoading(false);
      }
      setAllItem(responseAll.results);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    if (keyword.trim() === "") {
      alert("검색어를 입력해주세요");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setSearchParam(keyword ? { keyword } : {});

    const filteredItems = allItem.filter((item) =>
      item.name.includes(keyword.toLowerCase())
    );

    setItemInfo({
      items: filteredItems,
      ids: filteredItems.map((item) => item.id),
      count: filteredItems.length,
      offset: filteredItems.length,
    });
  };

  // NOTE - 초기 롤링페이퍼를 받아오는 함수
  const handleInitLoad = useCallback(async () => {
    let response;
    try {
      setLoadingError(null);
      setIsLoading(true);
      response = await getList();
    } catch (e) {
      setLoadingError(e);
      return;
    }

    setIsLoading(false);
    const { results: newItems, count } = response;
    setItemInfo({
      items: newItems,
      ids: newItems.map((item) => item.id),
      count,
      offset: newItems.length, // NOTE - 다음에 여기부터 받으면 된다
    });
  }, []);

  // NOTE - 롤링페이퍼를 추가로 받아오는 함수
  const handleMoreLoad = useCallback(async () => {
    let response;
    try {
      setLoadingError(null);
      setIsLoading(true);
      response = await getList(itemInfo.offset);
    } catch (e) {
      setLoadingError(e);
      return;
    }

    setIsLoading(false);
    const { results: newItems, count } = response;
    setItemInfo((prevInfo) => {
      const newIds = newItems.map((item) => item.id);

      // NOTE - 메세지 순서는 일정하므로 앞에서부터 같은만큼 찾는다
      let idx = 0;
      let sameIdIdx = prevInfo.ids.indexOf(newIds[idx]);
      while (sameIdIdx >= 0 && idx++ < newIds.length) {
        sameIdIdx = prevInfo.ids.indexOf(newIds[idx++]);
      }

      if (newIds.length === idx) {
        // NOTE - 모두 일치하는 경우
        return;
      }

      const updatedItems = [...prevInfo.items, ...newItems.slice(idx)];
      return {
        items: updatedItems,
        ids: [...prevInfo.ids, ...newIds.slice(idx)],
        count,
        offset: updatedItems.length,
      };
    });
  }, [itemInfo.offset]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (itemInfo.offset === 0) {
        // NOTE - 아직 초기값도 없다
        return;
      }
      if (itemInfo.offset >= itemInfo.count) {
        // NOTE - 더이상 불러올 메시지가 없다
        return;
      }

      if (target.isIntersecting && !isLoading) {
        // NOTE - 끝에 닿았으며, 로딩중이 아닐 때 새 메시지 로드
        handleMoreLoad();
      }
    },
    [isLoading, itemInfo.count, itemInfo.offset, handleMoreLoad]
  );

  useEffect(() => {
    handleInitLoad();
  }, [handleInitLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1, // NOTE - 1px이라도 보이면, 콜백이 실행
    });

    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      // NOTE - 관찰 시작
      observer.observe(observerTarget);
    }

    return () => {
      // NOTE - 관찰 끝
      observer.unobserve(observerTarget);
    };
  }, [handleObserver]);

  return (
    <main>
      <section className={styles["card-section"]}>
        <form onSubmit={handleSubmit} className={styles["search-form"]}>
          <input
            name="keyword"
            value={keyword}
            onChange={handleChangeKeyword}
            placeholder="롤링페이퍼를 검색해보세요"
            className="font-20-20-18"
          />
          <button className={`${styles["search-button"]} button`}>
            <img src={search} alt="검색 아이콘" />
          </button>
        </form>
        <ol className={styles["card-list"]}>
          {itemInfo.items.map((item) => (
            <li key={item.id}>
              <CardList slideItems={item} page={ALL_POST_PAGE} />
            </li>
          ))}
        </ol>
        {isLoading && <Loading />}
        {loadingError?.message ? <p>{loadingError.message}</p> : ""}
        <div id="observer" className={styles.observer} />
      </section>
    </main>
  );
}

export default AllPostPage;
