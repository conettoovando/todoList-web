import useTodos from "@/providers/useTodos";
import { Box, Button, Container, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { MdOutlineTask } from "react-icons/md";
import CreateTask from "../Modal/CreateTask";
import Task from "./Task";

export default function Tasks() {
    const [openCreateTask, setOpenCreateTask] = React.useState(false)
    const { tasks } = useTodos()

    return (
        <Container
            maxW={'full'}
            gap={6}
            direction={'column'}
            borderTop={'1px'}
            borderTopStyle={'outset'}
            borderColor={'#ccc'}
            m={0}
            paddingY={2}
            paddingX={0}
            textAlign={'left'}
        >
            <Box dir="row" gap={4}>
                <Button
                    rounded={'full'}
                    px={6}
                    colorScheme={'orange'}
                    bg={'orange.400'}
                    _hover={{ bg: 'orange.500' }}
                    onClick={() => setOpenCreateTask(!openCreateTask)}
                >
                    <MdOutlineTask />
                    Nueva tarea
                </Button>
            </Box>
            {/* <Box direction={'row'} gap={4} mt={2}>
                <Button size={'sm'} borderRadius={'full'} bg={'gray.500'} color={'whiteAlpha.800'}>Sort by date</Button>
            </Box> */}
            <Grid mt={4} gap={4} templateColumns="repeat(2, 1fr)">
                {tasks.map((t) => (
                    <GridItem key={t.id}>
                        <Task key={t.id} {...t} />
                    </GridItem>
                ))}
            </Grid>
            {openCreateTask && <CreateTask open={openCreateTask} setOpen={setOpenCreateTask}></CreateTask>}
        </Container>
    )
}

