# Board-APP

express + sveltekit 웹 SNS 사이트

## ⚒️ 사용한 기술스택

### 백엔드

![express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)

### 프론트엔드

![sveltekit](https://img.shields.io/badge/sveltekit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)

### 배포

![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![awsBeanstalk](https://img.shields.io/badge/AWS%20Beanstalk-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![travisCi](https://img.shields.io/badge/travis%20ci-3EAAAF?style=for-the-badge&logo=travisci&logoColor=white)
![vercel](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📷 화면구성

<table>
  <tr>
  <th>메인</th>
  <th>카테고리</th>
  <th>상세</th>
  </tr>
  <tbody>
  <tr>
    <td>
    <image  src="images/main2.png">
    </td>
    <td>
    <image  src="images/main_category2.png">
    </td>
    <td>
    <image  src="images/detail2.png">
    </td>
  </tr>
  <th>생성</th>
  <th>로그인</th>
  <th>회원가입</th>
  </tr>
  <tr>
    <td>
    <image  src="images/create2.png">
    </td>
    <td>
    <image  src="images/login2.png">
    </td>
    <td>
    <image  src="images/join2.png">
    </td>
  </tr>
  </tbody>
</table>

## 📌 주요 기능

#### 회원가입

- Value Object를 사용한 비밀번호 유효성 검사

#### 로그인

- jwt 사용
- 로그인 시 쿠키 및 세션 생성

#### 게시글 생성

- 해시태그 기능

#### 댓글

- 로그인한 사용자는 게시글에 댓글 기능

#### 추천

- 게시글과 댓글에 추천/비추천

## ❗️ 구현 내용 및 고려한 점

#### Dependency Injection

- DI컨테이너를 사용한 의존성 주입

#### Architecture

- domain, application, infrastructure 레이어로 분리
- domain layer: domain model, repository interface
- application layer: services, controller, request/response dto
- infrastructure layer: repository implementations, ORM entity

#### Test Container를 사용한 Unit Test

- Mysql container를 생성하여 repository 단위테스트
- 실제 운영에 사용하는 db 시스템을 사용하여 테스트

#### Deploy

- Docker, AWS beanstalk를 사용한 배포
- Travis CI로 CI/CD 사용

## ❓ 더 생각해볼 점

#### Repository의 단위테스트

- 유닛테스트를 할 때마다 db containter를 만들어서 테스트를 하다보니 실행시간이 너무 오래 걸림
- => repository 테스트를 통합테스트에서 한 번에 하는 것도 고려해볼 것

#### 프로젝트 규모에 맞는 Architecture

- 기능에 따라 각각의 폴더 안에 service와 controller를 생성하여 폴더 구조가 복잡함
- => 요구사항이 복잡하지 않거나 수정이 적을 것 같은 경우에는 하나의 service 파일 안에 모든 로직들을 넣는 것도 고려해볼 것

#### 로그 관리

- 모니터링과 오류 추적을 위해 로깅 시스템 도입

## ⚙️서버구성도

<image src="images/서버구성도.png">
