import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog"
import { Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import UserForm from "../user/form"

import UploadFile from "../main/uploadFile"

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <DialogRoot
      defaultOpen
      open={isOpen}
      size="cover"
      placement="center"
      closeOnEscape={false}
      closeOnInteractOutside={false}
    >
      <DialogContent
        bg={'#1A202C'}
        boxSize={"xl"}
        textAlign={'center'}
        borderWidth={1}
        borderStyle={'groove'}
        borderColor={'#ccc'}
      >
        <DialogHeader
          mt={10}
        >
          <DialogTitle color={"white"} fontSize={'1.8rem'} fontWeight={700}>Bienvenido!</DialogTitle>
        </DialogHeader>
        <DialogBody color={"white"} fontSize={"1.05rem"} lineHeight={"1.5rem"}>
          Ups... vemos que es primera vez que ingresas a este sitio... <br />
          Esta aplicación maneja datos de usuarios por lo cual solo dinos como te gustaria que te llamemos 😁
          <UserForm setIsOpen={setIsOpen} />
          <Stack justifyContent={'center'} mt={6}>
            <Text fontSize={'1rem'} fontFamily={'span'}>Si se ha registrado previamente, cargue su archivo de configuración.</Text>
            <Stack justifyContent={'center'} align={'center'} mx='auto'>
              <UploadFile open={isOpen} setOpen={setIsOpen} />
            </Stack>
          </Stack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
