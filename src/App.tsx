import { Container, Flex, Stack } from "@chakra-ui/react"
import { useEffect } from "react"
import MainHead from "./components/main/Head"
import Modal from './components/Modal/Dialog'
import Tasks from "./components/Tasks/Tasks"
import { getAuthData } from "./components/Tasks/useTasks"
import { DarkMode } from "./components/ui/color-mode"
import { TodoProvider } from "./providers/Todos"
import { UserProvider } from "./providers/Users"
import useTodos from "./providers/useTodos"
import useUsers from "./providers/useUsers"


function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(true)
  const { isAuthenticated, setIsAuthenticated } = useUsers()
  const { setTasks } = useTodos()

  useEffect(() => {
    getAuthData({ setIsAuthenticated, setTasks })
  }, [])

  return (
    <DarkMode>
      <Flex
        w={'full'}
        minH={'100vh'}
        bg={'#1A202C'}
      >
        <Container maxW={'10/12'} bg={"#1A202C"}>
          <Stack
            textAlign={'center'}
            align={'center'}
            gap={{ base: 8, md: 10 }}
            py={{ base: 20, md: 16 }}>
            <MainHead />
            <Tasks />
          </Stack>
        </Container>
      </Flex>
      {!isAuthenticated && <Modal />}
    </DarkMode>
  )
}

function Root() {
  return (
    <UserProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </UserProvider>
  )
}

export default Root
