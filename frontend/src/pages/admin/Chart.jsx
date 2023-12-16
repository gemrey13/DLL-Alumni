import Breadcrumb from '../../components/admin/Breadcrumb';
import ChartFour from '../../components/admin/ChartFour';
import ChartOne from '../../components/admin/ChartOne';
import ChartThree from '../../components/admin/ChartThree';
import ChartTwo from '../../components/admin/ChartTwo';

const Chart = () => {
  return <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>;
};
export default Chart;