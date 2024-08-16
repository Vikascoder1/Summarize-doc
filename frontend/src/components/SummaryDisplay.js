import React from 'react';

const SummaryDisplay = ({ summary }) => {
    return (
        <div>
            <h2>Document Summary</h2>
            <p>{summary}</p>
        </div>
    );
};

export default SummaryDisplay;
