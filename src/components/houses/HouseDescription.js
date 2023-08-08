import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HouseDescription = ({ houseDescription }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const MAX_DESCRIPTION_LENGTH = 600;

    const toggleDescription = () => {
        setShowFullDescription((prev) => !prev);
    };

    if (!houseDescription) {
        return null;
    }

    return (
        <div style={{marginTop: '35px', marginBottom: '15px'}}>
            <h4 className="mt-4 fw-bolder">More description</h4>
            {showFullDescription ? (
                <p className={'m-0'}>{houseDescription}</p>
            ) : (
                <p className={'m-0'}>{houseDescription.slice(0, MAX_DESCRIPTION_LENGTH)} ...</p>
            )}
            {houseDescription.length > MAX_DESCRIPTION_LENGTH && (
                <button onClick={toggleDescription} className="btn btn-link p-0 m-0">
                    {showFullDescription ? <span>Collapse<ExpandLessIcon/></span> : <span>Show all<ExpandMoreIcon/></span>}
                </button>
            )}
        </div>
    );
};

export default HouseDescription;
