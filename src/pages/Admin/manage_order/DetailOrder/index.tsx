import { useParams } from 'react-router-dom';
import DetailOrder from '../../../../containers/order/DetailOrder';


const DetailOrderPage = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <div>Không tìm thấy ID sản phẩm</div>;

    return (
        <>
            <DetailOrder orderId={id} />
        </>
    );
};

export default DetailOrderPage;
