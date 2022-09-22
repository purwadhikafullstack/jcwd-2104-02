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
} from '@chakra-ui/react';
import Image from 'next/image';
import axiosInstance from '../../src/config/api';

function AddProductModal({
  addProductButton,
  setAddProductButton,
  categoriesLists,
}) {
  const [productStock, setProductStock] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [productImageFile, setProductImageFile] = useState();
  const [newProductImage, setNewProductImage] = useState(
    '/admin/TambahProduk.svg',
  );
  const [productInputs, setProductInputs] = useState({
    categoryInfo: '',
    description: '',
    packageType: '',
    productImage: '',
    productName: '',
    productPrice: '',
    productStock: '',
    defaultQuantity: '',
    servingType: '',
  });

  useEffect(() => {
    if (addProductButton) {
      onOpen();
    } else if (!addProductButton) {
      onClose();
    }

    setProductInputs({ ...productInputs, productStock });
  }, [addProductButton, loading, productStock]);

  const handleChange = (prop) => (event) => {
    setProductInputs({ ...productInputs, [prop]: event.target.value });
  };

  function handleImageChange(event) {
    setNewProductImage(URL.createObjectURL(event.target.files[0]));
    setProductInputs({
      ...productInputs,
      productImage: event.target.files[0].name,
    });
    setProductImageFile(event.target.files[0]);
  }

  async function saveProductButtonClick() {
    try {
      setLoading(true);

      if (Object.values(productInputs).includes('')) {
        alert('tolong isi semua');
        setLoading(false);
        return;
      }

      const productImageFileBody = new FormData();

      productImageFileBody.append('productImageFile', productImageFile);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const resAddProduct = await axiosInstance.post(
        '/products/newProduct',
        productInputs,
      );

      const extName = productInputs.productImage.split('.');

      const resAddProductImage = await axiosInstance.post(
        `/products/newProductImage/${resAddProduct.data.resCreateProduct.product_id}.${extName[1]}`,
        productImageFileBody,
        config,
      );

      if (resAddProduct) {
        console.log({ resAddProduct, resAddProductImage });
        setLoading(false);
        setAddProductButton(false);
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setAddProductButton(false);
    }
  }

  function categoriesMap() {
    return categoriesLists.map((category) => {
      return (
        <option
          key={category.category_lists_id}
          value={`${category.category_lists_id}=-=${category.category}`}
        >
          {category.category}
        </option>
      );
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setAddProductButton(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Produk</ModalHeader>
        <ModalBody>
          <p>Foto</p>
          <div className="w-[35%] my-[.5vh] hover:cursor-pointer">
            <label className="hover:cursor-pointer" htmlFor="productImageInput">
              <Image
                style={{ borderRadius: '.3vw' }}
                src={newProductImage}
                width={1}
                height={1}
                layout="responsive"
              />
            </label>
          </div>
          <input
            onChange={handleImageChange}
            className="hidden"
            id="productImageInput"
            type="file"
          />
          <Input
            value={productInputs.productName}
            onChange={handleChange('productName')}
            size="lg"
            marginY=".5vh"
            placeholder="Nama Produk"
          />
          <div className="flex justify-between my-[.5vh]">
            <Select
              value={productInputs.categoryInfo}
              onChange={handleChange('categoryInfo')}
              size="lg"
              width={'55%'}
              placeholder="Kategori"
            >
              {categoriesMap()}
            </Select>
            <Button size="lg">Tambah +</Button>
          </div>
          <Input
            value={productInputs.productPrice}
            onChange={handleChange('productPrice')}
            size="lg"
            marginY=".5vh"
            placeholder="Harga"
          />
          <Input
            value={productInputs.packageType}
            onChange={handleChange('packageType')}
            size="lg"
            marginY=".5vh"
            placeholder="Kemasan"
          />
          <Input
            value={productInputs.servingType}
            onChange={handleChange('servingType')}
            size="lg"
            marginY=".5vh"
            placeholder="Unit Satuan"
          />
          <Input
            value={productInputs.defaultQuantity}
            onChange={handleChange('defaultQuantity')}
            size="lg"
            marginY=".5vh"
            placeholder="Jumlah Per Kemasan"
          />
          <Textarea
            onChange={handleChange('description')}
            value={productInputs.description}
            placeholder="Description"
            size="lg"
            height="11vh"
            resize="none"
          />
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <div className="flex w-[50%] justify-evenly">
            <Button
              colorScheme="linkedin"
              variant="ghost"
              disabled={productStock <= 1}
              onClick={() => {
                setProductStock(parseInt(productStock) - 1);
              }}
            >
              {'<'}
            </Button>

            <Input
              value={productStock}
              onChange={(event) => {
                if (
                  parseInt(event.target.value) <= 0 ||
                  !parseInt(event.target.value)
                ) {
                  alert('Minimal produk 1');
                  setProductStock(1);
                  return;
                } else if (parseInt(event.target.value) > 9999) {
                  alert('Max stock reached');
                  setProductStock(9999);
                  return;
                }
                setProductStock(event.target.value);
              }}
              className="w-[2.5vw] mx-[1vw] flex items-center justify-center bg-gray-200 rounded-[.2vw]"
            />

            <Button
              colorScheme="linkedin"
              variant="ghost"
              disabled={productStock >= 9999}
              onClick={() => {
                setProductStock(parseInt(productStock) + 1);
              }}
            >
              {'>'}
            </Button>
          </div>
          <div className="flex w-[50%] justify-evenly">
            <Button
              isLoading={loading}
              colorScheme="linkedin"
              onClick={() => {
                saveProductButtonClick();
              }}
            >
              Simpan
            </Button>
            <Button
              onClick={() => {
                setAddProductButton(false);
                setProductInputs({
                  categoryInfo: '',
                  description: '',
                  packageType: '',
                  productImage: '',
                  productName: '',
                  productPrice: '',
                  productStock: '',
                  defaultQuantity: '',
                  servingType: '',
                });
              }}
              variant="ghost"
            >
              Gajadi
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddProductModal;
