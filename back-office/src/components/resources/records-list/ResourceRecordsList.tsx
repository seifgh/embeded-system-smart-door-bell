import { Pagination, Table } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ResourceDataTableActions from "./ResourceRecordsListActions";
import "./styles.scss";
import { ResourceRecordsListProps } from "./types";

const ResourceRecordsList: FC<ResourceRecordsListProps> = ({
  columns,
  records,
  paginationMeta,
  onDelete,
}) => {
  const navigate = useNavigate();
  const onShowSizeChange = (current: number, pageSize: number) => {};
  const onPageChange = (page: number) => {
    navigate(`?page=${page}`);
  };

  const columnsWithActions: Array<any> = [
    ...columns.map((col) => ({ ...col, key: col.dataIndex })),
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 150,
      render: ({ id }: any) => (
        <ResourceDataTableActions recordId={id} onDelete={onDelete} />
      ),
    },
  ];

  const dataSource = records.map((record) => ({ ...record, key: record.id }));

  return (
    <div className="res-data-table">
      <Table
        pagination={false}
        columns={columnsWithActions}
        dataSource={dataSource}
      ></Table>
      <div className="pagination">
        <Pagination
          showSizeChanger={false}
          onShowSizeChange={onShowSizeChange}
          onChange={onPageChange}
          showQuickJumper
          pageSize={paginationMeta.itemsPerPage}
          current={paginationMeta.currentPage}
          total={paginationMeta.totalItems}
        />
      </div>
    </div>
  );
};

export default ResourceRecordsList;
