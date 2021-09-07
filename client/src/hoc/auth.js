import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // option 설명
    // null => 아무나 출입이 가능한 페이지를 말함
    // true -> 로그인한 유저만 출입이 가능한 페이지를 말함
    // false => 로그인한 유저는 출입이 불가능한 페이지를 말함

    // adminRoute 설명
    // null => 로그인한 유저 중 일반 사용자가 접근이 가능한 페이지를 말함
    // true => 관리자 사용자만 접근 가능한 페이지를 말함

  function AuthenticationCheck(props) {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        // 비로그인
        if(!response.payload.isAuth) {
          if(option) {
            props.history.push('/login')
          }
        } else { // 로그인
          if(adminRoute && !response.payload.isAdmin) {
            props.history.push('/')
          } else {
            if(option === false) {
              props.history.push('/')
            }
          }
        }
      })
    }, [dispatch, props.history])

    return (
      <SpecificComponent {...props}/>
    )
  }

  return AuthenticationCheck
}