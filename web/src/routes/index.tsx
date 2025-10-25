import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { useEffect, useState } from 'react'
import { AxiosClient } from '@/api-client/AxiosClient';
import { addToast, Button, Input, toast } from '@heroui/react';
import { UserSession } from '@/user-session';
import { UserRole } from '@/api-client/model/enum/UserRole';

export const Route = createFileRoute('/')({
  component() {
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function login() {
      try {
        setLoading(true);
        const res = await AxiosClient.login({ body: { username, password } });
        UserSession.setUser(res.token, res.user);
        switch (res.user.role) {
          case UserRole.Admin:
            window.location.href = '/admin';
            break; 
          case UserRole.Kasir:
            window.location.href = '/kasir';
            break;
        }
      } catch (err: any) {
        addToast({ title: "Error", color: 'danger', description: err?.response?.data?.toString() });
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="flex items-center justify-center h-[100dvh]">
        <div className={`
          flex flex-col items-center gap-3 w-full mx-5 p-4 bg-[#00000003] shadow-[0px_1px_75px_1px_rgba(0,0,0,.08)] rounded-3xl
          lg:w-120
        `}>
          <div className='text-xl font-bold pt-2'>
            Wening Laundry
          </div>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && login()}
            placeholder='Username' />
          <Input
            type={'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && login()}
            placeholder='Password' />
          <Button
            color='primary'
            isLoading={loading}
            onPress={login}
            className={`
              w-full
            `}>
            Login
          </Button>
        </div>
      </div>
    )
  }
})
