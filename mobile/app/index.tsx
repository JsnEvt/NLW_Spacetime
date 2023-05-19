import { useEffect } from 'react';
import { useRouter } from 'expo-router'
import { Text, View, TouchableOpacity } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'


import Stripes from '../src/assets/stripes.svg'
import NLW_Logo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api';


/* a linha abaixo serve para importar o estilo para permitir que facamos alteracoes 
/* no componente Stripe e aplicando o efeito esperado em um objeto, como caracteristica do tailwind */

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/a86eea74e8baadbfb78f',
};

export default function App() {

  const router = useRouter()


  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'a86eea74e8baadbfb78f',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })
    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   })
    // )

    if (response?.type === 'success') {
      const { code } = response.params;

      handleGithubOAuthCode(code)
    }
  }, [response]);

  return (
    <View
      className="flex-1 items-center px-8 p-10"
    >
      <View className='flex-1 items-center justify-center gap-6'>
        <NLW_Logo />
        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Sua cápsula do tempo</Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className='rounded-full bg-green-500 px-5 py-2'
          onPress={() => signInWithGithub()}
        >
          <Text className='font-alt text-sm uppercase text-black'>Cadastrar Lembrança</Text>
        </TouchableOpacity>
      </View>
      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>
        Feito com carinho por Jason no NLW 2023 da Rocketseat
      </Text>
    </View>
  );
}


