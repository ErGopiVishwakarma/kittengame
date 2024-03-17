import React, { useEffect } from "react";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

function PopupMessage(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, []);

    const closeButton = () => {
        onClose()
        props?.setPopup()
    }

    return (
        <Box>
            <AlertDialog
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent
                 w={'200px'}
                 height={'200px'}
                >
                    <Flex direction={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} w={'100%'} height={'100%'}>
                        <Text fontSize={'22px'}>{props?.popupData?.text}</Text>
                        <Button
                        padding={'4px'} height={'35px'} outline={'none'} border={'1px solid black'}
                            onClick={closeButton}
                        >
                            {props?.popupData?.buttonText}
                        </Button>
                    </Flex>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    );
}

export default PopupMessage;