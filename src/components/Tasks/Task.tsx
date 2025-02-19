import { Delete, Task as TaskProps } from "@/types/API";
import { Box, Button, Field, Flex, Text } from "@chakra-ui/react";
import { MdDeleteForever, MdDone, MdModeEdit } from "react-icons/md";
import { useTaskActions } from "./useTasks";
import { useState } from "react";
import ConfirmActions from "../Modal/ConfirmActions";
import EditTask from "../Modal/EditTask";

export default function Task(task: TaskProps) {
    const { deleteTask, completeTask } = useTaskActions()
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState<Delete>({
        title: null,
        status: false
    })
    const [openEdit, setOpenEdit] = useState(false)

    const date = task.date_limit ? new Date(task.date_limit) : null
    const format = date?.toLocaleDateString('es-ES', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    const handleDelete = () => {
        setOpenConfirmation({
            title: 'Eliminar tarea',
            status: true,
            description: `¿Desea eliminar la tarea? ${task.taskname}`
        })
    }

    const handleComplete = () => {
        try {
            completeTask(task.id)
        } catch (error) {
            console.log(error)
        }
    }

    const closeAction = () => {
        setOpenConfirmation({ ...openConfirmation, status: !openConfirmation.status })
    }

    const confirmAction = () => {
        setDeleteConfirmation(!deleteConfirmation)
        closeAction()
        deleteTask(task.id)
    }

    return (
        <>
            <Box as={'section'} key={task.id} flexDirection={'column'} border={'1px'} borderColor={'#ccc'} borderStyle={'groove'} px={4} py={2} w='100%'>

                <Flex as={'header'} justifyContent={'space-between'}>
                    <Box>
                        <Text>Tarea:</Text>
                        <Text fontWeight={'bold'} fontSize={'1.2rem'}>{task.taskname}</Text>
                    </Box>
                    <Box textAlign={'right'}>
                        <Text as='span' fontSize={'12px'}>{task.status ? 'Completado' : 'Pendiente'}</Text>
                        {task.date_limit && <Text>V: {format}</Text>}
                    </Box>
                </Flex>
                <Box as={'main'} mt={2}>
                    <Text>{task.description}</Text>
                </Box>
                <Flex as={'footer'} justifyContent={'flex-end'} gap={2} mt={2} >
                    <Button disabled={task.status} onClick={handleComplete} size={'xs'} variant={'outline'} colorScheme={'green'} color={'green.500'} borderColor={'green.500'} _hover={{ bg: 'green.500', color: 'white' }}>
                        <MdDone />
                    </Button>
                    <Button disabled={task.status} onClick={() => setOpenEdit(true)} size={'xs'} variant={'outline'} colorScheme={'blue'} color={'blue.500'} borderColor={'blue.500'} _hover={{ bg: 'blue.500', color: 'white' }}>
                        <MdModeEdit />
                    </Button>
                    <Button onClick={handleDelete} size={'xs'} variant={'outline'} colorScheme={'red'} color={'red.500'} borderColor={'red.500'} _hover={{ bg: 'red.500', color: 'white' }}>
                        <MdDeleteForever />
                    </Button>
                </Flex >
            </Box >
            <Box hidden>
                {openConfirmation.status &&
                    <ConfirmActions open={openConfirmation} setOpen={setOpenConfirmation}>
                        <Button onClick={closeAction}>Cancelar</Button>
                        <Button onClick={confirmAction}>Confirmar</Button>
                    </ConfirmActions>
                }
                {openEdit && <EditTask open={openEdit} setOpen={setOpenEdit} task={task} ></EditTask>}
            </Box>
        </>
    )
}