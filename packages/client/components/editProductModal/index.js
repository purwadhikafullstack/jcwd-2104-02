import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
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
import { api_origin } from '../../constraint';

function EditProductModal({
  currentProduct,
  editProductButton,
  setEditProductButton,
  categoriesLists,
}) {
  const [productStock, setProductStock] = useState(currentProduct.productStock);
  const [loading, setLoading] = useState(false);
  const [productImageFile, setProductImageFile] = useState();
  const [productInputs, setProductInputs] = useState({
    categoryInfo: `${currentProduct.category_lists_id}=-=${currentProduct.category}`,
    description: currentProduct.description,
    packageType: currentProduct.packageType,
    productImage: currentProduct.productImage,
    productName: currentProduct.productName,
    productPrice: currentProduct.productPrice,
    productStock: currentProduct.productStock,
    defaultQuantity: currentProduct.defaultQuantity,
    servingType: currentProduct.servingType,
  });
  const [newProductImage, setNewProductImage] = useState(
    currentProduct.productImage,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (editProductButton) {
      onOpen();
    } else if (!editProductButton) {
      onClose();
    }

    setProductInputs({
      categoryInfo: `${currentProduct.category_lists_id}=-=${currentProduct.category}`,
      description: currentProduct.description,
      packageType: currentProduct.packageType,
      productImage: currentProduct.productImage,
      productName: currentProduct.productName,
      productPrice: currentProduct.productPrice,
      productStock,
      defaultQuantity: currentProduct.defaultQuantity,
      servingType: currentProduct.servingType,
    });
    setNewProductImage(currentProduct.productImage);
  }, [editProductButton, productStock]);

  // console.log({ currentProduct });

  useEffect(() => {
    setProductStock(currentProduct.productStock);
  }, [currentProduct]);

  // console.log({ productInputs, currentProduct });

  async function updateProductClick() {
    try {
      setLoading(true);

      if (Object.values(productInputs).includes('' || undefined)) {
        alert('tolong isi semua');
        setLoading(false);
        return;
      }

      const productImageFileBody = new FormData();

      productImageFileBody.append('productImageFile', productImageFile);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const resAddProduct = await axiosInstance.patch(
        `/products/productsUpdate/${currentProduct.product_id}`,
        {
          productInputs,
          currentProduct,
        },
      );

      // console.log({ resAddProduct });

      const extName = productInputs.productImage.split('.');

      const resAddProductImage = await axiosInstance.post(
        `/products/newProductImage/${resAddProduct.data.resUpdateProduct.product_id}.${extName[1]}`,
        productImageFileBody,
        config,
      );

      if (resAddProduct) {
        console.log({ resAddProduct, extName, resAddProductImage });
        setLoading(false);
        setEditProductButton(false);
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setEditProductButton(false);
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

  function handleImageChange(event) {
    setNewProductImage(URL.createObjectURL(event.target.files[0]));
    setProductInputs({
      ...productInputs,
      productImage: event.target.files[0].name,
    });
    setProductImageFile(event.target.files[0]);
  }

  const handleChange = (prop) => (event) => {
    setProductInputs({ ...productInputs, [prop]: event.target.value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setEditProductButton(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {currentProduct.productName}</ModalHeader>
        <ModalBody>
          <p>Foto</p>
          <div className="w-[35%] my-[.5vh] hover:cursor-pointer">
            <label className="hover:cursor-pointer" htmlFor="productImageInput">
              <Image
                unoptimized
                style={{ borderRadius: '.3vw' }}
                src={
                  newProductImage.includes(api_origin)
                    ? newProductImage
                    : api_origin + newProductImage
                }
                width={1}
                height={1}
                layout="responsive"
                loader={() => {
                  return newProductImage.includes(api_origin)
                    ? newProductImage
                    : api_origin + newProductImage;
                }}
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
            {/* <Button
              colorScheme="linkedin"
              variant="ghost"
              disabled={productStock <= 1}
              onClick={() => {
                setProductStock(parseInt(productStock) - 1);
              }}
            >
              {'<'}
            </Button> */}

            <Input
              disabled
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

            {/* <Button
              colorScheme="linkedin"
              variant="ghost"
              disabled={productStock >= 9999}
              onClick={() => {
                setProductStock(parseInt(productStock) + 1);
              }}
            >
              {'>'}
            </Button> */}
          </div>
          <div className="flex w-[50%] justify-end">
            <Button
              style={{ width: '40%', marginRight: '.3vw' }}
              isLoading={loading}
              colorScheme="linkedin"
              onClick={() => {
                updateProductClick();
              }}
            >
              Update
            </Button>
            <Button
              style={{ width: '40%' }}
              onClick={() => {
                setEditProductButton(false);
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
              Batal
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditProductModal;
