import React from 'react'
import Breadcrumb from '../../components/admin/Breadcrumb';
import TableAlumni from '../../components/admin/TableAlumni';

const TraceAlumni = () => {
  return <>
    <Breadcrumb pageName={'Trace Alumni'}/>
    <TableAlumni />
    </>
}

export default TraceAlumni;