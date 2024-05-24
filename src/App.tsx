
import { Box } from '@chakra-ui/react';
import './assets/css/App.css';
import InputCustom from './components/Input/Input';
import { useQuery,
} from 'react-query';
import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0)


  const { isLoading, data } = useQuery(
    'repoData',
    () =>
      fetch(
        'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete'
      ).then((response) => response.json())
  );

  if (isLoading) return <p>Загрузка...</p>;

  // if (error) return <p>Ошибка: {error.message}</p>;

  console.log(count);
  

  return (
    <Box pt={'100px'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box className='text-3xl font-bold mb-3'>{count}</Box>
      <InputCustom dataTags={data} changeCount={setCount}/>
    </Box>
  )
}

export default App
