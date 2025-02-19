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
import "react-datepicker/dist/react-datepicker.css"
import { Controller, useForm } from "react-hook-form"

import { Task } from '@/types/API'
import { useEffect, useState } from "react"
import { useTaskActions } from "../Tasks/useTasks"

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void
    task: Task
}

const dateFormat = "yyyy-MM-dd HH:mm:ss";

export default function EditTask({ open, setOpen, task }: Props) {
    const { editTask } = useTaskActions()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<Task>({
        defaultValues: {
            id: task.id,
            date_limit: task.date_limit ? new Date(task.date_limit) : null
        }
    })

    useEffect(() => {
        reset({
            taskname: task.taskname,
            date_limit: task.date_limit ? new Date(task.date_limit) : null
        })
    }, [task, reset])

    const onSubmit = handleSubmit((data) => {
        setIsLoading(true)

        const formattedDate = data.date_limit ? format(data.date_limit, dateFormat) : null

        const formData = {
            ...data,
            date_limit: formattedDate
        }

        editTask(formData)
            .then(() => setIsLoading(false))
            .catch(() => { })
            .finally(() => setOpen(false))
    })

    const onClose = () => {
        reset()
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
            onEscapeKeyDown={() => setOpen(false)}
            onInteractOutside={() => setOpen(false)}
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
                <DialogCloseTrigger onClick={() => setOpen(false)} />
                <DialogHeader>
                    <DialogTitle color={'white'} fontWeight={'bold'} fontSize={'2rem'}>Editar Tarea</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={onSubmit}>
                        <VStack gap={"5"} width={"full"} color={"white"}  >
                            <Input hidden {...register('id')} defaultValue={task.id} />
                            <Field label="Nombre" required>
                                <Input {...register('taskname', { required: 'El nombre es requerido' })} defaultValue={task.taskname} variant={"subtle"} color={'black'} />
                            </Field>
                            <Field label="Detalles">
                                <Textarea placeholder="Detalles" {...register('description')} defaultValue={task.description} variant={"subtle"} color={'black'} minBlockSize={"4rem"} maxBlockSize={'15rem'} />
                            </Field>
                            <Field label="Fecha máxima">
                                <Box
                                    border="1px solid"
                                    borderColor="gray.300"
                                    borderRadius="md"
                                    p={2}
                                    background="white"
                                    _hover={{ borderColor: "blue.500" }}
                                    color={"black"}
                                >
                                    <Controller
                                        control={control}
                                        name="date_limit"
                                        render={({ field }) => (
                                            <DatePicker
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
                            <Button type="button" onClick={onClose} variant={"solid"} colorScheme={'gray'} disabled={isLoading}>Cancelar</Button>
                            <Button type="submit" variant={"solid"} colorScheme={'blue'} bg={'blue.500'} disabled={isLoading}>
                                {isLoading ? <Spinner /> : "Guardar"}
                            </Button>
                        </Flex>
                    </form>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}
