import { Box, Button, Input, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { IoMdSend } from "react-icons/io"
import { FormValues } from "../../types/userForm"
import { Field } from "../ui/field"
import { api } from "@/API/config"

type Props = {
    setIsOpen: (value: boolean) => void
}

export default function UserForm({ setIsOpen }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

    const onSubmit = handleSubmit((data) => {
        setIsLoading(true)
        api.post('login', { username: data.name }, {
            withCredentials: true
        }).then(() => {
            return setIsOpen(false)
        })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    })
    return (
        <form onSubmit={onSubmit}>
            <Stack gap={4} align={"flex-center"} maxW={"sm"} mt={4} mx={"auto"}>
                <Field label="Nombre" required invalid={!!errors.name} errorText={errors.name?.message} >
                    <Input variant={"subtle"} bg={'white'} color={'black'} placeholder="Nombre de usuario" {...register('name', { required: 'El nombre es requerido' })} />
                </Field>
                <Box>
                    <Button type="submit" colorPalette={'green'}>
                        {isLoading ? 'Cargando...' : 'Enviar'}
                        {isLoading ? <AiOutlineLoading3Quarters style={{
                            animation: 'spin 1s linear infinite'
                        }} /> : <IoMdSend />}
                    </Button>
                </Box>
            </Stack>
        </form>
    )
}