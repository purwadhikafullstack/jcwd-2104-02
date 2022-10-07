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
  VStack,
  Box,
} from '@chakra-ui/react';
import axiosInstance from '../../src/config/api';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

function AddFormulaModal({
  addFormulaButton,
  setAddFormulaButton,
  allProducts,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(0);
  const [option, setOption] = useState();
  const [id, setId] = useState();
  const [tempFormula, setTempFormula] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();

  useEffect(() => {
    checkSameProduct();
    if (addFormulaButton) {
      onOpen();
    } else if (!addFormulaButton) {
      onClose();
    }
  }, [addFormulaButton, quantity, tempFormula, option]);

  const onHandleNameChange = (e) => {
    setName(e.target.value);
  };

  const onHandleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const onHandleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  function checkSameProduct() {
    tempFormula.forEach((product) => {
      console.log(option == product.productName);
      if (option == product.productName) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    });
  }

  const onAddClick = () => {
    {
      setTempFormula([
        ...tempFormula,
        {
          productName: option,
          quantity,
        },
      ]),
        setQuantity(0),
        setOption('');
    }
  };

  async function onSaveClick() {
    try {
      setLoading(true);
      console.log(name, tempFormula);
      const body = { productName: name, formula: tempFormula };
      console.log(body);
      const res = await axiosInstance.post('/products/concoction', body);
      if (res) {
        toast({
          title: 'Concoction Created!',
          description: res.data.message,
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        setAddFormulaButton(false);
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setAddFormulaButton(false);
    }
  }

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
            <Text ml={10} mr={2} my={2} fontSize="md" fontWeight={'semibold'}>
              {tempForm.productName}
            </Text>
            <Text fontSize="s">x{tempForm.quantity}</Text>
            <Button
              variant={'ghost'}
              colorScheme={'red'}
              isLoading={loading}
              onClick={() => {
                let tempArray = tempFormula;
                tempArray.splice(index, 1);
                setTempFormula(tempArray);
                setDeleted(deleted + 1);
              }}
            >
              x
            </Button>
          </HStack>
        </>
      );
    });
  }
  // console.log( name, option, quantity);
  console.log(tempFormula, name);

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
          setDeleted(0), setName('');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Obat Racikan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              mb={2}
              type={'text'}
              placeholder="Nama Obat"
              onChange={onHandleNameChange}
            ></Input>
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

          <Box rounded={10} border="1px" borderColor="gray.100" py={2}>
            <VStack>
              {tempFormulaMap()}
              {tempFormula.length ? (
                <Button
                  height={'20px'}
                  width={'110px'}
                  variant={'ghost'}
                  fontSize={'small'}
                  fontWeight={'normal'}
                  colorScheme={'red'}
                  isLoading={loading}
                  onClick={() => {
                    setTempFormula([]);
                  }}
                >
                  Hapus Semua
                </Button>
              ) : (
                <></>
              )}
            </VStack>
          </Box>

          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme="red"
              mr={3}
              onClick={() => {
                setAddFormulaButton(false), setTempFormula([]), setQuantity(0);
                setDeleted(0), setName('');
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
                    {
                      productName: option,
                      quantity,
                    },
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
                isDisabled={disabled}
                onClick={onAddClick}
              >
                Tambah
              </Button>
            )}
            {name && tempFormula.length ? (
              <Button
                colorScheme="teal"
                variant="outline"
                isLoading={loading}
                onClick={onSaveClick}
              >
                Simpan
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                variant="outline"
                isLoading={loading}
                isDisabled
                onClick={() => {}}
              >
                Simpan
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
export default AddFormulaModal;
