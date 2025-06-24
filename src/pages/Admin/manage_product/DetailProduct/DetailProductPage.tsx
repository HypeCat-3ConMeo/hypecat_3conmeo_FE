import { useParams } from 'react-router-dom';
import DetailProduct from '../../../../containers/product/DetailProduct';


const DetailProductPage = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <div>Không tìm thấy ID sản phẩm</div>;

    return (
        <>
            <DetailProduct id={id} />
        </>
    );
};

export default DetailProductPage;
