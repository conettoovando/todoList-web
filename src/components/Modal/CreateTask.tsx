import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Box, Button, Flex, Input, Spinner, Textarea, VStack } from "@chakra-ui/react"

import { format } from 'date-fns'
import DatePicker from "react-datepicker"
import './DatePicker.css'
import { Controller, useForm } from "react-hook-form"

import { Task } from '@/types/API'
import { useState } from "react"
import { useTaskActions } from "../Tasks/useTasks"

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function CreateTask({ open, setOpen }: Props) {
    const { createTask } = useTaskActions()
    const [isLoading, setIsLogadin] = useState(false)
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<Task>()

    const onSubmit = handleSubmit((data) => {
        setIsLogadin(true)

        const formattedDate = data.date_limit ? format(data.date_limit, 'yyyy-MM-dd HH:mm:ss') : null

        const formData = {
            ...data,
            date_limit: formattedDate
        }

        createTask(formData)
            .then(() => setIsLogadin(false))
            .catch(() => { })
            .finally(() => setOpen(false))
    })

    const onClose = () => {
        reset();
        setOpen(false)
    }

    return (
        <DialogRoot
            modal
            defaultOpen={open}
            size={'lg'}
            placement={'center'}
            closeOnEscape
            closeOnInteractOutside

            onEscapeKeyDown={() => setOpen(!open)}
            onInteractOutside={() => setOpen(!open)}
            scrollBehavior={"outside"}
        >
            <DialogBackdrop />
            <DialogTrigger />
            <DialogContent
                bg={'#1A202C'}
                minBlockSize={"min-content"}
                maxH={"max-content"}
                textAlign={'center'}
                outline={'none'}
                borderWidth={1}
                borderStyle={'solid'}
                borderColor={'gray.700'}
                borderRadius={'2xl'}
            >
                <DialogCloseTrigger onClick={() => setOpen(!open)} />
                <DialogHeader>
                    <DialogTitle color={'white'} fontWeight={'bold'} fontSize={'2rem'}>Crear Tarea</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={onSubmit}>
                        <VStack gap={"5"} width={"full"} color={"white"}  >
                            <Field label="Nombre" required>
                                <Input {...register('taskname', { required: 'El nombre es requerido' })} variant={"subtle"} color={'black'} bg={'white'} />
                            </Field>
                            <Field label="Detalles" >
                                {/* {Crear y Registrar el detalle de la tarea en la API} */}
                                <Textarea bg={'white'} placeholder="Detalles" {...register('description')} variant={"subtle"} color={'black'} minBlockSize={"4rem"} maxBlockSize={'15rem'} />
                            </Field>
                            <Field label="Fecha maxima" >
                                <Box
                                    border="1px solid"
                                    borderColor="gray.300"
                                    borderRadius="md"
                                    p={2}
                                    bg={'white'}
                                    _hover={{ borderColor: "blue.500" }}
                                    color={"black"}
                                >
                                    <Controller
                                        control={control}
                                        name="date_limit"
                                        render={({ field }) => (
                                            <DatePicker
                                                wrapperClassName="datePicker"
                                                className="datePicker"
                                                {...field}
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="Selecciona una fecha"
                                                minDate={new Date()}

                                            />
                                        )}
                                    />
                                </Box>
                                {errors.date_limit && <p style={{ color: 'red' }}>{errors.date_limit.message}</p>}
                            </Field>
                        </VStack>
                        <Flex w={'full'} justifyContent={'flex-end'} gap={4} mt={4}>
                            <Button type="submit" variant={"solid"} colorScheme={'blue'} bg={'blue.500'} onClick={onClose} disabled={isLoading}>Cancelar</Button>
                            <Button type="submit" variant={"solid"} colorScheme={'blue'} bg={'blue.500'} disabled={isLoading}>{isLoading ? <Spinner /> : "enviar"}</Button>
                        </Flex>
                    </form>
                </DialogBody>
            </DialogContent>
        </DialogRoot >
    )
}