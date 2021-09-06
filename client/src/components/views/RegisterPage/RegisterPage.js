import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")  
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value) // state 실시간 값 입력
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value) // state 실시간 값 입력
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value) // state 실시간 값 입력
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value) // state 실시간 값 입력
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지

    if(Password !== ConfirmPassword) {
      return alert('입력하신 비밀번호가 일치하지 않습니다.')
    }
    
    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          props.history.push("/login")
        } else {
          alert("Failed to Sign Up!!")
        }
      })
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>ConfirmPassword</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br/>
        <button>
          회원 가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
