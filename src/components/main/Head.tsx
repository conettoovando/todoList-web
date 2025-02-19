import { Flex, Heading, Text } from "@chakra-ui/react";
import { TiExportOutline } from "react-icons/ti";
import { DefaultButton } from "../Button/DefaultButton";
import Datafunctions from "../user/exportData";
import UploadFile from "./uploadFile";

export default function MainHead() {
    const { exportData } = Datafunctions()


    return (
        <>
            <Heading
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}
            >
                Organizar tus tareas {' '}
                <Text as={'span'} color={'orange.400'}>
                    Es Sencillo
                </Text>
            </Heading>
            <Flex gap={4}>
                <DefaultButton
                    onClick={exportData}
                >
                    Exportar datos
                    <TiExportOutline />
                </DefaultButton>
                <UploadFile />
            </Flex>
        </>
    )
}