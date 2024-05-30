<%--
  Created by IntelliJ IDEA.
  User: wooest
  Date: 5/25/24
  Time: 1:56 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
	<title>메인</title>
</head>
<body>
  <h3>메인</h3>
  <div><a href="/user/view/list">회원 목록</a></div>
  <div><a href="/board/view/list">게시판 리스트</a></div>
  <div><a id="loginButton" href="/login/login">로그인</a></div>
  <div><a href="/posts/main">(세션인증) 사용자 메인</a></div>
  <div><a href="/admins/main">(세션인증) 관리자 메인</a></div>
</body>
</html>

<script>
  let sessionUserName = "${sessionUser.username}";
  let loginButton = document.getElementById("loginButton");
  if(sessionUserName === ""){
    loginButton.innerText = "로그인";
    loginButton.href = "/login/login";
  } else {
    loginButton.innerText = "로그아웃";
    loginButton.href = "/login/logout";
  }
</script>
