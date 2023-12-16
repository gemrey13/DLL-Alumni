import Breadcrumb from '../../components/admin/Breadcrumb';
import TableOne from '../../components/admin/TableOne';
import TableThree from '../../components/admin/TableThree';
import TableTwo from '../../components/admin/TableTwo';

const Tables = () => {
  return <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>;
};
export default Tables;