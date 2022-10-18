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
<<<<<<< HEAD
=======
  const [amount, setAmount] = useState(0);
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
<<<<<<< HEAD

  function checkSameProduct() {
    tempFormula.forEach((product) => {
      console.log(option == product.productName);
=======
  const onHandleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  function checkSameProduct() {
    tempFormula.forEach((product) => {
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
<<<<<<< HEAD
      console.log(name, tempFormula);
      const body = { productName: name, formula: tempFormula };
      console.log(body);
=======
      const body = { productName: name, formula: tempFormula, amount: amount };
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
<<<<<<< HEAD
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setAddFormulaButton(false);
=======
        setTempFormula([]), setQuantity(0);
        setDeleted(0), setName(''), setAmount(0);
      }
    } catch (error) {
      toast({
        title: 'Create Concoction Failed!',
        description: error.response.data?.message
          ? error.response.data.message
          : error.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log({ Error: error.response.data });
      setLoading(false);
      setAddFormulaButton(false);
      setTempFormula([]), setQuantity(0);
      setDeleted(0), setName(''), setAmount(0);
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
<<<<<<< HEAD
  // console.log( name, option, quantity);
  console.log(tempFormula, name);

  function productNameMap() {
    return allProducts.map((product) => {
      return (
        <option key={product.product_id} value={`${product.productName}`}>
          {product.productName}
        </option>
      );
=======

  function productNameMap() {
    return allProducts?.map((product) => {
      if (!product.formula) {
        return (
          <option key={product.product_id} value={`${product.productName}`}>
            {product.productName}
          </option>
        );
      }
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
    });
  }
  {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setAddFormulaButton(false), setTempFormula([]), setQuantity(0);
<<<<<<< HEAD
          setDeleted(0), setName('');
=======
          setDeleted(0), setName(''), setAmount(0);
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
<<<<<<< HEAD
            <HStack>
              <Select
                name="productName"
                placeholder="Select Medicine"
=======
            <HStack my={3}>
              <Text>Jumlah Racikan:</Text>
              {amount == 0 ? (
                <Button
                  colorScheme={'linkedin'}
                  variant={'ghost'}
                  isDisabled
                  onClick={() => {
                    setAmount(amount - 1);
                  }}
                >
                  -
                </Button>
              ) : (
                <Button
                  colorScheme={'linkedin'}
                  variant={'ghost'}
                  onClick={() => {
                    setAmount(amount - 1);
                  }}
                >
                  -
                </Button>
              )}

              <Input
                placeholder="Jumlah Racikan"
                type={'text'}
                width={'70px'}
                value={amount}
                onChange={onHandleAmountChange}
              ></Input>
              <Button
                colorScheme={'linkedin'}
                variant={'ghost'}
                onClick={() => {
                  setAmount(amount + 1);
                }}
              >
                +
              </Button>
            </HStack>
            <HStack>
              <Select
                name="productName"
                placeholder="Pilih Obat"
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
                onChange={onHandleOptionChange}
              >
                {productNameMap()}
              </Select>
              {quantity == 0 ? (
                <Button
<<<<<<< HEAD
=======
                  colorScheme={'linkedin'}
                  variant={'ghost'}
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
                  isDisabled
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </Button>
              ) : (
                <Button
<<<<<<< HEAD
=======
                  colorScheme={'linkedin'}
                  variant={'ghost'}
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </Button>
              )}

              <Input
<<<<<<< HEAD
                name="quantity"
=======
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
                type={'text'}
                width={'70px'}
                value={quantity}
                onChange={onHandleQuantityChange}
              ></Input>
              <Button
<<<<<<< HEAD
=======
                colorScheme={'linkedin'}
                variant={'ghost'}
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
<<<<<<< HEAD
                setDeleted(0), setName('');
=======
                setDeleted(0), setName(''), setAmount(0);
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
<<<<<<< HEAD
            {name && tempFormula.length ? (
=======
            {name && tempFormula.length && amount > 0 ? (
>>>>>>> 47a43d9a96d04fa76ec05ed0913496b318c96594
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
