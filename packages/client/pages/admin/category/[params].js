import { useState, useEffect } from 'react';
import AdminNavbar from '../../../components/AdminNavbar';
import { useRouter } from 'next/router';
import axiosInstance from '../../../src/config/api';

import Image from 'next/image';
import EditCategoryModal from '../../../components/editCategoryModal';
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
import ReactPaginate from 'react-paginate';
import styles from '../Admin.module.css';

function Category(props) {

  const {params}= props
  console.log({props});
  const [categoryList, setCategoryList] = useState(props.categoriesLists)
  const [currentCategory, setCurrentCategory] = useState(
    props.categoriesLists[0],
  );
  console.log(currentCategory)
  const [page, setPage] = useState(1);
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
    const handlePageClick = (e) => {
      let pages = e.selected + 1;
      setPage(e.selected);
      const path = router.asPath;
      if (path.includes('page')) {
        let replaced = path.replace(
          `page=${router.query.page}`,
          `page=${pages}`,
        );
        router.push(replaced);
      } else {
        router.push(`${path}?page=${pages}`);
      }
    };

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
                    setCategoryList([...categoryList, ])
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

        <div className="flex w-[50%]">
          <Button
            onClick={() => {
              router.replace(`/admin/category/${parseInt(params) - 1}`);
            }}
          >
            {'Previous'}
          </Button>
          <Button
            onClick={() => {
              router.replace(`/admin/category/${parseInt(params) + 1}`);
            }}
          >
            {'Next'}
          </Button>
        </div>
        {/* <ReactPaginate
          forcePage={page}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(props.totalPage / 5)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={styles.pagination}
          pageLinkClassName={styles.pagenum}
          previousLinkClassName={styles.pagenum}
          nextLinkClassName={styles.pagenum}
          activeLinkClassName={styles.active}
          disabledClassName={styles.disabled}
        /> */}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {

    const {params}= context.params

   
    const resGetCategory = await axiosInstance.get(
      `/categoriesLists/categoryList/${params}`
    );
    console.log({resGetCategory})

    // const resGetCategoriesLists = await axiosInstance.get(`/categoriesLists/categoryList`);

    // console.log(resGetCategoriesLists.data.data);

    return {
      props: {
        categoriesLists: resGetCategory.data.data.getCategory,params
        // totalPage: resGetCategory.data.totalPage,
      },
    };
  } catch (error) {
    return { props: { error: error.message } };
  }
}

export default Category;
