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
    <image width=200 src="images/main2.png">
    </td>
    <td>
    <image width=200 src="images/main_category2.png">
    </td>
    <td>
    <image width=200 src="images/detail2.png">
    </td>
  </tr>
  <th>생성</th>
  <th>로그인</th>
  <th>회원가입</th>
  </tr>
  <tr>
    <td>
    <image width=200 src="images/create2.png">
    </td>
    <td>
    <image width=200 src="images/login2.png">
    </td>
    <td>
    <image width=200 src="images/join2.png">
    </td>
  </tr>
  </tbody>
</table>

## ⚙️서버구성도

<image src="images/서버구성도.png">

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

- 게시글과 댓글에 추천이나 비추천

## ❗️ 구현 내용 및 고려한 점

#### JWT를 사용한 인가

- 로그인 시 토큰 발급
- 모든 요청 시 request authorization 헤더에 추가하여 요청
- EnsureAuthenticated, IncludeDecodedTokenIfExists와 같은 권한에 따른 미들웨어 사용

#### Dependency Injection

- DI컨테이너를 사용한 의존성 주입
-

#### Layered Architecture

- domain, application, infrastructure 레이어로 구분
-

#### Docker, AWS beanstalk, Travis CI를 사용한 배포

- .travis.yml
  - q
- docker-compose.yml

## ❓ 더 생각해볼 점

#### 프로젝트 규모에 맞는 구현
