import { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/config/api';

import Image from 'next/image';
import EditCategoryModal from '../../components/editCategoryModal';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

function Category(props) {
  const [categoryList, setCategoryList] = useState(props.categoriesLists)
  const [currentCategory, setCurrentCategory] = useState(
    props.categoriesLists[0],
  );
  const [editCategoryButton, setEditCategoryButton] = useState(false);
  const [selected, setSelected] = useState('');
  
useEffect(() => {
  const { params } = router.query;
  setCategoryList(props.categoriesLists);
  setSelected(params);
});
  // const renderCategories = () => {
  //   return props.categoriesLists.map((data) => {
  //     return <AdminCategoryList key={data.category_lists_id} categoriesLists={data}/>
  //   });
  // }

    function categoryMap() {
      return categoryList?.map((category, index) => {
        return (
          <div
            key={category.category_lists_id}
            className="w-[90%] mb-[1%] h-[15%] flex-none flex flex-col items-end bg-white"
          >
            <div className="pl-[1.5vw] flex w-[100%] bg-[#008DEB] text-white">
              Category ID: {category.category_lists_id}
            </div>

            <div className="w-[120%] h-[70%] flex-none flex justify-center items-center">
              <div className="w-[2.5vw] ml-[1.5vw]">
                <Image
                  unoptimized
                  alt="resep-logo"
                  layout="responsive"
                  width={1}
                  height={1}
                  src={category.categoryImage}
                  loader={() => {
                    return category.categoryImage;
                  }}
                />
              </div>

              <div className="flex flex-col w-[40%] text-black h-[7vw] justify-center pl-[2vw] text-[#6E6E6E]">
                <p className="font-[650] text-[1rem]">{category.category}</p>
              </div>
              <div className="w-[15%] flex h-[35px]  gap-4 mr-[1.5vw]">
                <Button
                  variant="outline"
                  colorScheme="linkedin"
                  onClick={() => {
                    setCurrentCategory(category);
                    setEditCategoryButton(true);
                  }}
                  sx={{ width: '100%', height: '5vh' }}
                >
                  <p className="text-[12px]">Edit</p>
                </Button>
                <Button
                  variant="outline"
                  colorScheme="red"
                  onClick={() => {
                    deleteProduct(category.category_lists_id);
                    setCategoryList(props.categoriesLists.splice(index, 1));
                  }}
                  sx={{ width: '100%', height: '5vh' }}
                >
                  <p className="text-[12px]">Hapus</p>
                </Button>
              </div>
            </div>
            <div className="grow" />
          </div>
        );
      });
    }

   async function deleteProduct(category_lists_id) {
     try {
       const resDeleteProduct = await axiosInstance.delete(
         `/categoriesLists/${category_lists_id}`,
       );

       console.log({ resDeleteProduct });
     } catch (error) {
       console.log({ error });
     }
   }
  


  const router = useRouter();

  const path = router.pathname;

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <AdminNavbar path={path} />
      <EditCategoryModal
        currentCategory={currentCategory}
        editCategoryButton={editCategoryButton}
        setEditCategoryButton={setEditCategoryButton}
      />
      <div className="h-[55%] w-[50%] flex flex-col items-center">
        {categoryMap()}
        
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const resGetCategoriesLists = await axiosInstance.get(`/categoriesLists`);

    // console.log(resGetCategoriesLists.data.data);

    return {
      props: {
        categoriesLists: resGetCategoriesLists.data.data.getCategory,
      },
    };
  } catch (error) {
    return { props: { error: error.message } };
  }
}

export default Category;
