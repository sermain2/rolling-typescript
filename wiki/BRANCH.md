## 브랜치 전략

Github Flow에 백업용 브랜치를 추가한 형태로, main, develop, feature를 사용한다.

- main(배포, 백업): develop이 문제가 없을때 주기적으로 그 내용을 반영한다.
- develop(배포, 테스트): Github Flow의 master 브랜치 역할을 한다.
- feature(기능 개발): 개별 작업을 위해 develop으로부터 분기하고, 작업 완료 후 develop으로 머지한다.

하나의 레포지토리에서 작업할 수 있지만, 팀원들이 익숙한 방식대로 작업하기 위해 각자 포크하기로 했다. 포크한 레포지토리(origin)에서 작업하고, 기존 레포지토리(upstream)로 PR을 날리도록 했다.

### 추천 작업 흐름

0. develop 브랜치는 항상 최신으로 유지한다.

- 깃허브에서 포크한 레포지토리(origin)의 develop 브랜치를 선택한다.
- 기존 레포지토리(upstream)와 싱크를 맞춘다.  
  (Sync fork - Update branch 클릭)
- 터미널로 돌아와 로컬 develop에 변경사항을 반영한다.  
  `git checkout develop`  
  `git pull origin develop`

1. 브랜치 생성: 새로운 작업을 시작할 때 develop 브랜치를 베이스로 생성한다.  
   `git checkout develop`  
   `git checkout -b feature/{이름}`
2. 푸시: 중간중간 생성한 커밋은 origin으로 push한다.  
   `git push -u origin features/{이름}`  
   (`-u origin features/{이름}`은 최초 한번만 붙여주면 된다. 이후에는 `git push`)
3. PR: 작업을 완료하면 upstream의 develop으로 PR을 보낸다.  
   깃허브에서 Create pull request (New pull request) 누르고, **base를 develop**으로 잘 지정해야 한다.
4. 머지: **squash and merge**로 머지한 후, 해당 브랜치는 **삭제**한다.

5. 중간에 다른 사람이 한 작업물을 불러오고 싶은 경우

- 먼저 develop을 최신 상태로 만든다. (0번 참고)
- ~~기존에 과거 develop이 base였을 것이므로, 최신 develop으로 rebase한다.~~  
  ~~`git checkout feature/{이름}`  
  `git rebase develop`~~  
  ~~\* rebase를 하면 새로운 베이스 위에 커밋을 생성하므로 커밋 id, 생성 시간 등이 달라지므로 주의
  → 이미 origin에 push해 두었다면 force push 해야할 수도 있다..
  이게 싫다면 rebase 대신 merge를 해도 된다.~~
- PR을 크게(많은 작업, 여러 커밋 포함, 긴 기간동안) 한다면 중간에 합칠 때 merge를 추천한다.  
  `git checkout feature/{이름}`  
  `git merge develop`

### squash and merge 사용시 주의할 점

squash and merge를 하게 되면, PR에 있는 각 커밋들이 하나로 합쳐져 반영된다.
features/main에서 작업한 내용을 develop에 반영하는 상황을 예로 들면,

- features/main에는 각 커밋이 그대로 남아있지만
  (c1, c2, c3, c4, c5의 작업을 PR 날리고 squash and merge 하면)
- develop에는 그 커밋들은 없고 합쳐진 커밋만 있습니다
  (develop에는 c1-5가 통합된 C1만 들어갑니다)

→ 따라서 작업하던 브랜치(features/main)에서 PR이 merge된 후 다른 작업을 이어하고 다시 develop에 반영하려고 하면, 이전에 이미 반영된 커밋들로 인해 충돌이 발생할 수 있습니다.
(c6, c7, c8, c9의 작업을 한 이후 **features/main**에는 c1-c9가 있고, **develop**에는 C1만 있습니다. C1은 c1-5의 내용을 가지고 있지만, 그 중 어느 것과도 동일하다 여겨지지 않으므로 충돌이 발생합니다)
