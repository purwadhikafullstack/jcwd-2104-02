import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  ModalCloseButton,
  Text,
  HStack,
  Flex,
} from '@chakra-ui/react';
import Image from 'next/image';
import axiosInstance from '../../src/config/api';
import { useRouter } from 'next/router';

function AddFormulaModal({
  addFormulaButton,
  setAddFormulaButton,
  allProducts,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(0);
  const [option, setOption] = useState();
  const [tempFormula, setTempFormula] = useState([]);

  useEffect(() => {
    if (addFormulaButton) {
      onOpen();
    } else if (!addFormulaButton) {
      onClose();
    }
  }, [addFormulaButton, quantity]);

  const onHandleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const onHandleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  function tempFormulaMap() {
    return tempFormula.map((tempForm, index) => {
      return (
        <>
          <HStack
            spacing={2}
            bg={'gray.100'}
            border="1px"
            borderColor="gray.100"
            my={1}
            mx={6}
            rounded={6}
          >
            <Text ml={10} mr={2} my={2} fontSize="md">
              {tempForm.productName}
            </Text>
            <Text fontSize="xs">x{tempForm.quantity}</Text>
            <Button
              variant={'ghost'}
              colorScheme={'red'}
              //   onClick={tempFormula.splice(index, 1)}
            >
              x
            </Button>
          </HStack>
        </>
      );
    });
  }
  console.log(option, quantity);
  console.log(tempFormula);

  function productNameMap() {
    return allProducts.map((product) => {
      return (
        <option key={product.product_id} value={`${product.productName}`}>
          {product.productName}
        </option>
      );
    });
  }
  {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setAddFormulaButton(false), setTempFormula([]), setQuantity(0);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Obat Racikan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Select
                name="productName"
                placeholder="Select Medicine"
                onChange={onHandleOptionChange}
              >
                {productNameMap()}
              </Select>
              {quantity == 0 ? (
                <Button
                  isDisabled
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </Button>
              )}

              <Input
                name="quantity"
                type={'text'}
                width={'70px'}
                value={quantity}
                onChange={onHandleQuantityChange}
              ></Input>
              <Button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </HStack>
          </ModalBody>
          {tempFormulaMap()}
          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="red"
              mr={3}
              onClick={() => {
                setAddFormulaButton(false), setTempFormula([]), setQuantity(0);
              }}
            >
              Batal
            </Button>
            {quantity == 0 || option == '' ? (
              <Button
                mr={2}
                isDisabled
                colorScheme="linkedin"
                variant="outline"
                onClick={() => {
                  setTempFormula([
                    ...tempFormula,
                    { productName: option, quantity },
                  ]);
                }}
              >
                Tambah
              </Button>
            ) : (
              <Button
                mr={2}
                colorScheme="linkedin"
                variant="outline"
                onClick={() => {
                  setTempFormula([
                    ...tempFormula,
                    { productName: option, quantity },
                  ]),
                    setQuantity(0),
                    setOption('');
                }}
              >
                Tambah
              </Button>
            )}
            <Button colorScheme="teal" variant="outline" onClick={() => {}}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
export default AddFormulaModal;
