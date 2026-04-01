export function formatDateWithDot(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}.${month}.${day}`;
}

interface KakaoShareParams {
  buttonName: string;
  name: string;
  imgURL: string;
  domainURL: string;
  currentURL: string;
}

interface KakaoShareSettings {
  container: string;
  objectType: string;
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: {
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }[];
}

export function getKakaoShareSettings({
  buttonName,
  name,
  imgURL,
  domainURL,
  currentURL,
}: KakaoShareParams): KakaoShareSettings {
  return {
    container: buttonName,
    objectType: "feed",
    content: {
      title: `[Ro1ling] ${name}님의 롤링페이퍼 공유`,
      description: `${name}님의 롤링페이퍼에 메시지를 작성하고, 나만의 롤링페이퍼를 만들어보세요!`,
      imageUrl: imgURL,
      link: {
        mobileWebUrl: domainURL,
        webUrl: domainURL,
      },
    },
    buttons: [
      {
        title: "메시지 남기기",
        link: {
          mobileWebUrl: currentURL,
          webUrl: currentURL,
        },
      },
    ],
  };
}