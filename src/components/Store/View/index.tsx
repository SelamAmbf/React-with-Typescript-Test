import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../state/action Creator/storeAction";
import * as Yup from "yup";
import { useFormik } from 'formik';
import CreateStore from "../Create";
import { Button } from "@mui/material";

interface STORES {
    id: number;
    storeName: string;
    storeDescription: string;
    storeCountry: string;
    storeCity: string;
    storeLocation: string;
}

const initialFieldValues: STORES = {
        id: Math.floor(Math.random() * 1000), // generate a random id
        storeName: "",
        storeDescription: "",
        storeCountry: "",
        storeLocation: "",
        storeCity: "",
};

const Stores = ({ ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState("list");
    const [selectedStore, setselectedStore] = useState();


    const dataSource: any[] = props.proposaltypestate;
    const columnsList: any = [
    {
      title: "Store Name ",
      key: "storeName",
      dataIndex: "storeName",
      sorter: (record1: any, record2: any, type: any) => {
        if (type === "descend") return record1.storeName > record2.storeName;
        return record1.storeName < record2.storeName;
      },
    },
   
    
    {
      title: "Description",
      key: "storeDescription",
      dataIndex: "storeDescription",
      sorter: (record1: any, record2: any, type: any) => {
        if (type === "descend") return record1.storeDescription > record2.storeDescription;
        return record1.storeDescription < record2.storeDescription;
      },
    },

    {
        title: "Country",
        key: "storeCountry",
        dataIndex: "storeCountry",
        sorter: (record1: any, record2: any, type: any) => {
          if (type === "descend") return record1.storeCountry > record2.storeCountry;
          return record1.storeCountry < record2.storeCountry;
        },
      },

      {
        title: "City",
        key: "storeCity",
        dataIndex: "storeCity",
        sorter: (record1: any, record2: any, type: any) => {
          if (type === "descend") return record1.storeCity > record2.storeCity;
          return record1.storeCity < record2.storeCity;
        },
      },

      {
        title: "Location",
        key: "storeLocation",
        dataIndex: "storeLocation",
        sorter: (record1: any, record2: any, type: any) => {
          if (type === "descend") return record1.storeLocation > record2.storeLocation;
          return record1.storeLocation < record2.storeLocation;
        },
      },

    ];
    const columnsListForPrint: any = [
        {
          title: "Proposal Type",
          key: "proposalTypeName",
          dataIndex: "proposalTypeName",
        },
        {
          title: "Remark",
          dataIndex: "remark",
          key: "remark",
        },
        {
          title: "Description",
          dataIndex: "proposalTypeDescription",
          key: "proposalTypeDescription",
        },
      ];
      return (
        <div className="appcontainer">
          {userStorageService.currentUserPermission("View Proposal Type") === true && (
    
          <Grid container spacing={0}>
            <div className="row">
              <div className="pull-right">
                {/* BreadCrumpdata */}
                <Paper elevation={8} className="breadcrump">
                  <BreadCrumb data={breadcrumpdata} />
                </Paper>
              </div>
            </div>
    
            <Grid item xs={12} sm={12}>
              <Paper elevation={8} className="viewholder">
                <div className="row">
                  <div className="pull-left viewdesc">
                    {viewMode === "list" ? (
                      <Typographyh6 data={typographydata.data} />
                    ) : (
                      ""
                    )}
                  </div>
                  {viewMode == "list" && (
                      <>
                        <div className="pull-right viewbut">
                          {userStorageService.currentUserPermission(
                            "Create Proposal Type"
                          ) && (
                            <Button
                              variant="contained"
                              startIcon={<AddIcon />}
                              onClick={() => {
                                setViewMode("new");
                              }}
                            >
                              Create
                            </Button>
                          )}
                          {userStorageService.currentUserPermission(
                            "Delete Proposal Type"
                          ) && (
                            <Button
                              variant="outlined"
                              onClick={() => {
                                setViewMode("recover");
                              }}
                            >
                              Recover
                            </Button>
                          )}
                        </div>
                      </>
                    )} 
                </div>
    
                {viewMode === "list" && selectedRowKeys.length > 0 && (
                  <div className="delete-container">
                {userStorageService.currentUserPermission(
                  "Delete Proposal Type") && (
                    
                    <div>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete",
                           
                            //@ts-expect-error
                            onConfirm: () => {
                              onTrashDelete();
                            },
                          });
                        }}
                      >
                        Trash
                      </Button>
                    </div>
                    )}
                  </div>
                )}
                <div
                  className="ag-theme-alpine flex"
                  style={{ height: "500px", width: "100%" }}
                >
                  {viewMode === "list" && (
                    <Card className="w-full">
                      <div>
                        <div className="flex">
                          {/* export  */}
                          <div className="pull-left actionbut">
                            <Dropdown
                              overlay={menu}
                              placement="bottom"
                              arrow={{ pointAtCenter: true }}
                            >
                              <Button size="small" variant="contained">
                                <div className="font-medium">Export</div>
                                <DownOutlined
                                  translate={undefined}
                                  style={{ marginLeft: "2px" }}
                                />
                              </Button>
                            </Dropdown>
    
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                  timeout: 500,
                                }}
                              >
                                <Fade in={open}>
                                  <Box sx={style}>
                                    <Typography
                                      id="transition-modal-title"
                                      variant="h6"
                                      component="h2"
                                    >
                                      <Button
                                        size="small"
                                        variant="contained"
                                        onClick={PermissionCategoryPrintAction}
                                      >
                                        Print
                                      </Button>
                                      <Button
                                        size="small"
                                        className="ml-4"
                                        variant="contained"
                                        color="error"
                                        onClick={handleClose}
                                      >
                                        Cancel
                                      </Button>
                                    </Typography>
                                    <Typography
                                      id="transition-modal-description"
                                      sx={{ mt: 2 }}
                                    >
                                      <Table
                                        ref={componentRef}
                                        rowKey={(obj) => obj.id}
                                        size="small"
                                        dataSource={dataSource}
                                        columns={columnsListForPrint}
                                        pagination={false}
                                      />
                                    </Typography>
                                  </Box>
                                </Fade>
                              </Modal>
                          </div>
    
                          {/* search and filter  */}
                          <div className="pull-right search">
                            <div className="search-container">
                              <div className="search">
                                <Input
                                  placeholder="input search text"
                                  addonAfter="search"
                                  onKeyUp={(event: any) =>
                                    onSearch(event.target.value)
                                  }
                                />
                              </div>
                             
                            </div>
                          </div>
                        </div>
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
                    </Card>
                  )}
                  {viewMode === "new" && (
                    <div style={{ width: "100%" }}>
                      <CreateProposalType
                        //@ts-ignore
                        closeedit={() => setViewMode("list")}
                        viewMode={viewMode}
                        selectedProposalType={initialFieldValues}
                      />
                    </div>
                  )}
    
                  {viewMode === "edit" && (
                    <div style={{ width: "100%" }}>
                      <CreateProposalType
                        //@ts-ignore
                        closeedit={() => setViewMode("list")}
                        viewMode={viewMode}
                        selectedProposalType={selectedProposalType}
                      />
                    </div>
                  )}
    
                </div>
              </Paper>
    
            </Grid>
          </Grid>
          )}
        </div>
      );
    };
    
    const mapStateToProps = (state: any) => ({
     storestates: state.STORE_REDUCER.storestates,
    });
    
    const mapActionsToProps = {
      deleteProposalType: actionCreators.Delete,
      fetchAllProposalType: actionCreators.fetchAll,
    };
    export default connect(mapStateToProps, mapActionsToProps)(Stores as any);
    