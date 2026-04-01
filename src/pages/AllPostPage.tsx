import { useEffect, useState, useCallback } from "react";
import { getList } from "apis/recipients";
import CardList from "components/ListPage/CardList";
import Loading from "components/common/Loading";
import { ALL_POST_PAGE } from "constants/index";
import styles from "./AllPostPage.module.scss";
import search from "assets/icons/search.svg";
import { useSearchParams } from "react-router-dom";

interface RecipientItem {
  id: number;
  name: string;
  backgroundColor: string;
  backgroundImageURL: string | null;
  createdAt: string;
  messageCount: number;
}

interface ItemInfo {
  items: RecipientItem[];
  ids: number[];
  count: number;
  offset: number;
}

function AllPostPage() {
  const [itemInfo, setItemInfo] = useState<ItemInfo>({
    items: [],
    ids: [],
    count: 0,
    offset: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const initKeyword = searchParam.get("keyword");
  const [keyword, setKeyword] = useState<string>(initKeyword || "");
  const [allItem, setAllItem] = useState<RecipientItem[]>([]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
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
        setLoadingError(e as Error);
        return;
      } finally {
        setIsLoading(false);
      }
      setAllItem(responseAll.results);
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleInitLoad = useCallback(async () => {
    let response;
    try {
      setLoadingError(null);
      setIsLoading(true);
      response = await getList();
    } catch (e) {
      setLoadingError(e as Error);
      return;
    }

    setIsLoading(false);
    const { results: newItems, count } = response;
    setItemInfo({
      items: newItems,
      ids: newItems.map((item: RecipientItem) => item.id),
      count,
      offset: newItems.length,
    });
  }, []);

  const handleMoreLoad = useCallback(async () => {
    let response;
    try {
      setLoadingError(null);
      setIsLoading(true);
      response = await getList(itemInfo.offset);
    } catch (e) {
      setLoadingError(e as Error);
      return;
    }

    setIsLoading(false);
    const { results: newItems, count } = response;
    setItemInfo((prevInfo) => {
      const newIds = newItems.map((item: RecipientItem) => item.id);

      let idx = 0;
      let sameIdIdx = prevInfo.ids.indexOf(newIds[idx]);
      while (sameIdIdx >= 0 && idx++ < newIds.length) {
        sameIdIdx = prevInfo.ids.indexOf(newIds[idx++]);
      }

      if (newIds.length === idx) return prevInfo;

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
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (itemInfo.offset === 0) return;
      if (itemInfo.offset >= itemInfo.count) return;
      if (target.isIntersecting && !isLoading) {
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
      threshold: 1,
    });

    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
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