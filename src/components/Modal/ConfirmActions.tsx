import {
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogCloseTrigger
} from "@/components/ui/dialog"
import { Delete } from "@/types/API"
import { DialogFooter, Text } from "@chakra-ui/react"
import React from 'react'

type Props = {
    open: Delete,
    setOpen: React.Dispatch<React.SetStateAction<Delete>>,
    children: React.ReactNode
}

export default function ConfirmActions({ open, children, setOpen }: Props) {
    return (
        <DialogRoot
            open={open.status}
            closeOnEscape
            closeOnInteractOutside
            onEscapeKeyDown={() => setOpen({ ...open, status: !open.status })}
            onInteractOutside={() => setOpen({ ...open, status: !open.status })}
        >
            <DialogContent>
                <DialogHeader textAlign={'center'}>
                    <DialogTitle>{open.title}</DialogTitle>
                    <DialogCloseTrigger onClick={() => setOpen({ ...open, status: !open.status })} />
                </DialogHeader>
                <DialogBody textAlign={'center'}>
                    <Text>{open.description}</Text>
                </DialogBody>
                <DialogFooter >{children}</DialogFooter>
            </DialogContent>
        </DialogRoot >
    )
}