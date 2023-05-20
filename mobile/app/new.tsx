import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useState } from 'react'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Link, useRouter } from 'expo-router';
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api';


export default function NewMemories() {
  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function openImagePicker() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }

    } catch (err) {
      //err
    }
  };

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')
    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()
      /* A LINHA ABAIXO E APENAS PARA SIMULAR UM ARQUIVO A SER ENVIADO P/BCKEND. LA
      ELE SERA SUBSTITUIDO PELO CONTEUDO CORRETO. ISSO E UM HACKEZINHO. 
      ISSO E DEVIDO A UM PROBLEMA DO TYPESCRIPT COM O REACT NATIVE.*/

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg'
      } as any)
      const uploadReponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      coverUrl = uploadReponse.data.fileUrl
    }

    await api.post('/memories', {
      content,
      isPublic,
      coverUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.push('/memories')
  }

  return (
    <ScrollView className='flex-1 px-8'
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }} >
      <View className='flex-row mt-4 items-center justify-between'>
        <NLWLogo />
        <Link href={'/memories'} asChild>
          <TouchableOpacity className='h-10 w-10 items-center justify-center rounded-full bg-purple-500'>
            <Icon name='arrow-left' size={16} color='#fff' />
          </TouchableOpacity>
        </Link>
      </View>

      <View className='mt-6 space-y-6'>
        <View className='flex-row items-center gap-2'>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{ false: '#767577', true: '#372560' }}
          />
          <Text className='font-body text-base text-gray-200'>
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          onPress={openImagePicker}
          activeOpacity={0.7}
          className='h-32 justify-center items-center rounded-lg border border-dashed border-gray-500 bg-black/20'>

          {preview ? (
            <Image source={{ uri: preview }} className='h-full w-full rounded-lg object-cover' />
          ) : (
            <View className='flex-row items-center gap-2'>
              <Icon name='image' color='#fff' />
              <Text className='font-body text-sm text-gray-200'>
                Adicionar foto ou vídeo de capa
              </Text>
            </View>


          )}
        </TouchableOpacity>

        <TextInput
          textAlignVertical='top'
          multiline
          value={content}
          onChangeText={setContent}
          className='p-0 font-body text-lg text-gray-50'
          placeholder='Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência'
          placeholderTextColor={'#56565a'}
        />

        <TouchableOpacity
          onPress={handleCreateMemory}
          activeOpacity={0.7}
          className='rounded-full self-end items-center bg-green-500 px-5 py-2'
        >
          <Text className='font-alt text-sm uppercase text-black'>Salvar</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  )
}