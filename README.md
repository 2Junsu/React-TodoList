### TodoList에 대한 설명을 간단하게 서술했습니다.
---
### 배포 URL : https://my-todolist-8a800.web.app
---
# TodoList 기능 설명
* LocalStorage를 사용하여 브라우저창을 닫았다가 다시 열어도 데이터가 남아있도록 구현했습니다.

### 1. 메인 페이지
<img width="250" alt="스크린샷 2022-02-11 오전 6 13 14" src="https://user-images.githubusercontent.com/77619905/153497304-d2297adc-1764-4773-b4a8-f5c6aaaa98b5.png"> <img width="250" alt="스크린샷 2022-02-11 오전 6 14 17" src="https://user-images.githubusercontent.com/77619905/153497449-fdbcd5a7-afd7-4882-bd56-9656f51dad01.png"> <img width="250" alt="스크린샷 2022-02-11 오전 6 14 55" src="https://user-images.githubusercontent.com/77619905/153497563-db97f68d-ec9f-4840-b17a-a49a3e573da3.png">
* 체크박스를 누르면 테두리 및 글씨 색이 회색으로 바뀌면서 완료 표시를 하며, 완료된 일만 필터링하여 볼 수도 있습니다.
* 완료하지 않은 일 중에 마감 목표일이 3일 이내인 일은 테두리가 빨간색으로 바뀌면서 긴급하다는 것을 알립니다.
* 완료된 일을 일괄 삭제할 수 있습니다.
* 할 일을 삭제할 수 있고, 이때 정말로 삭제할 것인지 사용자에게 되묻습니다.
* 생성일, 마감 목표일, 태그 별로도 정렬 및 필터링이 가능합니다.
---
### 2. 할 일 입력 페이지
<img width="250" alt="스크린샷 2022-02-11 오전 5 58 47" src="https://user-images.githubusercontent.com/77619905/153495329-01408f7f-dc54-467f-8068-2e1546e08408.png"> <img width="250" alt="스크린샷 2022-02-11 오전 6 02 33" src="https://user-images.githubusercontent.com/77619905/153495854-7e8f5293-de93-42b7-a19a-c8c94e0f1fb7.png"> <img width="250" alt="스크린샷 2022-02-11 오전 6 03 36" src="https://user-images.githubusercontent.com/77619905/153496012-baf45d58-fc40-4f43-8672-7d46c08521bb.png">

* 제목, 상세 설명, 태그, 마감 목표일을 설정할 수 있습니다.
* 입력창에 autoFocus를 줌으로써 사용자가 조금이나마 편리하게 입력할 수 있도록 하였습니다.
* 태그를 여러 개 입력할 수 있으며, 같은 이름의 태그는 중복 입력이 안 됩니다.
* 또한 태그는 배경색과 글씨색을 직접 커스텀할 수 있으며, 색상으로 구분되도록 같은 색상을 고르게 되면 alert를 띄웠습니다.
* 기존의 태그와 같은 태그명을 입력하면 기존 태그의 색으로 변경된다는 alert를 띄우고 변경됩니다.
* 제목이나 상세 설명을 입력하지 않으면 할 일 등록이 되지 않도록 validation을 처리했습니다.
* 뒤로 가거나 창을 닫을 때, 혹은 새로고침할 때 alert를 띄웠습니다.
---
### 3. 할 일 상세 페이지
<img width="350" alt="스크린샷 2022-02-11 오전 6 24 46" src="https://user-images.githubusercontent.com/77619905/153498998-0deb17ec-3984-4dfb-8a19-892726f4a6e3.png"> <img width="350" alt="스크린샷 2022-02-11 오전 6 25 29" src="https://user-images.githubusercontent.com/77619905/153499091-5852fab5-9332-4d64-ad26-5a65409f6aa6.png">

* 할 일의 제목을 누르면 상세 페이지로 넘어옵니다.
* 등록할 때 입력했던 정보와 더불어서 수정일 및 완료일도 표시가 됩니다.
* 아직 수정을 하지 않았거나 완료를 하지 않았다면 일자가 뜨지 않습니다.
---
### 4. 할 일 수정 페이지
<img width="500" alt="스크린샷 2022-02-11 오전 6 28 19" src="https://user-images.githubusercontent.com/77619905/153499474-0e2e45e9-c1f5-426a-b641-73aa8141022b.png">

* 마감 목표일, 제목, 상세 설명, 태그를 변경할 수 있습니다.
