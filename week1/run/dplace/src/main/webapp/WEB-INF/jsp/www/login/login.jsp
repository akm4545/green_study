<%--
  Created by IntelliJ IDEA.
  User: wooest
  Date: 5/28/24
  Time: 10:45 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
	<title>로그인</title>
</head>
<body>
	<h2>로그인 화면 </h2>
	<form class="form-signin" method="post" action="/login/login-proc">

		<input type="text" id="username" name="username" class="form-control" placeholder="아이디" autofocus="" />
		<input type="text" id="password" name="password" class="form-control" placeholder="비밀번호" />
		<input id="joinBtn" type="submit" class="btn btn-secondary active" value="로그인" />
	</form>
</body>
</html>
