import { useParams } from 'react-router-dom';
import TableBatchDetail from '../../../../containers/batch/TableBatchDetail';

const DetailBatchPage = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <div>Không tìm thấy ID sản phẩm</div>;

    return (
        <>
            <TableBatchDetail id={id} />
        </>
    );
};

export default DetailBatchPage;
