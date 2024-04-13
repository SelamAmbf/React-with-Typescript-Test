import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import * as actionCreators from "../../../state/action Creator/productAction";
import CreateProduct from "../Create";
import { Button, Card, Grid, Paper, Stack, SvgIcon } from "@mui/material";
import { Input, Space, Table } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DetailProduct from "../Detail";
import { useNavigate } from "react-router-dom";

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Notification from "../../../unicontrols/Notification";
import { CollectionQuery } from '../../../shared/collection-query/collection.model';
import moment from 'moment';
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  integrity="sha384-..."
  crossOrigin="anonymous"
/>
interface PRODUCTS {
    id: number;
    storeName: string;
    productName: string;
    productDescription: string;
    productSerialNo:number;
    shelfNo:number;
    shelfName:string;
    expiryDate: any;
}

const initialFieldValues: PRODUCTS = {
        id: Math.floor(Math.random() * 1000), // generate a random id
        storeName: "",
        productName: "",
        productDescription: "",
        productSerialNo: 0,
        shelfNo: 0,
        shelfName: "",
        expiryDate: moment(new Date()).format("YYYY-MM-DD"),

};
const drawerWidth = 240;


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

<SvgIcon>
  {/* credit: plus icon from https://heroicons.com/ */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
    />
  </svg>
</SvgIcon>
const ProductView = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState("list");
    const [selectedProduct, setselectedProduct] = useState();
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(5);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const onSelectChange = (newSelectedRowKeys: any[], selectedRows: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
 
  const [request, setRequest] = useState<CollectionQuery>({
    pageNumber: 1,
    pageSize: 5,
    filters: [],
  });
const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
const onSearch = (query: string) => {
  setRequest((prev) => {
    return { ...prev, search: query };
  });
};

const onPagination = (pageNumber: number, pageSize: number) => {
  setRequest((prev) => {
    return { ...prev, pageNumber: pageNumber, pageSize: pageSize };
  });
};
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const onFetchAllSuccess = () => {
      setIsLoading(false);
    };
  
    const onFetchAllError = () => {
      setIsLoading(false);
    };
    const DeleteSuccess = () => {
      setSelectedRowKeys([]);
      setIsLoading(false);
      setNotify({
        isOpen: true,
        message: "Product has been successfully Deleted .",
        type: "error",
      });
     
    };
    const DeleteError = () => {
      setIsLoading(false);
      setNotify({
        isOpen: true,
        message:
          " Failure Alert:-Product has NOT been successfully Deleted. Something's wrong!",
        type: "error",
      });
    };

 
    const handleDeletes = async (id: any) => {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      try {
        props.deleteProduct(
          id,
          DeleteSuccess,
          DeleteError
        );
      } catch (error) {
        console.error(error);
      }
  
    };
    const navigate = useNavigate();
    const handleStoreViewClick = () => {
      console.log("stores bar")
        navigate("/");
      };
      const handleProductViewClick = () => {
        navigate("/viewProduct");
      };
    useEffect(() => {
      setIsLoading(true);
      props.fetchAll(onFetchAllSuccess, onFetchAllError, request);
    }, [request]);
    console.log("success")
    console.log(props.productstate)
    const dataSource: any[] = props.productstate;
    console.log("dataSource")
    console.log(dataSource)
    const columnsList: any = [
    {
      title: "Store Name ",
      key: "storeName",
      dataIndex: "storeName",
     
    },
    {
        title: "Product Name ",
        key: "productName",
        dataIndex: "productName",
       
      },
     
    
    {
      title: "Descriptions",
      key: "productDescription",
      dataIndex: "productDescription",
     
    },

    {
        title: "Serial Number",
        key: "productSerialNo",
        dataIndex: "productSerialNo",
        
      },

      {
        title: "Shelf Number",
        key: "shelfNo",
        dataIndex: "shelfNo",
        
      },
      {
        title: "Shelf Name",
        key: "shelfName",
        dataIndex: "shelfName",
       
      },
      {
        title: "Expire Date",
        key: "expiryDate",
        dataIndex: "expiryDate",
       
      },
      {
        title: "Action",
        key: "action",
        render: (record: any) => {
          return (
            <Stack spacing={1} direction="row">
              <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteOutlineTwoToneIcon />}
                      onClick={() => handleDeletes(record.id)}
                    >
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CreateTwoToneIcon />}
                      onClick={() => {
                        setselectedProduct(record);
                        setViewMode("edit");
                      } }
                    >
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<VisibilityTwoToneIcon />}
                      onClick={() => {
                        setselectedProduct(record);
                        setViewMode("detail");
                      } }
                    >
                    </Button>

                      </Stack>
          );
      },
    },
    ];
      return (
        
        <><Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Product List
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {['Stores'].map((text) => (
                <ListItem key={text} onClick={handleStoreViewClick} disablePadding sx={{ display: 'block' }}>
                  
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <List>
              {['Products'].map((text, index) => (
                <ListItem key={text} onClick={handleProductViewClick}  disablePadding sx={{ display: 'block' }}>
                  
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                <InboxIcon /> 
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Typography>
              
            </Typography>
            <Typography>
            <Grid container spacing={0}>

            {viewMode === "list" && (
              <div>
                          <Input
                            placeholder="input search text"
                            addonAfter="search"
                            onKeyUp={(event: any) =>
                              onSearch(event.target.value)
                            }
                          />
                  <Table
                    rowKey={(obj) => obj.id}
                    size="small"
                    dataSource={dataSource}
                    columns={columnsList}
                    pagination={{
                      pageSize: pageSize,
                      total: props.total,
                      onChange: (pageNumber: any, pageSize: any) => {
                        setPageNumber(pageNumber);
                        setPageSize(pageSize);
                        onPagination(pageNumber, pageSize);
                      },
                      defaultPageSize: 5,
                    }}
                    rowSelection={rowSelection}
                  />
                </div>
            )}
              
              {viewMode === "new" && (
                <div style={{ width: "100%" }}>
                  <CreateProduct
                    //@ts-ignore
                    closeedit={() => setViewMode("list")}
                    viewMode={viewMode}
                    selectedProduct={initialFieldValues} />
                </div>
              )}
              {viewMode === "edit" && (
                <div style={{ width: "100%" }}>
                  <CreateProduct
                    //@ts-ignore
                    closeedit={() => setViewMode("list")}
                    viewMode={viewMode}
                    selectedProduct={selectedProduct} />
                </div>
              )}
              {viewMode === "detail" && (
                <div style={{ width: "100%" }}>
                  <DetailProduct
                    //@ts-ignore
                    
                    closeedit={() => setViewMode("list")}
                    viewMode={viewMode}
                    selectedProduct={selectedProduct}
                  />
                </div>
              )}
               {viewMode === "list" && (
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setViewMode("new");
                      } }
                    >
                      Create
                    </Button>
                    </div>
              )}
            </Grid>
            </Typography>
          </Box>
        </Box><Notification notify={notify} setNotify={setNotify} /></>
    );
  };
    
    const mapStateToProps = (state: any) => ({
     productstate: state.PRODUCT_REDUCER.productstate,
    });
    
    const mapActionsToProps = {
        deleteProduct: actionCreators.Delete,
        fetchAll: actionCreators.fetchAll,
    };
    export default connect(mapStateToProps, mapActionsToProps)(ProductView as any);