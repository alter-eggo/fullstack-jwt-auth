import React, { useEffect, useContext, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/AuthResponse';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }


  if (store.isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    )
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь ${store.user.email} авторизован` : 'Авторизуйтесь'}</h1>
      <h1>{store.user.isActivated ? `Аккаунт ${store.user.email} подтвержден` : `Аккаунт ${store.user.email} не подтвержден`}</h1>

      <button onClick={getUsers}>Получить пользователей</button>
      {users.map(user =>
        <div key={user.email}>
          {user.email}</div>
      )
      }
      <button onClick={() => store.logout()}>Выйти</button>
    </div>
  );
}

export default observer(App);
