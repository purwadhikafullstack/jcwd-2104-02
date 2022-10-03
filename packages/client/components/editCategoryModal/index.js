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

function EditCategoryModal({editCategoryButton, setEditCategoryButton, currentCategory}) {
const [newCategory, setNewCategory] = useState({
 category: currentCategory.category,
 categoryImage: currentCategory.categoryImage
});
const [categoryImageFile, setCategoryImageFile] = useState();
const [newCategoryImage, setNewCategoryImage] = useState(
  currentCategory.categoryImage,
);

const { isOpen, onOpen, onClose } = useDisclosure();

useEffect(() => {
  if (editCategoryButton) {
    onOpen();
  } else if (!editCategoryButton) {
    onClose();
  }

  setNewCategory({
    category: currentCategory.category,
    categoryImage: currentCategory.categoryImage,
  });
  setNewCategoryImage(currentCategory.categoryImage);
}, [editCategoryButton]);

async function updateCategoryClick() {
  try {

    const categoryImageFileBody = new FormData();

    categoryImageFileBody.append('categoriesImage', categoryImageFile);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const resPatchCategory = await axiosInstance.patch(
      `/categoriesLists/categoryUpdate/${currentCategory.category_lists_id}`,
      {
        newCategory,
        currentCategory,
      },
    );

    console.log({ resPatchCategory });

    const extName = newCategory.categoryImage.split('.');

    const resPatchCategoryImage = await axiosInstance.post(
      `/categoriesLists/upload/${resPatchCategory.data.data.resUpdateCategoryList.category_lists_id}.${extName[1]}`,
      categoryImageFileBody,
      config,
      );
      console.log("jalan")

    if (resPatchCategory) {
      console.log({ resPatchCategory, extName, resPatchCategoryImage });

      setEditCategoryButton(false);
    }
    alert(resPatchCategory.data.message)
  } catch (error) {
    console.log({ error });
    
    setEditCategoryButton(false);
  }
}

function handleImageChange(event) {
  setNewCategoryImage(URL.createObjectURL(event.target.files[0]));
  setNewCategory({
    ...newCategory,
    categoryImage: event.target.files[0].name,
  });
  setCategoryImageFile(event.target.files[0]);
}

const handleChange = (prop) => (event) => {
  setNewCategory({ ...newCategory, [prop]: event.target.value });
};

  // const { isOpen, onClose, onSaveUpdate, categoriesLists } = props;
  // // console.log(categoriesLists)
  // const [newCategory, setNewCategory] = useState({
  //   categoriesLists,
  // });
  // const [categoryImageFile, setCategoryImageFile] = useState(
  //   categoriesLists.categoryImage,
  // );

  // const onHandleChange = (prop) => (e) => {
  //   setNewCategory({ ...newCategory, [prop]: e.target.value });
  // };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setEditCategoryButton(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ubah Category</ModalHeader>
        <ModalBody>
          <p>Foto</p>
          <div className="w-[35%] my-[.5vh] hover:cursor-pointer">
            <label
              className="hover:cursor-pointer"
              htmlFor="categoryImageInput"
            >
              <Image
                unoptimized
                src={newCategoryImage}
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
            value={newCategory.category}
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
                updateCategoryClick();
              }}
            >
              Simpan
            </Button>
            <Button
              style={{ width: '40%' }}
              onClick={() => {
                setEditCategoryButton(false);
                setNewCategory({
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

export default EditCategoryModal;
