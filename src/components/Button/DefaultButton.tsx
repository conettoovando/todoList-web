import { Button } from "@chakra-ui/react"
import React from "react"

type Props = {
    onClick?: () => void,
    children: React.ReactNode
    props?: any
}

export function DefaultButton({ onClick, children, props }: Props) {
    return (
        <Button
            rounded={'md'}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    )
}