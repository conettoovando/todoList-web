import {
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-upload"
import useTodos from "@/providers/useTodos"
import useUsers from "@/providers/useUsers"
import React from "react"
import { HiUpload } from "react-icons/hi"
import { DefaultButton } from "../Button/DefaultButton"
import { getAuthData } from "../Tasks/useTasks"
import exportData from "../user/exportData"

type Props = {
    open?: boolean,
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const UploadFile = ({ open, setOpen }: Props) => {
    const { setIsAuthenticated } = useUsers()
    const { setTasks } = useTodos()
    const { importData } = exportData()

    const handleUpload = async (file: any) => {
        const response = await importData({ file })

        if (response?.status == 200) {
            if (setOpen) setOpen(!open)
            getAuthData({ setIsAuthenticated, setTasks })
        }

    }

    return (
        <FileUploadRoot maxFiles={1} accept={'text/plain'} onFileAccept={file => handleUpload(file)} >
            <FileUploadTrigger asChild >
                <DefaultButton
                    props={{ bgColor: 'blue.500', _hover: { bgColor: 'blue.700' } }}
                >
                    Importar datos
                    <HiUpload />
                </DefaultButton>
            </FileUploadTrigger>
        </FileUploadRoot >
    )
}

export default UploadFile