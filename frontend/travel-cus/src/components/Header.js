import React from 'react'
import { Link } from 'react-router-dom'

const submitLogout = () => {
  
  sessionStorage.removeItem("idCus");
}


const checkMytour = () => {
  if(sessionStorage.getItem("idCus") === null){
    window.location = "/login"
  }
}

const Header = () => {
  return (
    <header className='header'>
      <div>
        <Link className='links' to='/'>
          Trang chủ
        </Link>
      </div>

      <nav className='navbar'>
        <ul>
        <Link className='links' to='/mytour/:idCus' onClick={checkMytour}>
            Tour của tôi
          </Link>
          <Link className='links' to='/login'>
            Đăng nhập
          </Link>
          <Link className='links' to='/register'>
            Đăng ký
          </Link>
          <Link className='links' to='/login' onClick={submitLogout}>
            Đăng xuất
          </Link>
          
        </ul>
      </nav>
    </header>
  )
}

export default Header
