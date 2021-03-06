import React, { useState } from 'react';
import { FaRegPaperPlane, FaUserPlus } from 'react-icons/fa';

import { useHistory } from 'react-router-dom';

import useToastContext from '../../contexts/ToastContext'
import useAuthContext from '../../contexts/AuthContext';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Form, FormWrapper, FormHeader, FormButtons } from './styles'

const SignIn: React.FC = () =>{
  const history = useHistory();
	const { signIn } = useAuthContext();
  const { addToast } = useToastContext();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSign = async () => {
    try {
      await signIn({
        email: email as string,
        password: password as string,
      });
    } catch (e) {
      addToast({
        title: 'Invalid credentials',
        type: 'error'
      })
    }
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	return (
		<Container>
			<FormWrapper>
				<FormHeader>
					<Logo />
				</FormHeader>
				<Form>
					<Input
						name="email"
						type="email"
						placeholder="email"
						value={email}
						onChange={handleEmailChange}
					/>
					<hr/>
					<Input
						name="password"
						type="password"
						placeholder="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</Form>
				<FormButtons>
						<Button
							onClick={handleSign}
						>
							<FaRegPaperPlane />
						</Button>
						<Button
							backgroundColor={'#4BBF73'}
              onClick={() => history.push('signup')}
						>
							<FaUserPlus />
						</Button>
				</FormButtons>
			</FormWrapper>
		</Container>
	)
}

export default SignIn;
