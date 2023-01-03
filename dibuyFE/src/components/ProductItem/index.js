import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import "./index.css"
import DiBuyContext from '../../context/DiBuyContext';

// For MUI components
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ProductItem = (props) => {
    const { eachDesign } = props
    const { id } = eachDesign
    return (
        <DiBuyContext.Consumer>
            {value => {
                const { setSelectedDesignsList, selectedDesignsList } = value
                const onChangeSelectedDesignsList = (event) => {
                    if (event.target.checked) {
                        setSelectedDesignsList(prevList => [...prevList, id])
                    } else {
                        const updatedList = selectedDesignsList.filter(existingId => existingId !== id)
                        setSelectedDesignsList(updatedList)
                    }
                }
                return (
                    <li className="col-md-3 col-12  p-2">
                        <div className="card d-flex justify-content-center p-3 desingItemCardParentCon">
                            <div className="productImageCon align-self-center">
                                <img src="https://res.cloudinary.com/radhekrishn/image/upload/v1671365996/WhatsApp_Image_2022-01-18_at_10.57_9_tshirt_mtnk3g.png" alt="productImage" className="productImage w-100" />
                            </div>
                            <div className="d-flex justify-content-between mt-3 mb-2">
                                <p className="m-0">Store :</p>
                                <p className="filterHeading m-0 storeName">ANGRY BAAZ</p>
                            </div>
                            <a className="categoryReviews" href="www.google.com">Category Reviews</a>
                            <div className="text-danger"><hr /></div>
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <p className="m-0 small">Fabric</p>
                                    <Rating name="read-only" value={3} readOnly size="small" />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="m-0 small">Print</p>
                                    <Rating name="read-only" value={4} readOnly size="small" />
                                </div>
                            </div>
                            <div className='productSelectCheckbox'>
                                <Checkbox
                                    {...label}
                                    sx={{ '& .MuiSvgIcon-root': { color: "#FF5454" } }}
                                    onChange={onChangeSelectedDesignsList}
                                    checked={selectedDesignsList.includes(id)}
                                />
                            </div>
                        </div>
                    </li>
                )
            }}
        </DiBuyContext.Consumer>

    )
}

export default ProductItem