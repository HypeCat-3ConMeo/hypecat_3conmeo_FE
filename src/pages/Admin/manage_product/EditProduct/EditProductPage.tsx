import { useParams } from 'react-router-dom';

import EditProduct from '../../../../containers/product/EditProduct';


const EditProductPage = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <div>Không tìm thấy ID sản phẩm</div>;

    return (
        <>
            <EditProduct id={id} />
        </>
    );
};

export default EditProductPage;
