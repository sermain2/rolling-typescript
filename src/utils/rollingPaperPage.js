export function formatDateWithDot(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const formattedString = `${year}.${month}.${day}`;

  return formattedString;
}

export function getKakaoShareSettings({
  buttonName,
  name,
  imgURL,
  domainURL,
  currentURL,
}) {
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
