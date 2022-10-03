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

function AddCategoryModal({addCategoryButton, setAddCategoryButton}) {
  const [category, setCategory] = useState({ category: '', categoryImage: '' });
  const [categoryImage, setCategoryImage] = useState();
  const [newProductImage, setNewProductImage] = useState(
      '/admin/TambahProduk.svg',
      );
      
      const { isOpen, onOpen, onClose } = useDisclosure();
//    console.log(categoryImage)

  useEffect(() => {
    if (addCategoryButton) {
      onOpen();
    } else if (!addCategoryButton) {
      onClose();
    }
    setCategory({ ...category});
  }, [addCategoryButton])


  const handleChange = (prop) => (event) => {
    setCategory({ ...category, [prop]: event.target.value });
  };


function handleImageChange(event) {
  setNewProductImage(URL.createObjectURL(event.target.files[0]));
  setCategory({
    ...category,
    categoryImage: event.target.files[0].name,
  });
  setCategoryImage(event.target.files[0]);
}

  const saveCategoryButtonClick = async () => {
    try {
      const body = new FormData();

      body.append('categoriesImage', categoryImage);

    //   const config = {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   };

      const resAddCategory = await axiosInstance.post(
        '/categoriesLists',
        category,
      );
      const extName = category.categoryImage.split('.');
      //   console.log(extName)
      
      // console.log(resAddCategory.data.data.newCategories.category_lists_id)

      const resAddCategoryImage = await axiosInstance.post(
          `/categoriesLists/upload/${resAddCategory.data.data.newCategories.category_lists_id}.${extName[1]}`,
          body,
          );

          alert(resAddCategory.data.message)
      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setAddCategoryButton(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Category</ModalHeader>
        <ModalBody>
          <p>Foto</p>
          <div className="w-[35%] my-[.5vh] hover:cursor-pointer">
            <label
              className="hover:cursor-pointer"
              htmlFor="categoryImageInput"
            >
              <Image
                unoptimized
                src={newProductImage}
                style={{ borderRadius: '.3vw' }}
                width={1}
                height={1}
                layout="responsive"
              />
            </label>
          </div>
          <input
            onChange={handleImageChange}
            className="hidden"
            id="categoryImageInput"
            type="file"
          />
          <Input
            value={category.category}
            onChange={handleChange('category')}
            placeholder="Category"
            size="lg"
            height="11vh"
            resize="none"
          />
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <div className="flex w-[50%] justify-end">
            <Button
              style={{ width: '40%', marginRight: '.3vw' }}
              colorScheme="linkedin"
              onClick={() => {
                saveCategoryButtonClick();
              }}
            >
              Simpan
            </Button>
            <Button
              style={{ width: '40%' }}
              onClick={() => {
                setAddCategoryButton(false);
                setCategory({
                  category: '',
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

export default AddCategoryModal;
