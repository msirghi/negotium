import firebase from '../firebase/clientApp';
import { useState } from 'react';
import { useRouter } from 'next/router';
require('firebase/auth')

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async () => {
    setError('');
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(res);
      await router.push('/home');
    } catch (error) {
      console.log(error);
      setError('Something is wrong.');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        placeholder={'email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder={'password'}
        type={'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => onSubmit()}>Login</button>
    </div>
  );
};

export default Auth;
