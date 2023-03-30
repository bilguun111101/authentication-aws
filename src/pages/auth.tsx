import axios from 'axios';
import Image from 'next/image';
import { Input } from '@/components';
import React, { useCallback, useState } from 'react';

interface userType {
  email: string;
  username: string;
  password: string;
}

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<boolean>(false);
  const [logedIn, setLogedIn] = useState<any>({});
  const inputs = [
    { label: "Email", value: email, onChange: (e: any) => setEmail(e.target.value), type: 'email' },
    { label: 'Username', value: username, onChange: (e: any) => setUsername(e.target.value), type: 'text' },
    { label: "Password", value: password, onChange: (e: any) => setPassword(e.target.value), type: 'password' },
    { label: "Confirm password", value: confirm, onChange: (e: any) => setConfirm(e.target.value), type: 'password' }
  ]
  const switchFunction = useCallback(() => {
    setVariant(!variant);
  }, [variant])

  const signup = async(user: userType) => {
    try {
      if(!(password === confirm)) {
        return;
      }
      await axios.post("", user);
    } catch (error) { console.log(error) }
  }

  const login = async(user: userType) => {
    try {
      const response = await axios.post("", user)
      // setLogedIn(response);
    } catch (error) { console.log(error) }
  }

  const authentication = useCallback(() => {
    if(
      !password || !confirm || !email || !username
    ) return;
    const user = {
      email,
      username,
      password
    }
    variant ? login(user) : signup(user);
  }, [email, username, password, confirm])
  return (
    <section 
      className="
        flex
        w-full
        bg-cover
        h-screen
        relative
        bg-fixed
        bg-center
        items-center
        bg-no-repeat
        justify-center
        bg-[url('/picnic.jpeg')]  
      "
    >
      <div 
        className="
          p-5
          sm:w-96 
          w-full 
          flex 
          flex-col
          items-center
          sm:h-auto 
          h-full
          transition 
          backdrop-blur-lg
          sm:rounded-xl
          sm:border
          border-0
        "
        style={{ backgroundColor: 'rbga(255, 255, 255, 0.7)' }}
      >
        <Image 
          src={require("../../public/vercel.svg")}
          alt="Logo"
          width={150}
          height={50}
        />
        <div className='w-full flex flex-col items-center gap-2 my-12'>
          {inputs.map((input, idx) => {
            const {
              type,
              label,
              value,
              onChange
            } = input;
            if(variant && (label === 'Username' || label === 'Confirm password')) return;
            return (
              <Input 
                key={idx}
                type={type}
                label={label}
                value={value}
                onChange={onChange}
              />
            )
          })}
        </div>
        <button 
          onClick={authentication}
          className='
            rounded-lg 
            font-semibold 
            hover:opacity-80 
            transition 
            border-2
            px-12
            text-white
          '
        >
          { variant ? 'Log in' : 'Sign up' }
        </button>
        <div className='w-full flex justify-end mt-8'>
          <p className='text-inherit text-xs'>{variant ? 'Aleady have an account' : 'First time using this web?'} &nbsp;
            <span className='text-white hover:underline cursor-pointer' onClick={switchFunction}>
              {variant ? 'log in' : 'Create an account'}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Auth;