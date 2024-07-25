import React from 'react';

function FindPassword1() {
  return (
    <div className="FindPassword1">
      <h2>비밀번호 찾기</h2>
      <form action="server-url" id="signup-form">
        <input type="text" className="Id" placeholder="id"></input>
        <input type="text" className="Password" placeholder="pw"></input>
        <input type="text" className="Email" placeholder="email"></input>
        <button>회원가입</button>
      </form>
      <div></div>
    </div>
  );
}

export default FindPassword1;
