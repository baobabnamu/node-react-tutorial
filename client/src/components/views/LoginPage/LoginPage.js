import React, { useState } from 'react'

function LoginPage() {

  const [Email, setEmail] = useState("")  
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value) // state 실시간 값 입력
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value) // state 실시간 값 입력
  }
  
  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지
    
    console.log('Email', Email);
    console.log('Password', Password);
  }
  
  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br/>
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
